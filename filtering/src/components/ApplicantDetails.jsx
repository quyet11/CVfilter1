// src/components/ApplicantDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ApplicantDetails = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [applicant, setApplicant] = useState(null);
    const [evaluationResult, setEvaluationResult] = useState(null);

    useEffect(() => {
        const fetchApplicant = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/applicants/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch applicant details');
                }
                const data = await response.json();
                setApplicant(data);
            } catch (error) {
                console.error('Error fetching applicant details:', error);
            }
        };

        fetchApplicant();
    }, [id]);

    const handleEvaluateClick = async () => {
        if (applicant) {
            const cvData = {
                name: applicant.name,
                email: applicant.email,
                cover_letter: applicant.cover_letter,
                cv: applicant.cv,
            };

            try {
                const response = await fetch('http://localhost:3001/api/evaluate-cv', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cvData),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setEvaluationResult(result);
            } catch (error) {
                console.error('Error during CV evaluation:', error);
            }
        }
    };

    return (
        <div className="applicant-details">
            {applicant ? (
                <>
                    <h2>{applicant.name}'s Details</h2>
                    <p>Email: {applicant.email}</p>
                    <p>Cover Letter: {applicant.cover_letter}</p>
                    <p>CV File: <a href={`http://localhost:3001/${applicant.cv}`} target="_blank" rel="noopener noreferrer">View CV</a></p>
                    <button onClick={handleEvaluateClick}>Evaluate CV</button>

                    {evaluationResult && (
                        <div className="evaluation-result">
                            <h3>Evaluation Result</h3>
                            <p>Score: {evaluationResult.score}</p>
                            <p>Feedback: {evaluationResult.feedback}</p>
                        </div>
                    )}
                </>
            ) : (
                <p>Loading applicant details...</p>
            )}
        </div>
    );
};

export default ApplicantDetails;
