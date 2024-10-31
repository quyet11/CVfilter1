// src/components/ApplicationStatus.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/ApplicationStatus.css'; // Create a CSS file if needed

const ApplicationStatus = () => {
    const navigate = useNavigate(); // Replaces useHistory

    const applicationDetail = () => {
        navigate('/application-details'); // Programmatic navigation
    };

    return (
        <div>
            <h2>Application Status</h2>
            <div className="application-card">
                <h3>Job Title: Software Developer</h3>
                <p><strong>Company:</strong> Tech Solutions Inc.</p>
                <p><strong>Status:</strong> Under Review</p>
                {/* Call applicationDetail function on button click */}
                <button onClick={applicationDetail} className="button" type="button">View Details</button>
            </div>

            <div className="application-card">
                <h3>Job Title: Project Manager</h3>
                <p><strong>Company:</strong> Business Corp</p>
                <p><strong>Status:</strong> Interview</p>
                <button onClick={applicationDetail} className="button" type="button">View Details</button>
            </div>

            <div className="application-card">
                <h3>Job Title: Data Analyst</h3>
                <p><strong>Company:</strong> Data Insights LLC</p>
                <p><strong>Status:</strong> Rejected</p>
                <button onClick={applicationDetail} className="button" type="button">View Details</button>
            </div>
        </div>
    );
};

export default ApplicationStatus;