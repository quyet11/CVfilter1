import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/ApplicationForm.css';

const ApplicationForm = () => {
    const locationData = useLocation();
    const navigate = useNavigate();
    const job = locationData.state?.job;
    const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        cv: null,
        coverLetter: '',
        jobId: job?.id || '', // Đảm bảo jobId được thiết lập chính xác
    });

    const handleInputChange = (e) => {
        const { id, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('fullName', formData.fullName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('coverLetter', formData.coverLetter);
        formDataToSend.append('cv', formData.cv);
        formDataToSend.append('jobId', formData.jobId);
        formDataToSend.append('userId', userId); // Thêm ID người dùng vào dữ liệu biểu mẫu
        console.log('Form Data to Send:', formDataToSend);

        try {
            const response = await fetch('http://localhost:3001/api/apply', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Success:', data.message);
            navigate('/job-details'); // Điều hướng đến trang chi tiết công việc sau khi gửi thành công
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancel = () => {
        navigate('/job-details'); // Điều hướng đến trang chi tiết công việc
    };

    return (
        <div className="container">
            <h2>Job Application Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cv">Upload CV:</label>
                    <input
                        type="file"
                        id="cv"
                        accept=".pdf"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="coverLetter">Cover Letter:</label>
                    <textarea
                        id="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        placeholder="Write your cover letter"
                    />
                </div>

                <div className="button-container">
                    <button className="button" type="submit">Submit Application</button>
                    <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default ApplicationForm;
