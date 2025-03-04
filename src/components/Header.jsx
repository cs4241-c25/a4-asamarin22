import { useState } from "react";

const Header = () => {
    //const [ setIsAuthenticated] = useState(false);

    // useEffect(() => {
    //     // Check if the user is logged in only once when the component mounts
    //     fetch("http://localhost:3000/auth/status", { credentials: "include" })
    //         .then(res => res.json())
    //         .then(data => setIsAuthenticated(data.authenticated))
    //         .catch(err => console.error("Auth check failed:", err));
    // }, []);  // Empty dependency array ensures this runs once on mount


    // const handleLogin = () => {
    //     window.location.href = "http://localhost:3000/auth/github";
    // };

    // Header.jsx
    const handleLogin = () => {
        fetch("http://localhost:3000/login", {
            method: "POST",
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log("Logged in successfully!");
                    // Trigger a page reload
                    window.location.reload();
                } else {
                    console.error("Login failed");
                }
            })
            .catch(err => console.error("Error during login:", err));
    };



    const handleLogout = async () => {
        // Call the backend to log out
        await fetch("http://localhost:3000/logout", { method: "GET", credentials: "include" });

        // After logging out, reload the page to update the UI
        window.location.reload();
    };



    return (
        <header className="bg-blue-700 text-white py-6 text-center relative">
            <h1 className="text-4xl font-bold">Local Bike Rental Service</h1>
            <p className="mt-2 text-xl">
                Welcome fellow biking enthusiast! Here you can rent any of the available bikes. All the pricing is below.
            </p>
            <p className="mt-2">Fill in the form below and check the full list of rentals to verify your booking is correct.</p>
            <div className="absolute top-0 left-0 mt-4 ml-4">

                <button
                    onClick={handleLogin}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition block mb-2"
                >
                    Login with GitHub
                </button>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition block"
                >
                    Logout
                </button>

            </div>
        </header>
    );
};

export default Header;
