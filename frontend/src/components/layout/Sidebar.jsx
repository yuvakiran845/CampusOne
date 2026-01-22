import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    ClipboardCheck,
    User,
    Settings,
    LogOut,
    GraduationCap
} from 'lucide-react';
import clsx from 'clsx';

const Sidebar = ({ role = 'student' }) => {
    const location = useLocation();

    const links = {
        student: [
            { name: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
            { name: 'My Schedule', icon: Calendar, path: '/student/schedule' },
            { name: 'Attendance', icon: ClipboardCheck, path: '/student/attendance' },
            { name: 'Academics', icon: BookOpen, path: '/student/academics' },
            { name: 'Profile', icon: User, path: '/student/profile' },
        ],
        faculty: [
            { name: 'Dashboard', icon: LayoutDashboard, path: '/faculty/dashboard' },
            { name: 'My Classes', icon: BookOpen, path: '/faculty/classes' },
            { name: 'Mark Attendance', icon: ClipboardCheck, path: '/faculty/attendance' },
            { name: 'Schedule', icon: Calendar, path: '/faculty/schedule' },
            { name: 'Settings', icon: Settings, path: '/faculty/settings' },
        ],
        admin: [
            { name: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
            { name: 'Students', icon: GraduationCap, path: '/admin/students' },
            { name: 'Faculty', icon: User, path: '/admin/faculty' },
            { name: 'Timetables', icon: Calendar, path: '/admin/timetables' },
            { name: 'Settings', icon: Settings, path: '/admin/settings' },
        ]
    };

    const currentLinks = links[role] || links.student;

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col z-30 transition-transform duration-300 ease-in-out">
            {/* Logo Section */}
            <div className="h-16 flex items-center px-6 border-b border-slate-100">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                    <GraduationCap className="text-white w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-slate-900 tracking-tight">CampusOne</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Menu
                </div>
                {currentLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname.startsWith(link.path);
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={clsx(
                                "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <Icon
                                className={clsx(
                                    "w-5 h-5 mr-3 transition-colors",
                                    isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
                                )}
                            />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / User Profile Summary */}
            <div className="p-4 border-t border-slate-100">
                <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                    <LogOut className="w-5 h-5 mr-3 text-slate-400 group-hover:text-red-500" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
