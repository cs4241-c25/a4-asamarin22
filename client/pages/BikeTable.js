import React from "react";

function BikeTable() {
    return (
        <table>
            <tr>
                <td>
                    <img src="../public/imgs/bike_road.jpg" className="bikeType" alt="Road Bike" width="300" />
                </td>
                <td>
                    <img src="../public/imgs/bike_mtn.jpg" className="bikeType" alt="Mountain Bike" width="300" />
                </td>
                <td>
                    <img src="../public/imgs/bike_electric.jpg" className="bikeType" alt="Electric Bike" width="300" />
                </td>
            </tr>
            <tr>
                <td>
                    <h3>Road Bike</h3>
                </td>
                <td>
                    <h3>Mountain Bike</h3>
                </td>
                <td>
                    <h3>Electric Bike</h3>
                </td>
            </tr>
            <tr>
                <td>
                    <p>Hourly: $5/hr</p>
                    <p>Daily: $30/day</p>
                    <p>Weekly: $90/week</p>
                </td>
                <td>
                    <p>Hourly: $7/hr</p>
                    <p>Daily: $45/day</p>
                    <p>Weekly: $135/week</p>
                </td>
                <td>
                    <p>Hourly: $5/hr</p>
                    <p>Daily: $35/day</p>
                    <p>Weekly: $100/week</p>
                </td>
            </tr>
        </table>
    );
}

export default BikeTable;
