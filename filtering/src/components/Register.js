import React, { useState } from 'react';

const Register = ({ toggleForm }) => {
    const [isLoading, setIsLoading] = useState(false); // Loading state for better UX

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullname = e.target.fullname.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target['confirm-password'].value;
        const user_type = e.target['user-type'].value;

        // Basic password validation: password must match confirm password
        if (password !== confirmPassword) {
            alert("Mật khẩu và xác nhận mật khẩu không khớp.");
            return;
        }

        // Add any additional password validations if needed (e.g., minimum length)
        if (password.length < 8) {
            alert("Mật khẩu phải có ít nhất 8 ký tự.");
            return;
        }

        try {
            setIsLoading(true); // Set loading state to true
            const res = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullname, email, password, user_type })
            });

            const data = await res.json();

            if (res.ok) {
                alert("Đăng ký thành công");
                window.location.href = '/'; // Redirect after success
            } else {
                // Show the error message received from the backend
                alert(`Đăng ký thất bại: ${data.message || 'Vui lòng kiểm tra thông tin.'}`);
            }
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
            alert("Có lỗi xảy ra khi đăng ký.");
        } finally {
            setIsLoading(false); // Remove loading state
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullname">Full Name</label>
                <input type="text" id="fullname" name="fullname" required />

                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />

                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm-password" required />

                <label htmlFor="user-type">User Type</label>
                <select id="user-type" name="user-type" required>
                    <option value="applicant">Applicant</option>
                    <option value="recruiter">Recruiter</option>
                </select>

                <button type="submit" className="button" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>

                <div className="links">
                    <span>Already have an account?</span>
                    <a href="#" onClick={toggleForm}>Login</a>
                </div>
            </form>
        </div>
    );
};

export default Register;
