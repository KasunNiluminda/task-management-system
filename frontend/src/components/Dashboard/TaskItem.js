import React from "react";

function TaskItem({ task, updateTaskStatus, deleteTask }) {
  const handleChange = (e) => {
    updateTaskStatus(task.id, e.target.value);
  };

  return (
    <div style={styles.taskItem}>
      <h3>Task Id : {task.id}</h3>
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <label > Update Status : </label>
      <select style={styles.select} value={task.status} onChange={handleChange}>
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <div style={{ marginTop: "10px" }}>
        {" "}
        {/* Add margin top */}
        {localStorage.getItem("role") === "admin" &&
          localStorage.getItem("token") !== null && (
            <button style={styles.button} onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          )}
      </div>
    </div>
  );
}

const styles = {
  taskItem: {
    width: "28%",
    marginRight: "20px",
    display: "inline-block",
    verticalAlign: "top",
    marginBottom: "20px",
    border: "1px solid black",
    borderRadius: "10px",
    padding: "10px",
  },
  select: {
    padding: "5px",
    borderRadius: "5px",
    fontSize: "1.2rem",
    width: "50%",
  },
  button: {
    padding: "5px 10px",
    borderRadius: "5px",
    background: "red",
    color: "white",
    cursor: "pointer",
    fontSize: "1.2rem",
    width: "60%",
    
  },
};

export default TaskItem;
