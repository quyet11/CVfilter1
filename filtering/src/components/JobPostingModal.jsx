import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/JobPostingModal.css'; // Thêm CSS nếu cần
import { useNavigate } from 'react-router-dom';

// Thiết lập Modal root element
Modal.setAppElement('#root');

const JobPostingModal = ({ isOpen, onRequestClose, onAddJobPosting }) => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [requiredSkills, setRequiredSkills] = useState('');
    const [experience, setExperience] = useState('');
    const [salaryRange, setSalaryRange] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [jobType, setJobType] = useState('full-time');
    const [postedDate, setPostedDate] = useState(new Date().toISOString()); // Định dạng đầy đủ ISO

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra giá trị postedDate trước khi gửi
        console.log('Posted Date (before sending):', postedDate);

        try {
            const response = await fetch('http://localhost:3001/job-postings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jobTitle,
                    jobDescription,
                    requiredSkills,
                    experience,
                    salaryRange,
                    expiryDate,
                    jobType,
                    postedDate // Đảm bảo postedDate được gửi lên API
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Job posting saved:', data);

            resetForm(); // Reset form after saving
            onAddJobPosting(data); // Cập nhật danh sách job trong component cha
            onRequestClose(); // Đóng modal

            // Chuyển hướng tới trang danh sách job postings
            navigate('/job-postings');
        } catch (error) {
            console.error('Lỗi khi lưu job posting:', error);
        }
    };



    const resetForm = () => {
        setJobTitle('');
        setJobDescription('');
        setRequiredSkills('');
        setExperience('');
        setSalaryRange('');
        setExpiryDate('');
        setJobType('full-time');
        setPostedDate(new Date().toISOString()); // Reset postedDate với thời gian hiện tại
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Create/Edit Job Posting">
            <h2>Create/Edit Job Posting</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="job-title">Job Title:</label>
                    <input
                        type="text"
                        id="job-title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="Enter job title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="job-description">Job Description:</label>
                    <textarea
                        id="job-description"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Enter job description"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="required-skills">Required Skills:</label>
                    <input
                        type="text"
                        id="required-skills"
                        value={requiredSkills}
                        onChange={(e) => setRequiredSkills(e.target.value)}
                        placeholder="Enter required skills"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="experience">Experience (Years):</label>
                    <input
                        type="text"
                        id="experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="Enter required experience in years"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="salary-range">Salary Range:</label>
                    <input
                        type="text"
                        id="salary-range"
                        value={salaryRange}
                        onChange={(e) => setSalaryRange(e.target.value)}
                        placeholder="Enter salary range"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="expiry-date">Expiry Date:</label>
                    <input
                        type="date"
                        id="expiry-date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="job-type">Job Type:</label>
                    <select
                        id="job-type"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                    >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="internship">Internship</option>
                    </select>
                </div>

                <div className="button-container">
                    <button className="button" type="submit">Save</button>
                    <button className="button cancel" type="button" onClick={onRequestClose}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default JobPostingModal;
