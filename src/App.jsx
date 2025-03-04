import './App.css'
import Header from "./components/Header.jsx";
import BikeList from "./components/BikeList.jsx";
import RentalForm from "./components/RentalForm.jsx";
import RentalBookings from "./components/RentalBookings.jsx";

function App() {

  return (
      <>
        <div className="bg-gray-100 text-gray-900">
            <Header />
            <main className="py-8 px-4">
                <BikeList />
                <RentalForm />
                <RentalBookings />  {/* Render RentalBookings here */}
            </main>
        </div>
      </>
  )
}

export default App
