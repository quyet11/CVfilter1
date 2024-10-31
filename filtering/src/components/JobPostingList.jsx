import React, { useState, useEffect } from 'react';
import '../styles/JobPostingList.css'; // Đảm bảo tạo file CSS nếu cần
import JobPostingModal from './JobPostingModal';

const JobPostingList = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [jobPostings, setJobPostings] = useState([]); // State để lưu danh sách job postings
    const [editingJob, setEditingJob] = useState(null); // State để lưu job posting đang chỉnh sửa
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    // Hàm để gọi API và lấy job postings
    useEffect(() => {
        const fetchJobPostings = async () => {
            try {
                const response = await fetch('http://localhost:3001/job-postings');
                if (!response.ok) {
                    throw new Error('Lỗi khi lấy dữ liệu');
                }
                const data = await response.json();
                setJobPostings(data); // Cập nhật state với dữ liệu lấy được
                console.log('Job Postings:', data); // Kiểm tra dữ liệu
            } catch (error) {
                console.error('Lỗi khi lấy job postings:', error);
            }
        };

        fetchJobPostings();
    }, []); // [] để chỉ chạy một lần khi component được mount

    const openModal = () => {
        setEditingJob(null); // Reset editingJob khi mở modal
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setEditingJob(null); // Reset editingJob khi đóng modal
    };

    const handleAddJobPosting = (newJobPosting) => {
        setJobPostings((prevPostings) => {
            if (editingJob) {
                // Cập nhật job posting nếu đang ở chế độ chỉnh sửa
                const updatedPostings = [...prevPostings];
                updatedPostings[prevPostings.indexOf(editingJob)] = newJobPosting;
                return updatedPostings;
            } else {
                // Thêm job posting mới vào danh sách
                return [...prevPostings, newJobPosting];
            }
        });
        closeModal(); // Đóng modal sau khi lưu
    };

    const handleEditJobPosting = (index) => {
        setEditingJob(jobPostings[index]);
        setModalIsOpen(true);
    };

    const handleDeleteJobPosting = (index) => {
        const updatedPostings = jobPostings.filter((_, i) => i !== index);
        setJobPostings(updatedPostings);
    };

    const filteredJobPostings = jobPostings.filter(job => {
        const isTitleMatch = job.job_title && typeof job.job_title === 'string' && job.job_title.toLowerCase().includes(searchTerm.toLowerCase());
        const isStatusMatch = filterStatus === '' ||
            (filterStatus === 'active' && job.expiryDate && new Date(job.expiryDate) > new Date()) ||
            (filterStatus === 'expired' && job.expiryDate && new Date(job.expiryDate) <= new Date());

        // Kiểm tra lại các giá trị điều kiện lọc trong console
        console.log('Job:', job);
        console.log('Title match:', isTitleMatch, 'Status match:', isStatusMatch);

        return isTitleMatch && isStatusMatch;
    });


    return (
        <div className="container">
            <h2>Job Posting List</h2>
            <button onClick={openModal} className="button">Create New Job Posting</button>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Job Title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="filter-bar">
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="">Filter by Status</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                </select>
            </div>

            <table>
                <thead>
                <tr>
                    <th>Job Title</th>
                    <th>Posted Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredJobPostings.map((job, index) => (
                    <tr key={index}>
                        {console.log(job)} {/* Kiểm tra nội dung của job */}
                        <td>{job.job_title}</td>

                        {/* Chuyển đổi posted_date thành dạng hiển thị */}
                        <td>{job.posted_date ? new Date(job.posted_date).toLocaleDateString() : 'N/A'}</td>

                        {/* Hiển thị trạng thái công việc dựa trên expiryDate */}
                        <td>{new Date(job.expiry_date) > new Date() ? 'Active' : 'Expired'}</td>

                        <td className="actions">
                            <a href="#" onClick={() => handleEditJobPosting(index)}>Edit</a>
                            <a href="#" onClick={() => handleDeleteJobPosting(index)}>Delete</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <JobPostingModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                onAddJobPosting={handleAddJobPosting}
                editingJob={editingJob}
            />
        </div>
    );
}
export default JobPostingList;