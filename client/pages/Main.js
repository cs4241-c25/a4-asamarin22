import React from "react";
import RentalForm from "./RentalForm";
import BikeTable from "./BikeTable";

function Main() {
    return (
        <main>
            <section>
                <h2 className="slideInText">Bikes Available to Rent</h2>
                <BikeTable />
            </section>

            <section>
                <h2 className="slideInText">Rent A Bicycle Form</h2>
                <RentalForm />
            </section>

            <section>
                <h2>Results</h2>
                <h3 id="bookCreated"></h3>
                <b id="infoDisplay"></b>
                <hr />
                <h2>List of Current Bike Rentals</h2>
                <div id="results"></div>
            </section>
        </main>
    );
}

export default Main;
