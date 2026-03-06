import React, { useEffect, useState } from 'react';
import './Notification.css'; 

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(true);

  // Function to fetch data from storage
  const updateNotificationData = () => {
    const storedUsername = sessionStorage.getItem('email');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    // Check for general appointment data first (Global Key)
    const genericData = JSON.parse(localStorage.getItem('appointmentData'));
    
    // Fallback: check for doctor-specific data
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const doctorSpecificData = storedDoctorData ? JSON.parse(localStorage.getItem(storedDoctorData.name)) : null;

    const finalData = genericData || doctorSpecificData;

    if (finalData) {
      setAppointmentData(finalData);
    } else {
      setAppointmentData(null);
    }
  };

  useEffect(() => {
    // Initial load
    updateNotificationData();

    // Listen for changes in localStorage from OTHER pages/tabs
    const handleStorageChange = () => {
      updateNotificationData();
    };

    // Listen for custom events (if booking happens on the same page)
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('appointmentUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('appointmentUpdated', handleStorageChange);
    };
  }, []);

  return (
    <div>
      {children}
      
      {isLoggedIn && appointmentData && showNotification && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Details</h3>
            <p className="appointment-card__message">
              <strong>Patient:</strong> {username}
            </p>
            <p className="appointment-card__message">
              <strong>Doctor:</strong> {appointmentData.doctorName || appointmentData.doctor || appointmentData.name}
            </p>
            <p className="appointment-card__message">
              <strong>Date:</strong> {appointmentData.date || appointmentData.selectedDate}
            </p>
            <p className="appointment-card__message">
              <strong>Time:</strong> {appointmentData.time || appointmentData.selectedSlot}
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