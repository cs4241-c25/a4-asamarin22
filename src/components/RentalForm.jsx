import { useState } from "react";
import "/src/App.css";

const RentalForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNum: "",
        startDate: "",
        bikeType: "",
        bikeSize: "",
        rentalDuration: "",
        durationVal: "",
    });

    const [submittedData, setSubmittedData] = useState(null); // Stores submitted form data

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Post data to the backend
        fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle successful response
                console.log('Data saved:', data);
                setSubmittedData(data); // Display the saved data on the frontend
            })
            .catch((error) => {
                // Handle error
                console.error('Error:', error);
            });
    };


    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4">Rent A Bicycle Form</h2>
            <form onSubmit={handleSubmit} className="bg-blue-100 p-6 rounded-lg shadow-lg space-y-4">
                <input type="text" name="name" placeholder="Full Name" className="w-full p-2 rounded-lg border" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email Address" className="w-full p-2 rounded-lg border" onChange={handleChange} required />
                <input type="tel" name="phoneNum" placeholder="Phone Number" className="w-full p-2 rounded-lg border" onChange={handleChange} required />
                <input type="date" name="startDate" className="w-full p-2 rounded-lg border" onChange={handleChange} required />

                <div>
                    <label className="block font-medium">Bicycle Selection:</label>
                    {["Road Bike", "Mountain Bike", "Electric Bike"].map((bike) => (
                        <label key={bike} className="flex items-center space-x-2">
                            <input type="radio" name="bikeType" value={bike} onChange={handleChange} required />
                            {bike}
                        </label>
                    ))}
                </div>

                <div>
                    <label className="block font-medium">Bicycle Frame Size:</label>
                    {["Small", "Medium", "Large"].map((size) => (
                        <label key={size} className="flex items-center space-x-2">
                            <input type="radio" name="bikeSize" value={size} onChange={handleChange} required />
                            {size}
                        </label>
                    ))}
                </div>

                <div>
                    <label className="block font-medium">Rental Duration:</label>
                    {["Hourly", "Daily", "Weekly"].map((duration) => (
                        <label key={duration} className="flex items-center space-x-2">
                            <input type="radio" name="rentalDuration" value={duration} onChange={handleChange} required />
                            {duration}
                        </label>
                    ))}
                </div>

                <input type="text" name="durationVal" placeholder="Duration (Hours/Days/Weeks)" className="w-full p-2 rounded-lg border" onChange={handleChange} required />

                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg">Submit</button>
            </form>

            {/* Display submitted data */}
            {submittedData && (
                <div className="mt-6 p-4 bg-green-100 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Rental Booking Summary:</h3>
                    <ul className="list-disc list-inside">
                        <li><strong>Name:</strong> {submittedData["Full Name"]}</li>
                        <li><strong>Email:</strong> {submittedData["Email"]}</li>
                        <li><strong>Phone Number:</strong> {submittedData["Phone Number"]}</li>
                        <li><strong>Rental Start Date:</strong> {submittedData["Rental Start Date"]}</li>
                        <li><strong>Bike Type:</strong> {submittedData["Bike Type"]}</li>
                        <li><strong>Frame Size:</strong> {submittedData["Frame Size"]}</li>
                        <li><strong>Rental Duration:</strong> {submittedData["Rental Duration"]}</li>
                        <li><strong>Duration Value:</strong> {submittedData["Number of Duration"]}</li>
                    </ul>
                </div>
            )}
        </section>
    );
};

export default RentalForm;
