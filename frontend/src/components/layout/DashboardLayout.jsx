import { useState, useContext } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import {
    LayoutDashboard,
    ClipboardCheck,
    Calendar,
    Award,
    User,
    GraduationCap,
    Settings
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import clsx from 'clsx';

const DashboardLayout = ({ children, role, onProfileClick }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { user } = useContext(AuthContext);

    const mobileLinks = {
        student: [
            { name: 'Home', icon: LayoutDashboard, path: '/student/dashboard' },
            { name: 'Attendance', icon: ClipboardCheck, path: '/student/attendance' },
            { name: 'Schedule', icon: Calendar, path: '/student/timetable' },
            { name: 'Identity', icon: User, path: '/student/profile' },
        ],
        faculty: [
            { name: 'Home', icon: LayoutDashboard, path: '/faculty/dashboard' },
            { name: 'Rec', icon: ClipboardCheck, path: '/faculty/attendance' },
            { name: 'Plan', icon: Calendar, path: '/faculty/schedule' },
            { name: 'Set', icon: Settings, path: '/faculty/settings' },
        ],
        admin: [
            { name: 'Ops', icon: LayoutDashboard, path: '/admin/dashboard' },
            { name: 'Grad', icon: GraduationCap, path: '/admin/students' },
            { name: 'Team', icon: User, path: '/admin/faculty' },
            { name: 'Config', icon: Settings, path: '/admin/settings' },
        ]
    };

    const currentMobileLinks = mobileLinks[role] || mobileLinks.student;

    return (
        <div className="min-h-screen bg-[#F9F9F9] flex font-sans overflow-x-hidden">
            {/* Sidebar (Desktop only) */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <Sidebar role={role} />
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/10 backdrop-blur-sm lg:hidden transition-all"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <Header
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    isSidebarOpen={sidebarOpen}
                />

                <main className="flex-1 overflow-y-auto pb-24 lg:pb-10 scroll-smooth">
                    <div className="max-w-[1600px] mx-auto p-4 lg:p-8">
                        {children}
                    </div>
                </main>

                {/* Mobile Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex justify-around items-center px-4 py-3 lg:hidden z-50">
                    {currentMobileLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={clsx(
                                    "flex flex-col items-center space-y-1 p-2 min-w-[64px]",
                                    isActive ? "text-indigo-600" : "text-gray-400"
                                )}
                            >
                                <Icon size={20} className={isActive ? "scale-110" : ""} />
                                <span className="text-[10px] font-bold uppercase tracking-tighter">{link.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
