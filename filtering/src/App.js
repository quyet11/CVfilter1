import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import ApplicantHome from './components/ApplicantHome';
import RecruiterHome from './components/RecruiterHome';
import ForgotPassword from './components/ForgotPassword';
import JobPostingList from './components/JobPostingList'; // Import JobPostingList
import CandidateSearch from './components/CandidateSearch';
import AiCvFiltering from "./components/AiCvFiltering";
import JobSearch from "./components/JobSearch";
import CandidateProfile from "./components/CandidateProfile";
import JobDetails   from "./components/JobDetails";
import './App.css';
import ApplicationForm from "./components/ApplicationForm";
import ApplicantDetails from "./components/ApplicantDetails";
import ApplicationStatus from './components/ApplicationStatus'; // Import your components
import ApplicationDetails from './components/ApplicationDetails'; // Import the ApplicationDetails component



function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Đường dẫn mặc định đến trang đăng nhập */}
                    <Route path="/" element={<Auth />} />

                    {/* Đường dẫn đến trang của applicant */}
                    <Route path="/ApplicantHome" element={<ApplicantHome />} />

                    {/* Đường dẫn đến trang của recruiter */}
                    <Route path="/RecruiterHome" element={<RecruiterHome />} />

                    {/* Đường dẫn đến trang danh sách bài đăng việc làm */}
                    <Route path="/job-postings" element={<JobPostingList />} />

                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/candidate-search" element={<CandidateSearch />} />
                    <Route path="/ai-cv-filtering" element={<AiCvFiltering />} />
                    <Route path="/job-search" element={<JobSearch />} />
                    <Route path="/candidate-profile" element={<CandidateProfile />} />
                    <Route path="/job-details" element={<JobDetails />} />
                    <Route path="/application-form" element={<ApplicationForm />} />
                    <Route path="/applicant/:id" element={<ApplicantDetails />} />
                    <Route path="/application-status" element={<ApplicationStatus />} />
                    <Route path="/application-details" element={<ApplicationDetails />} />


                </Routes>
            </div>
        </Router>
    );
}

export default App;
