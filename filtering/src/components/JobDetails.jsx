import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/JobDetails.css';

const JobDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Kiểm tra dữ liệu công việc từ location state
    const job = location.state?.job;

    // Log để kiểm tra nội dung của location.state
    console.log('Location state:', location.state);

    // Chức năng điều hướng đến trang đơn đăng ký
    const handleApplicationForm = () => {
        navigate('/application-form', { state: { job } });
    };

    // Hàm xử lý khi nhấn vào nút "Shortlist"
    const handleShortlist = async () => {
        if (!job) return;

        const cvData = {
            // Dữ liệu hồ sơ CV mà bạn muốn gửi đi để đánh giá
            jobTitle: job.job_title,
            companyName: job.company,
            // Thêm các trường khác nếu cần thiết
        };

        const apiKey = 'AIzaSyDujl7jCTfhCT1Apwb9UJdIR8uSdyGCRQw'; // Thay thế với API key của bạn
        const apiUrl = 'https://api.gemini.com/evaluate'; // Thay thế với URL của Gemini API

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(cvData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('AI Evaluation Result:', data);
            // Xử lý dữ liệu đánh giá và hiển thị nó trên giao diện người dùng

        } catch (error) {
            console.error('Error evaluating CV:', error);
        }
    };

    // Kiểm tra nếu không có dữ liệu công việc
    if (!job) {
        return <div>Job details not available.</div>;
    }

    return (
        <div className="container">
            <h2>Job Details</h2>
            <div className="job-info">
                <p><strong>Job Title:</strong> {job.job_title}</p>
                <p><strong>Company Name:</strong> {job.company}</p>
                <p><strong>Job Description:</strong></p>
                <p>{job.job_description}</p>
                <p><strong>Required Skills:</strong>  {job.required_skills}</p>
                <p><strong>Experience Required:</strong> {job.experience} years</p>
                <p><strong>Salary Range:</strong> {job.salary_range}</p>
                <p><strong>Expiry Date:</strong> {job.expiry_date}</p>
                <p><strong>Job Type:</strong> {job.job_type}</p>
                <p><strong>Posted Date:</strong> {job.posted_date}</p>
                <p><strong>Recruiter ID:</strong> {job.recruiter_id}</p>
            </div>

            <div className="buttons">
                <button onClick={handleApplicationForm} className="button apply-now">Apply Now</button>
                <button onClick={handleShortlist} className="button shortlist">Shortlist</button>
                <button className="button save">Save Job</button>
            </div>
        </div>
    );
};

export default JobDetails;
