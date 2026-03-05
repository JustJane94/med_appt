import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    // State for mobile menu toggle
    const [click, setClick] = useState(false);
    // State for login status and user info
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    
    const handleClick = () => setClick(!click);

    const handleLogout = () => {
        // 1. Clear Session Storage (Auth and User details)
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        
        // 2. Clear Local Storage (Doctor and Review data)
        localStorage.removeItem("doctorData");
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("reviewFormData_")) {
                localStorage.removeItem(key);
            }
        }

        // 3. Reset State and Refresh Page
        setIsLoggedIn(false);
        setUsername("");
        setEmail("");
        window.location.reload();
    }

    useEffect(() => { 
        const storedEmail = sessionStorage.getItem("email");

        if (storedEmail) {
            setIsLoggedIn(true);
            setEmail(storedEmail);
            // REQUIREMENT: Extract name from email (e.g., "jane" from "jane@gmail.com")
            const extractedName = storedEmail.split('@')[0];
            setUsername(extractedName);
        }
    }, []);

    return (
        <nav className="navbar">
            <div className="nav__logo">
                <Link to="/">
                    StayHealthy <i style={{color:'#2190FF'}} className="fa fa-user-md"></i>
                </Link>
                <span>.</span>
            </div>

            {/* Mobile Menu Icon */}
            <div className="nav__icon" onClick={handleClick}>
                <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
            </div>

            <ul className={click ? 'nav__links active' : 'nav__links'}>
                <li className="link">
                    <Link to="/">Home</Link>
                </li>
                <li className="link">
                    <Link to="/search/doctors">Appointments</Link>
                </li>
                <li className="link">
                    <Link to="/healthblog">Health Blog</Link>
                </li>
                <li className="link">
                    <Link to="/reviews">Reviews</Link>
                </li>

                {/* CONDITIONAL RENDERING: Welcome Message + Logout vs Sign Up + Login */}
                {isLoggedIn ? (
                    <>
                        <li className="link" style={{color:'#2190FF', fontWeight:'bold', alignSelf:'center'}}>
                            Welcome, {username}
                        </li>
                        <li className="link">
                            <button className="btn2" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="link">
                            <Link to="/signup">
                                <button className="btn1">Sign Up</button>
                            </Link>
                        </li>
                        <li className="link">
                            <Link to="/login">
                                <button className="btn1">Login</button>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;