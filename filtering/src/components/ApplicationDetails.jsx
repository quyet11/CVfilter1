// src/components/ApplicationDetails.jsx
import React from 'react';
import '../styles/ApplicationDetails.css'; // Create a CSS file if needed

const ApplicationDetails = () => {
    const withdrawApplication = () => {
        // Functionality for withdrawing the application can go here
        console.log('Application withdrawn');
    };

    return (
        <div className="container">
            <h2>Application Details</h2>

            <div className="details">
                <h3>Job Title: Software Engineer</h3>
                <p><strong>Company:</strong> Innovative Tech Co.</p>
                <p className="status"><strong>Application Status:</strong> Under Review</p>
                <h3>Job Description:</h3>
                <p>This position requires strong software development skills and experience with various programming languages...</p>
            </div>

            <div className="timeline">
                <h3>Application Process Steps:</h3>
                <div className="step">1. Submitted</div>
                <div className="step">2. Under Review</div>
                <div className="step">3. Interview Scheduled</div>
                <div className="step">4. Offer Extended</div>
            </div>

            <button className="button" type="button" onClick={withdrawApplication}>Withdraw Application</button>
        </div>
    );
};

export default ApplicationDetails;
