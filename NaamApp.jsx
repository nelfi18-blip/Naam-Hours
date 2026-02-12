import React, { useState, useEffect } from 'react';
import { authenticateUser, fetchProjects, saveHistory } from './api';
import './styles.css';

const NaamApp = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [clockedIn, setClockedIn] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        (async () => {
            const userAuthenticated = await authenticateUser();
            setIsAuthenticated(userAuthenticated);
            if (userAuthenticated) {
                const userProjects = await fetchProjects();
                setProjects(userProjects);
                getHistory(); // Fetch user's clock in/out history
            }
        })();
    }, []);

    const getHistory = async () => {
        const userHistory = await fetchHistory();
        setHistory(userHistory);
    };

    const handleClockInOut = () => {
        if (clockedIn) {
            saveTime('out');
        } else {
            saveTime('in');
        }
        setClockedIn(!clockedIn);
    };

    const saveTime = async (type) => {
        const timestamp = new Date().toISOString();
        await saveHistory({ project: selectedProject, type, timestamp });
        getHistory(); // Refresh history
    };

    return (
        <div className={darkMode ? 'dark-mode' : ''}>
            <h1>Time Tracking App</h1>
            {isAuthenticated ? (
                <div>
                    <select onChange={(e) => setSelectedProject(e.target.value)}>
                        {projects.map((project) => (<option key={project.id} value={project.id}>{project.name}</option>))}
                    </select>
                    <button onClick={handleClockInOut}>{clockedIn ? 'Clock Out' : 'Clock In'}</button>
                    <h2>History</h2>
                    <ul>
                        {history.map((entry) => (
                            <li key={entry.timestamp}>{entry.project} - {entry.type} at {new Date(entry.timestamp).toLocaleString()}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Please log in to access the app.</p>
            )}
        </div>
    );
};

export default NaamApp;