import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css'; // Don't forget to import the CSS!

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(true); // State to toggle visibility

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    // We use the doctor's name as the key to find the specific appointment
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

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

    // "Listen" for changes: if appointment is canceled in another component, hide this
    const handleStorageChange = () => {
        const checkData = localStorage.getItem(storedDoctorData?.name);
        if (!checkData) {
            setAppointmentData(null);
        }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div>
      <Navbar />
      {children}
      
      {/* OBJECTIVE: Display if logged in, data exists, and not dismissed */}
      {isLoggedIn && appointmentData && showNotification && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Details</h3>
            <p className="appointment-card__message">
              <strong>Patient:</strong> {appointmentData.name}
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