import React, { useState } from 'react';
import './Sign_Up.css';
import { Link } from 'react-router-dom';

const Sign_Up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        // StayHealthy Inc. Requirement: 10 digit phone number
        if (phone.length !== 10) {
            setShowError("Phone number must be exactly 10 digits.");
            return;
        }
        setShowError("");
        console.log("Form Submitted", { name, email, phone });
    };

    return (
        <div className="container">
            <div className="signup-grid">
                <div className="signup-form">
                    <form onSubmit={handleSignUp}>
                        <h2>Sign Up</h2>
                        {showError && <div className="err" style={{color: 'red'}}>{showError}</div>}
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" id="phone" required />
                        </div>
                        {/* Add Email and Password fields similarly */}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sign_Up;