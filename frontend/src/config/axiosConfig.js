import axios from "axios";

// const token =
//   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXN1biIsImV4cCI6MTcxNzc4MDUzNywiaWF0IjoxNzE3NzQ0NTM3fQ.4xHPiU1QGjBuG9-oNJmbjDQI_ViLkqz553h5U0Fe_e4";

// const axiosInstance = axios.create({
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
// });

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    // Retrieve token from localStorage
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default axiosInstance;
