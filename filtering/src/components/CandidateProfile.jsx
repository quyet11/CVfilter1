import React, { useEffect, useState } from 'react';
import '../styles/CandidateProfile.css'; // Ensure you have this CSS file for styling
import axios from 'axios'; // Ensure axios is installed

const CandidateProfile = () => {
    // State variables for form inputs and profile data
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [picture, setPicture] = useState(null);
    const [experience, setExperience] = useState('');
    const [education, setEducation] = useState('');
    const [isEditing, setIsEditing] = useState(true); // Initially set to true to show form
    const [profileData, setProfileData] = useState(null); // To store profile information

    useEffect(() => {
        // Load profile data from local storage when the component mounts
        const savedProfileData = JSON.parse(localStorage.getItem('profileData'));
        const savedEditingState = localStorage.getItem('isEditing') === 'false';

        if (savedProfileData) {
            setProfileData(savedProfileData);
        }
        setIsEditing(!savedEditingState);
    }, []);

    // Handle saving changes
    const handleSaveChanges = async (event) => {
        event.preventDefault(); // Prevent page reload

        // Validate input fields
        if (!fullName || !email || !picture || !experience || !education) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('profilePicture', picture);
        formData.append('workExperience', experience);
        formData.append('education', education);

        try {
            const response = await axios.post('http://localhost:3001/api/candidate-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Lưu thành công');

            // Update profile data state
            const newProfileData = {
                fullName,
                email,
                profilePicture: response.data.profilePicture || picture.name, // Replace with filename or path if available
                workExperience: experience,
                education,
            };
            setProfileData(newProfileData);

            // Save data to local storage
            localStorage.setItem('profileData', JSON.stringify(newProfileData));
            localStorage.setItem('isEditing', 'false'); // Set editing state to false

            setIsEditing(false); // Change display status to show profile
            // Reset form fields
            setFullName('');
            setEmail('');
            setPicture(null);
            setExperience('');
            setEducation('');
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            alert('Lưu không thành công');
        }
    };

    return (
        <div className="container">
            <h2>Hồ Sơ Ứng Viên</h2>
            {isEditing ? (
                // Form for inputting profile details
                <form onSubmit={handleSaveChanges}>
                    <div className="form-group">
                        <label htmlFor="full-name">Họ Tên:</label>
                        <input
                            type="text"
                            id="full-name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Nhập họ tên"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Địa Chỉ Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập địa chỉ email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="profile-picture">Tải Lên Hình Ảnh Hồ Sơ:</label>
                        <input
                            type="file"
                            id="profile-picture"
                            onChange={(e) => setPicture(e.target.files[0])}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="work-experience">Kinh Nghiệm Làm Việc:</label>
                        <textarea
                            id="work-experience"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            placeholder="Chi tiết kinh nghiệm làm việc"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="education">Học Vấn:</label>
                        <textarea
                            id="education"
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            placeholder="Chi tiết học vấn"
                        ></textarea>
                    </div>

                    <div className="button-container">
                        <button className="button" type="submit">
                            Lưu Thay Đổi
                        </button>
                        <button
                            className="button cancel"
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                localStorage.setItem('isEditing', 'false'); // Update editing state in local storage
                            }}
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            ) : (
                // Display profile information after submission
                <div className="profile-info">
                    {profileData ? (
                        <>
                            <p>
                                <strong>Họ Tên:</strong> {profileData.fullName}
                            </p>
                            <p>
                                <strong>Email:</strong> {profileData.email}
                            </p>
                            <p>
                                <strong>Kinh Nghiệm Làm Việc:</strong> {profileData.workExperience}
                            </p>
                            <p>
                                <strong>Học Vấn:</strong> {profileData.education}
                            </p>
                            {profileData.profilePicture && (
                                <img
                                    src={profileData.profilePicture}
                                    alt="Profile"
                                    style={{ width: '100px', height: '100px' }} // Display image if available
                                />
                            )}
                            <button className="button" onClick={() => {
                                setIsEditing(true);
                                localStorage.setItem('isEditing', 'true'); // Update editing state in local storage
                            }}>
                                Chỉnh Sửa
                            </button>
                        </>
                    ) : (
                        <p>Chưa có thông tin cá nhân. Vui lòng nhập thông tin hồ sơ của bạn.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CandidateProfile;
