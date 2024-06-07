import React, { useState } from "react";
import Navbar from "../components/Layout/Navbar.js";
import TaskList from '../components/Dashboard/TaskList.js';
import TaskForm from '../components/Dashboard/TaskForm.js';
import TaskFilter from '../components/Dashboard/TaskFilter.js';

const Home = () => {
  // Define a static array of tasks
  const initialTasks = [
    { id: 1, title: "Design Homepage", description: "Create a new homepage design", status: "PENDING" },
    { id: 2, title: "Social Media Campaign", description: "Plan and execute social media campaign", status: "IN_PROGRESS" },
    { id: 3, title: "Blog Post", description: "Write and publish a blog post", status: "COMPLETED" }
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all');

  const addTask = (task) => {
      setTasks([...tasks, task]);
  };

  const updateTaskStatus = (id, status) => {
      const updatedTasks = tasks.map(task => 
          task.id === id ? { ...task, status } : task
      );
      setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
      setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => 
      filter === 'all' || task.status === filter
  );

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div>
            <h1>Task Dashboard</h1>
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
    alignItems: "flex-start",
    padding: "20px 10%",
    minHeight: "100vh",
    background: "#fef8f9",
  },
};

export default Home;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../components/Layout/Navbar.js";
// import TaskList from '../components/Dashboard/TaskList.js';
// import TaskForm from '../components/Dashboard/TaskForm.js';
// import TaskFilter from '../components/Dashboard/TaskFilter.js';

// const Home = () => {
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState('all');

//   useEffect(() => {
//       fetch('/api/tasks')
//           .then(response => response.json())
//           .then(data => {
//               console.log("Fetched tasks:", data);  // Debugging
//               setTasks(data);
//           })
//           .catch(error => console.error('Error fetching tasks:', error));  // Error handling
//   }, []);

//   const addTask = (task) => {
//       setTasks([...tasks, task]);
//   };

//   const updateTaskStatus = (id, status) => {
//       const updatedTasks = tasks.map(task => 
//           task.id === id ? { ...task, status } : task
//       );
//       setTasks(updatedTasks);
//   };

//   const deleteTask = (id) => {
//       setTasks(tasks.filter(task => task.id !== id));
//   };

//   const filteredTasks = tasks.filter(task => 
//       filter === 'all' || task.status === filter
//   );

//   console.log("Filtered tasks:", filteredTasks);  // Debugging

//   return (
//     <>
//       <Navbar />
//       <div style={styles.container}>
//         <div>
//             <h1>Task Dashboard</h1>
//             <TaskFilter setFilter={setFilter} />
//             <TaskForm addTask={addTask} />
//             <TaskList 
//                 tasks={filteredTasks} 
//                 updateTaskStatus={updateTaskStatus} 
//                 deleteTask={deleteTask} 
//             />
//         </div>
//       </div>
//     </>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-start",
//     padding: "20px 10%",
//     minHeight: "100vh",
//     background: "#fef8f9",
//   },
// };

// export default Home;
