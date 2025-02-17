// Part of the code in this example project is based on various sources: NextJS template, GeeksforGeeks, and Tutorialspoint

import Head from "next/head";
//import Link from 'next/link'
//import styles from "@/styles/Home.module.css";

export default function Home() {
    return (
        <>
            <Head>
                <title>CS4241 Assignment 2</title>
                <meta charSet="utf-8"/>
                <script src="js/main.js"></script>
                <link rel="stylesheet" href="css/main.css"/>

                <link rel="icon" href="data:;base64,iVBORw0KGgo="/>
            </Head>

            <header>
                <h1>Local Bike Rental Service</h1>
                <p>Welcome fellow biking enthusiast! Here you can rent any of the available bikes. All the pricing is
                    below.</p>
                <p>Fill in the form below and check the full list of rentals to verify your booking is correct.</p>
            </header>

            <main>
                <section>
                    <h2 className="slideInText">Bikes Available to Rent</h2>
                    <table>
                        <tbody>
                        <tr>
                            <td><img src="imgs/bike_road.jpg" className="bikeType" alt="Road Bike" width="300"/></td>
                            <td><img src="imgs/bike_mtn.jpg" className="bikeType" alt="Mountain Bike" width="300"/></td>
                            <td><img src="imgs/bike_electric.jpg" className="bikeType" alt="Electric Bike" width="300"/>
                            </td>
                        </tr>
                        </tbody>
                        <tbody>
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
                        </tbody>
                        <tbody>
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
                        </tbody>
                    </table>
                </section>

                <section>
                    <h2 className="slideInText">Rent A Bicycle Form</h2>
                    <form id="rentalForm" method="POST" action="/submit">

                        {/* Fields in form
                        1 - Full Name
                        2 - Email
                        3 - Phone Number
                        4 - Rental Start Date
                        5 - Bike Type
                        6 - Bike Size
                        7 - Rental Duration
                        8 - Number of duration

                        9 - Calculates the return date given the start date and duration preference and number
                        This return date/time is calculated and sent as a resulting table.
                        */}


                        <div className="form-group">
                            <label className="titleLabel" htmlFor="name">Full Name:</label>
                            <input type="text" id="name" name="name" placeholder="Enter your full name"/>
                        </div>

                        <div className="form-group">
                            <label className="titleLabel" htmlFor="email">Email Address:</label>
                            <input type="text" id="email" name="email" placeholder="Enter your email address"/>
                        </div>

                        <div className="form-group">
                            <label className="titleLabel" htmlFor="phoneNum">Phone Number (U.S. Only):</label>
                            <input type="text" id="phoneNum" name="phoneNum" placeholder="Enter your phone number"/>
                        </div>

                        <div className="form-group">
                            <label className="titleLabel" htmlFor="startDate">Rental Start Date:</label>
                            <input type="date" id="startDate" name="startDate"/>
                        </div>

                        <div className="form-group">
                            <label className="titleLabel">Bicycle Selection:</label>
                            <div className="flex-container">
                                <label htmlFor="roadBike">Road Bicycle</label>
                                <input type="radio" id="roadBike" name="bikeType" value="roadBike"/>
                                <label htmlFor="mtnBike">Mountain Bike</label>
                                <input type="radio" id="mtnBike" name="bikeType" value="mtnBike"/>
                                <label htmlFor="electricBike">Electric Bicycle</label>
                                <input type="radio" id="electricBike" name="bikeType" value="electricBike"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="titleLabel">Bicycle Frame Size:</label>
                            <div className="flex-container">
                                <label htmlFor="sm">Small</label>
                                <input type="radio" id="sm" name="bikeSize" value="small"/>
                                <label htmlFor="md">Medium</label>
                                <input type="radio" id="md" name="bikeSize" value="medium"/>
                                <label htmlFor="lg">Large</label>
                                <input type="radio" id="lg" name="bikeSize" value="large"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="titleLabel">Rental Duration Option:</label>
                            <div className="flex-container">
                                <label htmlFor="hourly">Hourly</label>
                                <input type="radio" id="hourly" name="rentalDuration" value="hourly"/>

                                <label htmlFor="daily">Daily</label>
                                <input type="radio" id="daily" name="rentalDuration" value="daily"/>

                                <label htmlFor="weekly">Weekly</label>
                                <input type="radio" id="weekly" name="rentalDuration" value="weekly"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="titleLabel" id="durationLabel" htmlFor="durationVal">Number of
                                Hours:</label>
                            <input type="text" id="durationVal" name="durationVal" placeholder="Enter duration"/>
                        </div>


                        <div className="form-group">
                            <button type="submit" id="submit">Submit</button>
                            <br/>
                            <button id="modify">Modify</button>
                            <p>Note: To modify an existing rental, make sure the Full Name matches an existing rental.</p>
                            <button id="delete">Delete</button>
                            <p>Note: Deleting bookings will remove most recent rental listed.</p>
                        </div>
                    </form>
                </section>

                <section>
                    <h2>Results</h2>
                    <h3 id="bookCreated"></h3>
                    <b id="infoDisplay"></b>
                    <hr/>
                    <h2>List of Current Bike Rentals</h2>
                    <div id="results"></div>
                </section>
            </main>

            <footer>CS 4241: Webware - Assignment A2 - Aleksandr Samarin</footer>
        </>
    );
}
