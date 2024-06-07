import React, { useState, useEffect } from "react";
import Navbar from "../components/Layout/Navbar.js";
import TaskList from "../components/Dashboard/TaskList.js";
import TaskForm from "../components/Dashboard/TaskForm.js";
import TaskFilter from "../components/Dashboard/TaskFilter.js";
// import axios from "axios";
import API_BASE_URL from "../../src/config/config";
import axios from "../../src/config/axiosConfig";

const CreateTask = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(null);

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

  const addTask = async (task) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, task);
      setTasks([...tasks, response.data]);
      console.log("Task added successfully:", response.data);
      alert("Task added successfully:");
    } catch (error) {
      console.error(
        "There was an error adding the task!",
        error.response?.data?.error
      );
      setError(
        error.response?.data?.error || "There was an error adding the task!"
      );
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/tasks/${id}`, { status });
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      );
      setTasks(updatedTasks);
      alert("Task status updated successfully");
      console.log("Task status updated successfully");
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
      alert("Task status updated successfully");
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
          <h1 style={styles.title}>Create Tasks</h1>
          {error && <p style={styles.error}>{error}</p>}
          <TaskFilter setFilter={setFilter} />
          <TaskForm addTask={addTask} />
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

export default CreateTask;
