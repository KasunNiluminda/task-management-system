import React, { useState, useEffect } from "react";
// import "./App.css";
import "../assets/styles/Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../src/config/config";

const LoginForm = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const history = useHistory();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home"); // Redirect to the home page if logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Email:", username);
    console.log("Password:", password);
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, {
        username,
        password,
      });
      const { token } = response.data;
      // Store token in local storage
      localStorage.setItem("token", token);
      // Redirect to dashboard or protected route
      alert("Login successful!");
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error.response.data.error);
      alert(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1 className="logo">
        T.M.S
        </h1>
        <p className="loginName">Login</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email address"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <button type="submit" className="button">
            SIGN IN
          </button>
        </form>
        <div className="createAccount-box">
          <p>
            Don't have an account? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
