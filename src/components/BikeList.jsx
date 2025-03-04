import "/src/App.css"

const BikeList = () => {
    const bikes = [
        { id: 1, name: "Road Bike", price: { hourly: 5, daily: 30, weekly: 90 }, image: "/src/assets/bike_road.jpg" },
        { id: 2, name: "Mountain Bike", price: { hourly: 7, daily: 45, weekly: 135 }, image: "/src/assets/bike_mtn.jpg" },
        { id: 3, name: "Electric Bike", price: { hourly: 5, daily: 35, weekly: 100 }, image: "/src/assets/bike_electric.jpg" },
    ];

    return (
        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Bikes Available to Rent</h2>
            <div className="flex justify-center space-x-8">
                {bikes.map((bike) => (
                    <div key={bike.id} className="text-center">
                        <img src={bike.image} alt={bike.name} className="bikeType rounded-lg shadow-lg w-64 mx-auto" />
                        <h3 className="mt-2 font-medium">{bike.name}</h3>
                        <p>Hourly: ${bike.price.hourly}/hr</p>
                        <p>Daily: ${bike.price.daily}/day</p>
                        <p>Weekly: ${bike.price.weekly}/week</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BikeList;
