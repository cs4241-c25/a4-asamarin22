import React, { useState } from "react";

function RentalForm() {
    const [durationValue, setDurationValue] = useState("");

    const updatePlaceholder = (e) => {
        let durationLabel = document.getElementById("durationLabel");
        if (e.target.value === "hourly") {
            durationLabel.textContent = "Number of Hours:";
            setDurationValue("Enter number of hours");
        } else if (e.target.value === "daily") {
            durationLabel.textContent = "Number of Days:";
            setDurationValue("Enter number of days");
        } else if (e.target.value === "weekly") {
            durationLabel.textContent = "Number of Weeks:";
            setDurationValue("Enter number of weeks");
        }
    };

    return (
        <form id="rentalForm">
            <div className="form-group">
                <label className="titleLabel" for="name">
                    Full Name:
                </label>
                <input type="text" id="name" name="name" placeholder="Enter your full name" />
            </div>

            <div className="form-group">
                <label className="titleLabel" for="email">
                    Email Address:
                </label>
                <input type="text" id="email" name="email" placeholder="Enter your email address" />
            </div>

            <div className="form-group">
                <label className="titleLabel" for="phoneNum">
                    Phone Number (U.S. Only):
                </label>
                <input type="text" id="phoneNum" name="phoneNum" placeholder="Enter your phone number" />
            </div>

            <div className="form-group">
                <label className="titleLabel" for="startDate">
                    Rental Start Date:
                </label>
                <input type="date" id="startDate" name="startDate" />
            </div>

            <div className="form-group">
                <label className="titleLabel">Bicycle Selection:</label>
                <div className="flex-container">
                    <label for="roadBike">Road Bicycle</label>
                    <input type="radio" id="roadBike" name="bikeType" value="roadBike" />
                    <label for="mtnBike">Mountain Bike</label>
                    <input type="radio" id="mtnBike" name="bikeType" value="mtnBike" />
                    <label for="electricBike">Electric Bicycle</label>
                    <input type="radio" id="electricBike" name="bikeType" value="electricBike" />
                </div>
            </div>

            <div className="form-group">
                <label className="titleLabel">Bicycle Frame Size:</label>
                <div className="flex-container">
                    <label for="sm">Small</label>
                    <input type="radio" id="sm" name="bikeSize" value="small" />
                    <label for="md">Medium</label>
                    <input type="radio" id="md" name="bikeSize" value="medium" />
                    <label for="lg">Large</label>
                    <input type="radio" id="lg" name="bikeSize" value="large" />
                </div>
            </div>

            <div className="form-group">
                <label className="titleLabel">Rental Duration Option:</label>
                <div className="flex-container">
                    <label for="hourly">Hourly</label>
                    <input type="radio" id="hourly" name="rentalDuration" value="hourly" onChange={updatePlaceholder} />

                    <label for="daily">Daily</label>
                    <input type="radio" id="daily" name="rentalDuration" value="daily" onChange={updatePlaceholder} />

                    <label for="weekly">Weekly</label>
                    <input type="radio" id="weekly" name="rentalDuration" value="weekly" onChange={updatePlaceholder} />
                </div>
            </div>

            <div className="form-group">
                <label className="titleLabel" id="durationLabel" for="durationVal">
                    Number of Hours:
                </label>
                <input type="text" id="durationVal" name="durationVal" placeholder={durationValue} />
            </div>

            <div className="form-group">
                <button type="submit" id="submit">
                    Submit
                </button>
                <br />
                <button id="modify">Modify</button>
                <p>Note: To modify an existing rental, make sure the Full Name matches an existing rental.</p>
                <button id="delete">Delete</button>
                <p>Note: Deleting bookings will remove most recent rental listed.</p>
            </div>
        </form>
    );
}

export default RentalForm;
