import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    
    const handleClick = () => setClick(!click);

    const handleLogout = () => {
        sessionStorage.clear(); // Clears all auth data at once
        localStorage.removeItem("doctorData");
        // Remove review data
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("reviewFormData_")) {
            localStorage.removeItem(key);
          }
        }
        setIsLoggedIn(false);
        window.location.reload();
    }

    useEffect(() => { 
      const storedEmail = sessionStorage.getItem("email");
      if (storedEmail) {
            setIsLoggedIn(true);
            // EXTRACTION LOGIC: Get name before the '@' symbol
            const nameFromEmail = storedEmail.split('@')[0];
            setUsername(nameFromEmail);
          }
    }, []);

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          StayHealthy <i style={{color:'#2190FF'}} className="fa fa-user-md"></i>
        </Link>
        <span>.</span>
      </div>
      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      <ul className={click ? 'nav__links active' : 'nav__links'}>
        <li className="link"><Link to="/">Home</Link></li>
        <li className="link"><Link to="/search/doctors">Appointments</Link></li>
        <li className="link"><Link to="/healthblog">Health Blog</Link></li>
        <li className="link"><Link to="/reviews">Reviews</Link></li>

        {isLoggedIn ? (
          <>
            {/* Display username to the left of Logout button */}
            <li className="link" style={{color:'#2190FF', fontWeight:'bold'}}>
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
              <Link to="/signup"><button className="btn1">Sign Up</button></Link>
            </li>
            <li className="link">
              <Link to="/logout"><button className="btn1">Logout</button></Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;