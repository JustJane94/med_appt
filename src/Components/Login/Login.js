import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);


  const login = async (e) => {
    e.preventDefault();
    try {
      // ADDED: Explicit '/' before 'api' to prevent broken URLs
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("email", email);
        navigate("/");
        window.location.reload();
      } else {
        alert(json.errors ? json.errors[0].msg : "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Could not connect to the server. Please ensure the backend is running on port 8181.");
    }
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
          <p>Are you a new member? <a href="/signup" style={{color: '#2190FF'}}>Sign Up Here</a></p>
        </div>
        <div className="login-form">
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Login</button>
              <button type="reset" className="btn btn-danger" onClick={() => {setEmail(""); setPassword("");}}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;