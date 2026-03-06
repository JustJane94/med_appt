import React, { useState } from 'react';
import './FindDoctorSearch.css';
import DoctorCard from '../DoctorCard/DoctorCard';

// Sample data for your doctors (This defines 'filteredDoctors' later)
const initDoctors = [
    { id: 1, name: "Dr. Jhon Doe", speciality: "Cardiologist", experience: 15, ratings: 4.5, profilePic: "https://pixabay.com/get/g48596634594c9f95d136868153c9e6c27801867_640.jpg" },
    { id: 2, name: "Dr. Jane Smith", speciality: "Dermatologist", experience: 10, ratings: 4.8, profilePic: "https://pixabay.com/get/g08064b38d363b715693006d649987816003756_640.jpg" },
];

const FindDoctorSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState(initDoctors);

    // This handles the search logic
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = initDoctors.filter(doc => 
            doc.speciality.toLowerCase().includes(query)
        );
        setFilteredDoctors(filtered);
    };

    return (
        <div className="find-doctor-container">
            <center>
                <h2>Find a doctor and Consult remotely</h2>
                <div className="search-box-area">
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search doctors by speciality..." 
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </center>

            <div className="search-results">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map(doctor => (
                        <DoctorCard key={doctor.id} {...doctor} />
                    ))
                ) : (
                    <p>No doctors found for this speciality.</p>
                )}
            </div>
        </div>
    );
};

// CRITICAL: This fixes the "Default Export" error!
export default FindDoctorSearch;
