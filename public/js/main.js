// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()

    // Get all form data dynamically
    const form = document.querySelector('#rentalForm')
    const formData = new FormData(form);
    const rentalData = Object.fromEntries(formData.entries()); // Convert form data to an object
    const body = JSON.stringify(rentalData); // Convert object to JSON string

    console.log( "body: ", body );

    //Sends POST request to server.js with the body being the form content
    const response = await fetch("/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body
    });

    //Gets the data from server.js
    const text = await response.text()
    console.log( "text:", text )

    //Creates Successful booking text
    let h = document.createElement("h3");
    h.innerHTML = "Congratulations! Your Bicycle Rental was Booked Successfully.";
    document.getElementById("bookCreated").innerHTML = h.innerHTML;

    await fetchUpdatedData('True');
}

// Delete function
const deleteEntry = async function( event ) {
    event.preventDefault();

    const response = await fetch("/delete", {
        method: "DELETE",
    });

    const result = await response.text();
    console.log("Delete response:", result);

    // Refresh the displayed data
    await fetchUpdatedData('False');
}

// Modify function
const modifyEntry = async function(event) {
    event.preventDefault();

    // Get the form element
    const form = event.target.closest("form");

    // Extract values from the form inputs
    const fullName = form.querySelector("[name='name']").value.trim();

    if (!fullName) {
        console.error("Error: Full Name is required to modify an entry.");
        return;
    }

    // Construct updated data object from form inputs
    const updatedData = {
        "Email": form.querySelector("[name='email']").value.trim(),
        "Phone Number": form.querySelector("[name='phoneNum']").value.trim(),
        "Rental Start Date": form.querySelector("[name='startDate']").value,
        "Bike Type": form.querySelector("[name='bikeType']").value,
        "Frame Size": form.querySelector("[name='bikeSize']").value,
        "Rental Duration": form.querySelector("[name='rentalDuration']").value,
        "Number of selected duration": form.querySelector("[name='durationVal']").value,
    };

    console.log("Modifying entry:", { fullName, updatedData });

    // Send the update request
    const response = await fetch("/modify", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ fullName, updatedData })
    });

    const result = await response.text();
    console.log("Modify response:", result);

    // Refresh the displayed data
    await fetchUpdatedData(false);
};

// Generates a table given the bike rental data
function generateTable(data) {
    console.log("Inside generateTable: ", data );

    let container = document.getElementById("results");

    let table = document.createElement("table");
    table.border = "1";

    let thead = document.createElement("thead");
    let headerRow = document.createElement("tr");

    //let headers = Object.keys(data[0]); // Get column headers
    // Defined a fixed set of headers (changed since debugging a3)
    let headers = [
        "Full Name",
        "Email",
        "Phone Number",
        "Rental Start Date",
        "Bike Type",
        "Frame Size",
        "Rental Duration",
        "Number of selected duration",
        "Rental Return Date"
    ];

    headers.forEach(headerText => {
        let th = document.createElement("th");
        th.textContent = headerText; // Format headers
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    let tbody = document.createElement("tbody");

    data.forEach(entry => {
        let row = document.createElement("tr");
        headers.forEach(header => {
            let td = document.createElement("td");
            td.textContent = entry[header] || "N/A"; // Handle missing values
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    container.innerHTML = ""; // Clear previous content
    container.appendChild(table);
}

//Refreshes all the rental bookings stored on the db
async function fetchUpdatedData(rentCreated) {
    const response = await fetch("/data");  // Endpoint to get updated data
    const data = await response.json();

    let h = document.createElement("h3");
    if (rentCreated) {
        h.innerHTML = "Congratulations! Your Bicycle Rental was Booked Successfully.";
    } else {
        h.innerHTML = "Your Previous Bike Rental was Deleted Successfully.";
    }

    document.getElementById("bookCreated").innerHTML = h.innerHTML;

    generateTable(data);
}

window.onload = function() {
    const submitButton = document.querySelector("#submit");
    const deleteButton = document.querySelector("#delete");
    const modifyButton = document.querySelector("#modify");

    submitButton.onclick = submit;  // Attach submit function to Submit button
    deleteButton.onclick = deleteEntry;  // Attach delete function to Delete button
    modifyButton.onclick = modifyEntry;  // Attach delete function to Delete button
}
