import React from 'react';

function TaskItem({ task, updateTaskStatus, deleteTask }) {
    const handleChange = (e) => {
        updateTaskStatus(task.id, e.target.value);
    };

    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <select value={task.status} onChange={handleChange}>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
            </select>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
    );
}

export default TaskItem;
