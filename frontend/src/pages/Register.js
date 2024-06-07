import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../src/config/config";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/register`,
        formData
      );
      console.log("Registration successful:", response.data.message);
      // Redirect to login page after successful registration
      alert("User Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
      setError(error.response.data.error);
      alert(error);
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
    },
    formBox: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      padding: "60px",
      width: "600px",
      maxWidth: "90%",
    },

    heading: {
      fontSize: "24px",
      fontWeight: 500,
      marginBottom: "2px",
      // textAlign: "center",
    },

    nameLabel: {
      top: "-20px",
      backgroundColor: "white",
      fontSize: "14px",
      marginBottom: "8px",
      marginLeft: "10px",
      padding: "0px 5px",
      color: "#333",
    },
    inputGroup: {
      display: "flex",
      gap: "16px",
      marginBottom: "16px",
      "@media (max-width: 480px)": {
        flexDirection: "column",
        gap: "0",
      },
    },
    inputGroup2: {
      display: "flex",
      gap: "16px",
      marginBottom: "-10px",
      position: "relative",
      "@media (max-width: 480px)": {
        flexDirection: "column",
        gap: "0",
      },
    },
    input: {
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
      padding: "16px",
      width: "100%",
    },

    button: {
      marginTop: "20px",
      backgroundColor: "blue",
      border: "none",
      borderRadius: "4px",
      color: "#fff",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      padding: "12px 24px",
      transition: "background-color 0.3s ease",
      // width: "100%",
    },
    loginLink: {
      marginTop: "24px",
      textAlign: "center",
    },
    labelText: {
      width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1 className="logo">T.M.S</h1>
        <h2 style={styles.heading}>Register</h2>

        <form onSubmit={handleSubmit}>
          <label style={styles.nameLabel}></label>

          <div style={styles.inputGroup2}>
            <div style={styles.labelText}>
              <label style={styles.nameLabel}>Email *</label>
            </div>

            <div style={styles.labelText}>
              <label style={styles.nameLabel}>Username *</label>
            </div>
          </div>
          <div style={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="username"
              placeholder="username"
              value={formData.phone_number}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup2}>
            <div style={styles.labelText}>
              <label style={styles.nameLabel}>Password *</label>
            </div>

            <div style={styles.labelText}>
              <label style={styles.nameLabel}>Member Role *</label>
            </div>
          </div>
          <div style={styles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="text"
              name="Member Role"
              placeholder="Member Role"
              value={formData.role}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Create Account
          </button>
        </form>
        <div className="createAccount-box">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
