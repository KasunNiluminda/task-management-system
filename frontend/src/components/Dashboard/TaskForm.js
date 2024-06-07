import React, { useState, useEffect } from 'react';
import API_BASE_URL from "../../../src/config/config";
import axios from "../../../src/config/axiosConfig";

function TaskForm({ addTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/user`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Error fetching users');
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Get the logged-in member's ID from local storage
        const createdBy = localStorage.getItem('memberId');
        
        const newTask = {
            title,
            description,
            status: 'PENDING',
            assignedTo: parseInt(assignedTo), // Convert assignedTo to integer
            createdBy: parseInt(createdBy) // Convert createdBy to integer
        };
        try {
            const response = await axios.post(`${API_BASE_URL}/tasks`, newTask);
            addTask(response.data);
            // Reset form fields after submission
            setTitle('');
            setDescription('');
            setAssignedTo('');
        } catch (error) {
            console.error('Error adding task:', error.response?.data?.error);
            setError(error.response?.data?.error || 'Error adding task');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Task Title" 
                style={styles.input}
                required 
            />
            <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Task Description" 
                style={styles.textarea}
                required 
            ></textarea>
            <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                style={styles.select}
                required
            >
                <option value="">Select Assigned To</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.id} - {user.username}</option>
                ))}
            </select>
            <button type="submit" style={styles.button}>Create Task</button>
            {error && <p style={styles.error}>{error}</p>}
        </form>
    );
}

const styles = {
    form: {
        marginBottom: '20px',
    },
    input: {
        padding: '8px',
        marginBottom: '10px',
        width: '100%',
        boxSizing: 'border-box',
    },
    textarea: {
        padding: '8px',
        marginBottom: '10px',
        width: '100%',
        height: '100px',
        resize: 'vertical',
        boxSizing: 'border-box',
    },
    select: {
        padding: '8px',
        marginBottom: '10px',
        width: '100%',
        boxSizing: 'border-box',
    },
    button: {
        padding: '8px 16px',
        borderRadius: '5px',
        background: 'green',
        color: 'white',
        cursor: 'pointer',
        border: 'none',
        marginBottom: '20px',
        fontSize: '1.2rem', 
        width: '100%',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    }
};

export default TaskForm;
