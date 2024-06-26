import React, { useState, useEffect } from "react";
import Navbar from "../components/Layout/Navbar.js";
import TaskList from "../components/Dashboard/TaskList.js";
import TaskFilter from "../components/Dashboard/TaskFilter.js";
// import axios from "axios";
import API_BASE_URL from "../../src/config/config";
import axios from "../../src/config/axiosConfig";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/tasks`);
  //       setTasks(response.data);
  //     } catch (error) {
  //       console.error("There was an error fetching the tasks....!", error);
  //       setError("There was an error fetching the tasks!");
  //     }
  //   };
  //   fetchTasks();
  // }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("There was an error fetching the tasks....!", error);
      setError("There was an error fetching the tasks!");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTaskStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/tasks/${id}`, { status });
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      );
      setTasks(updatedTasks);
      alert("Task status updated successfully");
    } catch (error) {
      console.error(
        "There was an error updating the task status!",
        error.response?.data?.error
      );
      setError(
        error.response?.data?.error ||
          "There was an error updating the task status!"
      );
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      console.log("Task deleted successfully");
    } catch (error) {
      console.error(
        "There was an error deleting the task!",
        error.response?.data?.error
      );
      setError(
        error.response?.data?.error || "There was an error deleting the task!"
      );
    }
  };

  const filteredTasks = tasks.filter(
    (task) => filter === "all" || task.status === filter
  );

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div>
          <h1 style={styles.title}>
            Task Dashboard - {localStorage.getItem("role")}
          </h1>

          {error && <p style={styles.error}>{error}</p>}
          <TaskFilter setFilter={setFilter} />
          {filteredTasks.length > 0 ? (
            <TaskList
              tasks={filteredTasks}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
            />
          ) : (
            <p>No tasks available</p>
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "flex-start",
    padding: "0px 10%",
    minHeight: "100vh",
    background: "#fef8f9",
  },
  error: {
    color: "red",
  },
  title: {
    textAlign: "center",
    
  },
};

export default Home;
