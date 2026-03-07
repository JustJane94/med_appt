import React, { useEffect, useState } from 'react';
import './ProfileCard.css';

const ProfileCard = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    // In a real app, we fetch this from a database or SessionStorage
    const savedDetails = {
      name: "Jane Ukamaka Ugwueze",
      email: "jane.u@fmc-yenagoa.gov.ng",
      phone: "+234 800 000 0000",
      joined: "March 2026"
    };
    setUserDetails(savedDetails);
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {userDetails.name ? userDetails.name[0] : "U"}
          </div>
          <h2>{userDetails.name}</h2>
        </div>
        <div className="profile-details">
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Phone:</strong> {userDetails.phone}</p>
          <p><strong>Member Since:</strong> {userDetails.joined}</p>
        </div>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default ProfileCard;