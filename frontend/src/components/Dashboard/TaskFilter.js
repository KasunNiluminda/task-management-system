import React from "react";

function TaskFilter({ setFilter }) {
  return (
    <div style={styles.filterContainer}>
      <label style={styles.label}>Filter tasks: </label>
      <select style={styles.select} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>
    </div>
  );
}

const styles = {
  filterContainer: {
    marginTop: "30px",
    marginBottom: "50px",
  },
  label: {
    marginRight: "10px",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  select: {
    padding: "5px",
    borderRadius: "5px",
    fontSize: "1.2rem",
  },
};

export default TaskFilter;
