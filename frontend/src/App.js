// App.js - Main App component
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"; // Import the Login component
import Register from "./pages/Register"; // Import the Register component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} /> {/* Route for Login page */}
        <Route path="/register" element={<Register />} />   {/* Route for Register page */}
        <Route path="/home" element={<Home />} /> {/* Route for Home page */}
      </Routes>
    </Router>
  );
};

export default App;
