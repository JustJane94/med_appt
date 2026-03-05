import React, { useState } from 'react';
import './FindDoctorSearch.css';
import { useNavigate } from 'react-router-dom';

const initSpecialities = [
    'Cardiologist', 'General Physician', 'Dentist', 'Neurologist', 'Otolaryngologist'
];

const FindDoctorSearch = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSpecialities, setShowSpecialities] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (speciality) => {
        setSearchTerm(speciality);
        setShowSpecialities(false);
        // Navigates to the search results page with the specialty as a query parameter
        navigate(`/search/doctors?speciality=${speciality}`);
    };

    return (
        <div className="finddoctor">
            <center>
                <h1>Find a doctor and Consult instantly</h1>
                <div className="home-search-container">
                    <div className="doctor-search-box">
                        <input
                            type="text"
                            className="searchbar"
                            placeholder="Search doctors, clinics, hospitals, etc."
                            onFocus={() => setShowSpecialities(true)}
                            onBlur={() => setShowSpecialities(false)}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="search-icon"><i className="fa fa-search"></i></div>
                        
                        {/* The suggestion list appears based on onFocus */}
                        {showSpecialities && (
                            <div className="speciality-list">
                                {initSpecialities.map((speciality) => (
                                    <div 
                                        key={speciality} 
                                        className="speciality-item"
                                        onMouseDown={() => handleSearch(speciality)}
                                    >
                                        <i className="fa fa-search"></i>
                                        <span>{speciality}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </center>
        </div>
    );
};

export default FindDoctorSearch;