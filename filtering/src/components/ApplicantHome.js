// src/components/ApplicantHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ApplicantHome.css'; // Assume you store CSS separately in your project

const ApplicantHome = () => {
    return (
        <div className="applicant-home">
            {/* Sidebar for Applicant */}
            <div className="sidebar">
                <h2>Applicant</h2>
                <Link to="/job-search">
                    <i className="fas fa-search icon"></i>Job Search
                </Link>
                <Link to="/candidate-profile">
                    <i className="fas fa-user icon"></i>Candidate Profile
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

            {/* Main Content for Applicant */}
            <div className="content">
                <h1>Welcome to the Applicant Dashboard</h1>
                <p>
                    Here, you can search for jobs, manage your profile, check the status of your applications, and configure your account settings.
                    Use the sidebar to navigate between different sections.
                </p>
            </div>
        </div>
    );
};

export default ApplicantHome;
