// // Navbar.js - Navbar component

import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import exitImage from "../../../src/assets/images/exit.png";
import axios from "axios";
import API_BASE_URL from "../../../src/config/config";

const Navbar = () => {
  const handleLogout = async () => {
    try {
      // Make a POST request to the logout endpoint
      await axios.post(`${API_BASE_URL}/api/logout`);
      // Redirect the user to the login page after successful logout
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout failure (e.g., show error message)
    }
  };
  return (
    <nav className="navbar">
      <h1 className="logo">
        <Link to="/home">
        T.M.S
        </Link>
      </h1>
      <ul className="nav-links">
        <li>
          <Link to="/home">HOME</Link>
        </li>
        {localStorage.getItem("role") === "admin" &&
          localStorage.getItem("token") !== null && (
            <li>
              <Link to="/createTask">ADD TASKS</Link>
            </li>
          )}
        {/* <li>
          <Link to="/login">Login</Link>
        </li> */}
      </ul>
      <h1 className="logo" onClick={handleLogout}>
        <Link to="/">
          <img src={exitImage} alt="Logo" />
        </Link>
      </h1>
    </nav>
  );
};

export default Navbar;
