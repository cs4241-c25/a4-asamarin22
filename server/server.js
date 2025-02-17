const express = require("express");
const next = require("next");
const path = require("path");

const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github");

const dev = process.env.NODE_ENV !== "production";
const { MongoClient } = require("mongodb");
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const url = "mongodb+srv://aleksamarin1:wpi25@cluster0.ab3ui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbconnect =  new MongoClient(url);
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
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send("Unauthorized: Please log in.");
}


// Prepare Next.js app
app.prepare().then(() => {
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

    // Session configuration (required for persistent login)
    server.use(session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true
    }));

    // Initialize Passport and session
    server.use(passport.initialize());
    server.use(passport.session());

    // Users arr
    const users = new Map();

    // GitHub OAuth Strategy
    passport.use(new GitHubStrategy({
            clientID: "Ov23lio74xNCdupaftD6",
            clientSecret: "1315f45edf57e382567c890fb526751ee4bd4fcd",
            callbackURL: "http://localhost:3000/auth/github/callback"
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

    // Serialize user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize user
    passport.deserializeUser((id, done) => {
        done(null, users.get(id) || null);
    });


    // GitHub authentication route
    server.get("/auth/github", passport.authenticate("github"));

    // GitHub callback route
    server.get("/auth/github/callback",
        passport.authenticate("github", { failureRedirect: "/" }),
        (req, res) => {
            // Redirect to the main page
            res.redirect("/");
        }
    );

    // Logout route
    server.get("/logout", (req, res) => {
        req.logout((err) => {
            if (err) return next(err);
            res.redirect("/");
        });
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
            "Bike Type": newRental.bikeType === "mtnBike" ? "Mountain Bike" :
                newRental.bikeType === "roadBike" ? "Road Bicycle" :
                    newRental.bikeType === "electricBike" ? "Electric Bicycle" : "Unknown",
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

    // DELETE route to handle removing the last rental entry
    server.delete("/delete", async (req, res) => {
        try {
            const latestRental = await collection.find().sort({_id: -1}).limit(1).toArray();

            if (latestRental.length === 0) {
                return res.status(400).send("No data to delete.");
            }

            const deletedEntry = await collection.deleteOne({_id: latestRental[0]._id});

            if (deletedEntry.deletedCount === 1) {
                console.log("Last rental entry deleted from MongoDB.");
                res.status(200).send("Last entry deleted successfully.");
            } else {
                res.status(500).send("Error deleting the last entry.");
            }
        } catch (err) {
            console.error("Error deleting the last rental entry:", err);
            res.status(500).send("Error deleting the last entry.");
        }
    });

    // MODIFY route to handle modification of entry
    server.put("/modify", async (req, res) => {
        try {
            const { fullName, updatedData } = req.body;

            if (!fullName || !updatedData) {
                return res.status(400).send("Full Name and updated data are required.");
            }

            // Find and update the document with the matching Full Name
            const result = await collection.updateOne(
                { "Full Name": fullName }, // Filter condition
                { $set: updatedData } // Update data
            );

            if (result.matchedCount === 0) {
                return res.status(404).send("No matching entry found.");
            }

            console.log(`Entry for ${fullName} updated successfully.`);
            res.status(200).send("Entry updated successfully.");
        } catch (err) {
            console.error("Error updating the rental entry:", err);
            res.status(500).send("Error updating the entry.");
        }
    });

    // GET route to return the appdata in JSON format
    server.get("/data", ensureAuthenticated, async (req, res) => {
        collection.find().toArray()
            .then((data) => {
                res.status(200).json(data);  // Return data from MongoDB as JSON
            })
            .catch((err) => {
                console.error("Error fetching data from MongoDB:", err);
                res.status(500).send("Error fetching data");
            });
    });

    // Catch-all route for Next.js to handle everything else (pages, static assets)
    server.all("*", (req, res) => {
        return handle(req, res); // Let Next.js handle all the requests
    });

    // Start the Express server
    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
