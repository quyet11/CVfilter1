// src/components/RecruiterHome.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import '../styles/RecruiterHome.css'; // Đường dẫn đến file CSS

const RecruiterHome = () => {
    return (
        <div className="recruiter-home">
            {/* Sidebar for Recruiter */}
            <div className="sidebar">
                <h2>Recruiter</h2>
                <Link to="/job-postings">
                    <i className="fas fa-list-alt icon"></i>Job Posting Management
                </Link>
                <Link to="/ai-cv-filtering">
                    <i className="fas fa-search icon"></i>AI CV Filtering
                </Link>
                <Link to="/candidate-search">
                    <i className="fas fa-users icon"></i>Candidate Search
                </Link>
                <Link to="/application-status">
                    <i className="fas fa-file-alt icon"></i>Application Status
                </Link>
                <Link to="/security-settings">
                    <i className="fas fa-shield-alt icon"></i>Security Settings
                </Link>
                <Link to="/privacy-settings">
                    <i className="fas fa-cog icon"></i>Privacy Settings
                </Link>
            </div>

            {/* Main Content for Recruiter */}
            <div className="content">
                <h1>Welcome to the Recruiter Dashboard</h1>
                <p>
                    Manage your job postings, filter applicants with AI, and track application statuses. Use the sidebar to navigate through your options and adjust your security and privacy settings.
                </p>
            </div>
        </div>
    );
};

export default RecruiterHome;
