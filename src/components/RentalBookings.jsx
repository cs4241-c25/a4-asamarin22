// RentalBookings.js (React component to display bookings)
import { useEffect, useState } from 'react';

const RentalBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);  // Track if we are editing a booking
    const [error, setError] = useState(null);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [updatedBooking, setUpdatedBooking] = useState({
        _id: '',
        "Full Name": '',
        Email: '',
        "Phone Number": '',
        "Rental Start Date": '',
        "Rental Return Date": '',
        "Bike Type": '',
        "Frame Size": '',
        "Rental Duration": '',
        "Number of selected duration": ''
    });

    useEffect(() => {
        // Fetch data from the backend
        fetch('http://localhost:3000/data')  // Assuming this is the correct endpoint in your backend
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("data: ", data);
                setBookings(data);  // Store the data in the state
                setLoading(false);   // Set loading to false once data is fetched
            })
            .catch(error => {
                setError(error.message);  // Store any errors
                setLoading(false);
            });
    }, []);  // Empty array ensures this runs only once when the component mounts

    const handleDelete = async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:3000/delete/${bookingId}`, {
                method: 'DELETE',
                credentials: 'include',  // Include credentials to keep the user authenticated
            });

            if (response.ok) {
                console.log("Booking deleted successfully.");
                // Remove the deleted booking from the state (visual update)
                setBookings(bookings.filter(booking => booking._id !== bookingId));
            } else {
                console.error("Error deleting booking.");
                // Handle error based on the response from the server
            }
        } catch (err) {
            console.error("Error during delete request:", err);
        }
    };

    // Handle modify button click
    const handleModify = (booking) => {
        setIsEditing(true);
        setCurrentBooking(booking);
        setUpdatedBooking({ ...booking });  // Set the values to the current booking details
    };

    // Handle form input change for modification
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBooking(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the request payload with the updated booking data
        const updatedBookingData = {
            "Full Name": updatedBooking["Full Name"],
            "Email": updatedBooking["Email"],
            "Phone Number": updatedBooking["Phone Number"]
        };

        try {
            // Send the PUT request with the updated booking data
            const response = await fetch(`http://localhost:3000/modify/${updatedBooking._id}`, {
                method: 'PUT',  // Using PUT to modify the booking
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',  // Include credentials to keep the user authenticated
                body: JSON.stringify(updatedBookingData)  // Send only the updated fields
            });

            // Handle the response from the server
            if (response.ok) {
                console.log("Booking modified successfully.");
                // Update the state with the modified booking (visual update)
                setBookings(bookings.map(booking =>
                    booking._id === updatedBooking._id ? { ...booking, ...updatedBookingData } : booking
                ));
                setIsEditing(false);  // Close the edit modal after success
            } else {
                console.error("Error modifying booking.");
            }
        } catch (err) {
            console.error("Error during modify request:", err);
        }
    };



    if (loading) {
        return <div>Login To View All Rental Bookings.</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Rental Bookings</h1>
            <ul className="space-y-4">
                {bookings.map((booking, index) => (
                    <li key={index} className="border p-4 rounded shadow-md bg-white">
                        <p><strong>Booking ID:</strong> {booking._id}</p>
                        <p><strong>Customer Name:</strong> {booking["Full Name"]}</p>
                        <p><strong>Customer Email:</strong> {booking["Email"]}</p>
                        <p><strong>Phone Number:</strong> {booking["Phone Number"]}</p>
                        <p><strong>Rental Start Date:</strong> {booking["Rental Start Date"]}</p>
                        <p><strong>Rental Return Date:</strong> {booking["Rental Return Date"]}</p>
                        <p><strong>Bike Model:</strong> {booking["Bike Type"]}</p>
                        <p><strong>Bike Size:</strong> {booking["Frame Size"]}</p>
                        <p><strong>Rental Duration:</strong> {booking["Rental Duration"]}</p>
                        <p><strong>Duration Value:</strong> {booking["Number of selected duration"]}</p>
                        {/* Modify Button */}
                        <button
                            onClick={() => handleModify(booking)}
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition mr-4"
                        >
                            Modify
                        </button>
                        {/* Delete Button */}
                        <button
                            onClick={() => handleDelete(booking._id)}
                            className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {isEditing && (
                <div className="modal fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-md w-1/2">
                        <h2 className="text-2xl font-bold mb-4">Modify Booking</h2>
                        <form onSubmit={handleSubmit}>
                            <label className="block mb-2">Full Name:</label>
                            <input
                                type="text"
                                name="Full Name"
                                value={updatedBooking["Full Name"]}
                                onChange={handleChange}
                                className="mb-4 p-2 border border-gray-300 rounded w-full"
                            />
                            <label className="block mb-2">Email:</label>
                            <input
                                type="email"
                                name="Email"
                                value={updatedBooking["Email"]}
                                onChange={handleChange}
                                className="mb-4 p-2 border border-gray-300 rounded w-full"
                            />
                            <label className="block mb-2">Phone Number:</label>
                            <input
                                type="text"
                                name="Phone Number"
                                value={updatedBooking["Phone Number"]}
                                onChange={handleChange}
                                className="mb-4 p-2 border border-gray-300 rounded w-full"
                            />
                            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">Save Changes</button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition ml-2"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

};

export default RentalBookings;
