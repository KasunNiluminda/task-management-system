import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, updateTaskStatus, deleteTask }) {
    if (!tasks.length) {
        return <div>No tasks available</div>;
    }

    return (
        <div>
            {tasks.map(task => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    updateTaskStatus={updateTaskStatus} 
                    deleteTask={deleteTask} 
                />
            ))}
        </div>
    );
}

export default TaskList;
