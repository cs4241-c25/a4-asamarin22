CS 4241: Webware C25 - Assignment A4 - Aleksandr Samarin - README File

Aleksandr Samarin: a4-asamarin22.glitch.me

*************Glitch Deployment Note***************
I am having an issue when deploying that does not allow me to run both start scripts concurrently (I run server and client seperatly).
This link is to an old deployment of my A4 which still runs but is not built on the React framework. Current main branch is Vite+React.
**************************************************

Local Bike Rental Service

For this project I designed a simple website to accept rental bookings for certain types of bicycles.
The idea of the website would be for a user to fill out the form. Then submitting it will display the updated bookings.
You have to sign in through github to be an authenticated user. Nothing will diaplay if you are not logged in other than the submitted data
User cannot fill out form and see all the bookings unless they are signed in.

When logged in a user has the ability to modify and delete bookings. Deleting will simply remove it from the list where as the modification
only allows the user to change the name, email, and phone number associated with the booking.
This webpage consists of only one .html page.

Changes made since Assignment A3:
    -The main change in this submission is the Vite+React front-end that my app now runs off. It used to run on node.js, 
    now with the updated requirements my fornt-end is all in React.

    -Another change that I made to the web application was the styling. As part of my a3 assignment, my styling included Material
    Tailwind CSS but was not as consistent throughout the page. The styling now applies to everything on th page, including the
    resulting data from user input.

    -Client side is running Vite + React as the requirements specified.

    -Server side is running Express with MongoDB connections for the user data.

    -Client and Server run as seperate files. My run configuration 'start' in package.json contains the 
    commands to start up both client and server.

    -Used Github Passport Local Strategy from A3, integrating design into header.

******************************** HOW TO RUN LOCALLY (If Glitch is broken) *************************************
To run this website, have the project cloned locally on your computer.

Run 'npm install' to include all dependencies.

Set up a basic npm run configuration selecting 'start' for the script
Run 'start' script found in package.json
    -Becasue my server and client are on different ports (3000, 5173); concurrently is used to start up both server and client.

On preferred browser type URL: 'localhost:5173' OR click link in the server console
This opens up the webpage to use

To actually see what is being added to the database or deleted, you would have to sign in through the sign-in link.
*************************************************************************************************************

My main challenge for this assignment was regarding the use of React in the front end. As I had originally used
Next.js for the front-end this lead to a lot of configuration issues regarding my React app. However, I managed 
to successfully run the application using Vite+React. A big challenge was running the client and server seperately.
