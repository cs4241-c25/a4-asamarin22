import React from "react";

function Header() {
    return (
        <header>
            <h1>Local Bike Rental Service</h1>
            <p>Welcome fellow biking enthusiast! Here you can rent any of the available bikes. All the pricing is below.</p>
            <p>Fill in the form below and check the full list of rentals to verify your booking is correct.</p>
            <a href="/auth/github">Login with GitHub</a>
            <br />
            <a href="/logout">Logout</a>
        </header>
    );
}

export default Header;
