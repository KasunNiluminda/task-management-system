import React from 'react';

function TaskFilter({ setFilter }) {
    return (
        <div>
            <label>Filter tasks: </label>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
            </select>
        </div>
    );
}

export default TaskFilter;
