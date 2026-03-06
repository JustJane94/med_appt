import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';
import SignUp from './Components/Sign_Up/Sign_Up'; 
import Login from './Components/Login/Login';
import BookingConsultation from './Components/BookingConsultation';
// ADD THIS IMPORT:
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch'; 
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import Notification from './Components/Notification/Notification'; // Ensure this import exists!



function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar/>
          <Notification>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booking" element={<BookingConsultation />} />
            
            {/* ADD THIS ROUTE: */}
            <Route path="/search/doctors" element={<FindDoctorSearch />} />
          </Routes>
          </Notification>

          
        </BrowserRouter>
    </div>
  );
}

export default App;