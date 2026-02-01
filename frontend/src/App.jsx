import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import StudentDashboard from './pages/student/StudentDashboard';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

import { AuthProvider } from './context/AuthContext';

import LandingPage from './pages/public/LandingPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            {/* Student Routes */}
            <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
            <Route path="/student/dashboard" element={<StudentDashboard activeTab="dashboard" />} />
            <Route path="/student/attendance" element={<StudentDashboard activeTab="attendance" />} />
            <Route path="/student/marks" element={<StudentDashboard activeTab="marks" />} />
            <Route path="/student/performance" element={<StudentDashboard activeTab="performance" />} />
            <Route path="/student/timetable" element={<StudentDashboard activeTab="timetable" />} />
            <Route path="/student/profile" element={<StudentDashboard activeTab="profile" />} />
            <Route path="/student/*" element={<Navigate to="/student/dashboard" replace />} />

            {/* Faculty Routes */}
            <Route path="/faculty" element={<Navigate to="/faculty/dashboard" replace />} />
            <Route path="/faculty/dashboard" element={<FacultyDashboard activeTab="dashboard" />} />
            <Route path="/faculty/attendance" element={<FacultyDashboard activeTab="attendance" />} />
            <Route path="/faculty/marks" element={<FacultyDashboard activeTab="marks" />} />
            <Route path="/faculty/notices" element={<FacultyDashboard activeTab="notices" />} />
            <Route path="/faculty/schedule" element={<FacultyDashboard activeTab="schedule" />} />
            <Route path="/faculty/profile" element={<FacultyDashboard activeTab="profile" />} />
            <Route path="/faculty/settings" element={<FacultyDashboard activeTab="settings" />} />
            <Route path="/faculty/*" element={<Navigate to="/faculty/dashboard" replace />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboard activeTab="dashboard" />} />
            <Route path="/admin/students" element={<AdminDashboard activeTab="students" />} />
            <Route path="/admin/faculty" element={<AdminDashboard activeTab="faculty" />} />
            <Route path="/admin/timetables" element={<AdminDashboard activeTab="timetables" />} />
            <Route path="/admin/settings" element={<AdminDashboard activeTab="settings" />} />
            <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
