import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';
// Rename the import here to SignUp to satisfy the PascalCase rule
import SignUp from './Components/Sign_Up/Sign_Up'; 
import Login from './Components/Login/Login';
import InstantConsultation from './Components/BookingConsultation'; 
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch'; 
import Notification from './Components/Notification/Notification';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar/>
          <Notification>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              {/* Use the new PascalCase name here too */}
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/instant-consultation" element={<InstantConsultation />} />
              <Route path="/search/doctors" element={<FindDoctorSearch />} />
            </Routes>
          </Notification>
        </BrowserRouter>
    </div>
  );
}

export default App;