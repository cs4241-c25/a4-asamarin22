import express from "express";
import path from "path";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import GitHubStrategy from 'passport-github';


//const dev = process.env.NODE_ENV !== "production";
import {MongoClient, ObjectId} from "mongodb";

const port = 3000;
const __dirname = path.dirname(new URL(import.meta.url).pathname);
let isLoggedIn = false;  // Global variable to track login state


const url = "mongodb+srv://aleksamarin1:wpi25@cluster0.ab3ui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//const dbconnect =  new MongoClient(url);
let collection = null;

// Function for derived attribute (Calculates the return date given the booking date and duration)
function calculateReturnDate(startDate, durationType, durationValue) {
    const start = new Date(startDate);

    switch (durationType.toLowerCase()) {
        case "hourly":
            start.setHours(start.getHours() + parseInt(durationValue, 10));
            break;
        case "daily":
            start.setDate(start.getDate() + parseInt(durationValue, 10));
            break;
        case "weekly":
            start.setDate(start.getDate() + parseInt(durationValue, 10) * 7);
            break;
        default:
            console.warn("Unknown rental duration type:", durationType);
    }

    return start.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
}

// Function ensures a user is authenticated
// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.status(401).send("Unauthorized: Please log in.");
// }

// Set up Express Server
const server = express();

// Function to handle MongoDB connection
const dbConnect = async () => {
    try {
        const client = new MongoClient(url);
        await client.connect();
        console.log("Database Connected");
        collection = client.db("Rentals").collection("bikeRentals");
    } catch (err) {
        console.error("Failed to connect to database:", err);
    }
};

dbConnect();

server.use(cors({
    origin: "http://localhost:5173", // Allow frontend
    credentials: true // Allow cookies to be sent
})); // This will allow all origins.

server.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false, // Changed from true to false
    cookie: { sameSite: "lax", secure: false }
}));

server.use(passport.initialize());
server.use(passport.session());


// Users arr
const users = new Map();

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
        clientID: "Ov23liy2tUMrSlZwDCY5",
        clientSecret: "5335def479de506b1f9497d6702dafa79f8d5a37",
        callbackURL: "http://localhost:5173/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        let user = users.get(profile.id);
        if (!user) {
            user = { id: profile.id, username: profile.username, displayName: profile.displayName };
            users.set(profile.id, user);
        }
        return cb(null, user);
    }
));

passport.serializeUser((user, done) => {
    console.log("Serializing user:", user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log("Deserializing user ID:", id);
    const user = users.get(id);
    console.log("Deserialized user:", user);
    done(null, user || null);
});



// GitHub authentication route
server.get("/auth/github", passport.authenticate("github"));

// GitHub callback route
server.get("/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    (req, res) => {
        console.log("User after login:", req.user);  // Debug authentication
        // Redirect to the main page
        res.redirect("http://localhost:5173");
    }
);

server.post("/login", (req, res) => {
    // Example: If user successfully logs in
    isLoggedIn = true;  // Set the global variable to true
    res.json({ success: true });
});



server.get("/auth/status", (req, res) => {
    console.log("Auth status check hit. Session:", req.session);
    console.log("User:", req.user);

    if (req.isAuthenticated()) {
        res.json({ authenticated: true, user: req.user });
    } else {
        res.json({ authenticated: false });
    }
});

// Logout route
server.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).send("Logout failed");
        res.redirect("/"); // You can redirect to a different page if needed, or just send a success response
    });
    isLoggedIn = false;
});



// Middleware to parse form data and JSON
server.use(express.urlencoded({ extended: true })); // For form submissions
server.use(express.json()); // For JSON requests


// Serve static files from the public folder
server.use(express.static(path.join(__dirname, "public")));

// POST route for submitting rental form data
server.post("/submit", (req, res) => {
    const newRental = req.body;
    console.log("New Rental Data:", newRental);

    // Map incoming data to match `appdata` format
    const formattedRental = {
        "Full Name": newRental.name,
        "Email": newRental.email,
        "Phone Number": newRental.phoneNum,
        "Rental Start Date": newRental.startDate,
        "Bike Type": newRental.bikeType.charAt(0).toUpperCase() + newRental.bikeType.slice(1),
        "Frame Size": newRental.bikeSize.charAt(0).toUpperCase() + newRental.bikeSize.slice(1),
        "Rental Duration": newRental.rentalDuration.charAt(0).toUpperCase() + newRental.rentalDuration.slice(1),
        "Number of selected duration": newRental.durationVal,
        "Rental Return Date": calculateReturnDate(newRental.startDate, newRental.rentalDuration, newRental.durationVal)
    };

    // Insert rental data into MongoDB
    collection.insertOne(formattedRental)
        .then(() => {
            console.log("Rental data saved to MongoDB");
            res.json(formattedRental);
        })
        .catch((err) => {
            console.error("Error inserting rental data into MongoDB:", err);
            res.status(500).send("Error saving rental data");
        });
});

// DELETE route - Only authenticated users can delete a specific rental entry
server.delete("/delete/:id", async (req, res) => {
    const bookingId = req.params.id;  // Get the booking ID from the URL parameters

    if (isLoggedIn) {
        try {
            // Find and delete the specific booking by its ID
            const deletedEntry = await collection.deleteOne({ _id: new ObjectId(bookingId) });

            if (deletedEntry.deletedCount === 1) {
                console.log("Rental entry deleted from MongoDB.");
                res.status(200).send("Booking deleted successfully.");
            } else {
                res.status(500).send("Error deleting the booking.");
            }
        } catch (err) {
            console.error("Error deleting the booking:", err);
            res.status(500).send("Error deleting the booking.");
        }
    } else {
        console.log("DATA NOT DELETED")
    }

});


server.put("/modify/:id", async (req, res) => {
    if (!isLoggedIn) {
        console.log("DATA NOT MODIFIED");
        return res.status(403).send("Unauthorized: Please log in.");
    }

    try {
        const bookingId = req.params.id; // Extract ID from URL
        const updatedData = req.body;

        // Validate that updatedData is present
        if (!updatedData || Object.keys(updatedData).length === 0) {
            return res.status(400).send("Updated data is required.");
        }

        // Validate that the updatedData only contains Full Name, Email, or Phone Number
        const allowedFields = ["Full Name", "Email", "Phone Number"];
        const invalidKeys = Object.keys(updatedData).filter(key => !allowedFields.includes(key));

        if (invalidKeys.length > 0) {
            return res.status(400).send(`Invalid fields: ${invalidKeys.join(", ")}`);
        }

        // Fetch the rental entry using the bookingId
        const rentalEntry = await collection.findOne({ _id: new ObjectId(bookingId) });

        if (!rentalEntry) {
            return res.status(404).send("No matching entry found.");
        }

        // Proceed with update
        const result = await collection.updateOne(
            { _id: new ObjectId(bookingId) }, // Filter by bookingId
            { $set: updatedData } // Update the fields
        );

        if (result.matchedCount === 0) {
            return res.status(404).send("No matching entry found.");
        }

        console.log(`Entry with ID ${bookingId} updated successfully.`);
        res.status(200).send("Entry updated successfully.");
    } catch (err) {
        console.error("Error updating the rental entry:", err);
        res.status(500).send("Error updating the entry.");
    }
});



// GET route to return the appdata in JSON format
server.get("/data", async (req, res) => {
    if (isLoggedIn) {
        collection.find().toArray()
            .then((data) => {
                res.status(200).json(data);  // Return data from MongoDB as JSON
            })
            .catch((err) => {
                console.error("Error fetching data from MongoDB:", err);
                res.status(500).send("Error fetching data");
            });
    } else {
        console.log("DATA NOT FOUND");
    }

});

// Start the Express server
server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
});

