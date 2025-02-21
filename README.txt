CS 4241: Webware C25 - Assignment A4 - Aleksandr Samarin - README File

Aleksandr Samarin: a4-asamarin22.glitch.me

Local Bike Rental Service

For this project I designed a simple website to accept rental bookings for certain types of bicycles.
The idea of the website would be for a user to fill out the form. Then submitting it will display the updated bookings.
You have to sign in through github to be an authenticated user.
User cannot fill out form and see all the bookings unless they are signed in and submit a form.

User can see all rentals and is able to delete the most recent booking until list is empty.
Additionally, the user can modify rental bookings by filling in the form with the same 'Full Name' that they used in the original booking.
This webpage consists of only one .html page.

Changes made since Assignment A3:
    -The main change that I made to the web application was the styling. As part of my a3 assignment, my styling included Material
    Tailwind CSS but was not as consistent throughout the page. The styling now applies to everything on th page, including the
    resulting data from user input.

    -Right now the front-end client side uses Next.js as opposed to React. I was having challenges setting up React for the front-end.
     I am getting a lot of configuration errors related to next.js even though I am trying to run React.

    -Server side is running Express with MongoDB connections for the user data.

    -Used Github Passport Local Strategy from A3, integrating design into header.

To run this website, have the project cloned locally on your computer.
Set up a basic npm run configuration selecting 'dev' for the script
Run 'npm run dev'

On preferred browser type URL: 'localhost:3000' OR click link in the server console
This opens up the webpage to use

To actually see what is being added to the database or deleted, you would have to sign in through the sign-in link.

My main challenge for this assignment was regarding the use of React in the front end. As I had originally used
Next.js for the front-end this lead to a lot of configuration issues regarding my React app. Because of this I
was not able to fully implement my front-end to be solely React.
