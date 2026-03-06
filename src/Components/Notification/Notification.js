import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css'; 

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // This stores the logged-in user's email/name
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    
    // Check if storedDoctorData exists before trying to access its name property
    const storedAppointmentData = storedDoctorData 
      ? JSON.parse(localStorage.getItem(storedDoctorData.name)) 
      : null;

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    }

    const handleStorageChange = () => {
        if (storedDoctorData) {
            const checkData = localStorage.getItem(storedDoctorData.name);
            if (!checkData) {
                setAppointmentData(null);
            }
        }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div>
      <Navbar />
      {children}
      
      {isLoggedIn && appointmentData && showNotification && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Details</h3>
            
            {/* FIX: Using the 'username' variable here removes the ESLint warning */}
            <p className="appointment-card__message">
              <strong>Patient:</strong> {username}
            </p>
            
            <p className="appointment-card__message">
              <strong>Doctor:</strong> {doctorData?.name}
            </p>
            <p className="appointment-card__message">
              <strong>Speciality:</strong> {doctorData?.speciality}
            </p>
            <p className="appointment-card__message">
              <strong>Date:</strong> {appointmentData.date}
            </p>
            <p className="appointment-card__message">
              <strong>Time:</strong> {appointmentData.time}
            </p>
            <button className="close-notification" onClick={() => setShowNotification(false)}>
              Close Notification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;