import React, { useState, useEffect } from 'react';
import '../styles/AiCvFiltering.css';
import { useNavigate } from 'react-router-dom';

const AiCvFiltering = () => {
    const [applicants, setApplicants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [jobTitleFilter, setJobTitleFilter] = useState('');
    const [experienceFilter, setExperienceFilter] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/applicants');
                if (!response.ok) {
                    throw new Error('HTTP error! status: ' + response.status);
                }
                const data = await response.json();
                setApplicants(data);
            } catch (error) {
                console.error('Error fetching applicants:', error);
            }
        };

        fetchApplicants();
    }, []);

    const filteredApplicants = applicants.filter(applicant => {
        return (
            (jobTitleFilter === '' || applicant.jobTitle === jobTitleFilter) &&
            (experienceFilter === '' || applicant.experience.startsWith(experienceFilter)) &&
            (searchTerm === '' || applicant.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );

    });
    console.log(filteredApplicants)

    const handleShortlistClick = (applicantId) => {
        // Điều hướng đến trang chi tiết của ứng viên
        navigate(`/applicant/${applicantId}`);
    };

    return (
        <div className="container">
            <h2>Recruiter Dashboard</h2>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search Applicants"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="filter-bar">
                <select value={jobTitleFilter} onChange={(e) => setJobTitleFilter(e.target.value)}>
                    <option value="">Filter by Job Title</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Data Analyst">Data Analyst</option>
                </select>
                <select value={experienceFilter} onChange={(e) => setExperienceFilter(e.target.value)}>
                    <option value="">Filter by Experience</option>
                    <option value="0-2">0-2 Years</option>
                    <option value="3-5">3-5 Years</option>
                    <option value="5+">5+ Years</option>
                </select>
            </div>

            <ul className="applicant-list">
                {filteredApplicants.map(applicant => (
                    <li key={applicant.id} className="applicant-card">
                        <div>
                            <h4>{applicant.name}</h4>
                            <p>Job Title: {applicant.job_title} | Experience: {applicant.experience}</p>
                        </div>
                        <div className="action-buttons">
                            <button onClick={() => handleShortlistClick(applicant.id)}>Shortlist</button>
                            <button>Reject</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AiCvFiltering;
