import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ toggleForm }) => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const res = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (res.ok) {
                const data = await res.json();  // Chuyển đổi sang JSON
                alert("Đăng nhập thành công");

                // Lưu ID người dùng vào localStorage
                const userId = data.user.id; // Giả sử phản hồi chứa ID người dùng trong data.user.id
                localStorage.setItem('userId', userId); // Lưu ID vào localStorage

                // Sửa lại phần kiểm tra user_type
                if (data.user.user_type === 'applicant') {
                    navigate('/ApplicantHome'); // Sử dụng navigate để điều hướng
                } else if (data.user.user_type === 'recruiter') {
                    navigate('/RecruiterHome'); // Sử dụng navigate để điều hướng
                }
            } else {
                alert("Sai email hoặc mật khẩu.");
            }
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
            alert("Có lỗi xảy ra khi đăng nhập.");
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password'); // Điều hướng đến trang ForgotPassword
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />

                <div className="checkbox">
                    <label>
                        <input type="checkbox"/> Remember Me
                    </label>
                    <a href="" onClick={handleForgotPassword}>Forgot Password?</a>
                </div>

                <button type="submit" className="button">Login</button>

                <div className="links">
                    <span>Don't have an account?</span>
                    <a href="#" onClick={toggleForm}>Register Now</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
