import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    ClipboardCheck,
    User,
    Settings,
    LogOut,
    GraduationCap,
    Award,
    BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import clsx from 'clsx';

const Sidebar = ({ role = 'student' }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { signout } = useContext(AuthContext);

    const links = {
        student: [
            { name: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
            { name: 'Attendance', icon: ClipboardCheck, path: '/student/attendance' },
            { name: 'Performance', icon: Award, path: '/student/marks' },
            { name: 'Schedule', icon: Calendar, path: '/student/timetable' },
            { name: 'Identity', icon: User, path: '/student/profile' },
        ],
        faculty: [
            { name: 'Dashboard', icon: LayoutDashboard, path: '/faculty/dashboard' },
            { name: 'Attendance', icon: ClipboardCheck, path: '/faculty/attendance' },
            { name: 'Marks Entry', icon: Award, path: '/faculty/marks' },
            { name: 'Settings', icon: Settings, path: '/faculty/settings' },
        ],
        admin: [
            { name: 'Surface', icon: LayoutDashboard, path: '/admin/dashboard' },
            { name: 'Students', icon: GraduationCap, path: '/admin/students' },
            { name: 'Faculty', icon: User, path: '/admin/faculty' },
            { name: 'Intelligence', icon: Award, path: '/admin/timetables' },
            { name: 'Configuration', icon: Settings, path: '/admin/settings' },
        ]
    };

    const currentLinks = links[role] || links.student;

    return (
        <aside className="w-64 h-full bg-white border-r border-gray-100 flex flex-col z-50">
            {/* Logo Section */}
            <div className="h-20 flex items-center px-8 shrink-0">
                <div
                    className="flex items-center cursor-pointer space-x-3"
                    onClick={() => navigate('/')}
                >
                    <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
                        <GraduationCap size={22} />
                    </div>
                    <span className="text-xl font-black text-slate-900 tracking-tightest uppercase italic">
                        CampusOne
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2">
                {currentLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;

                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={clsx(
                                "flex items-center px-5 py-3.5 text-[13px] font-bold rounded-2xl transition-all duration-300 group",
                                isActive
                                    ? "text-orange-600 bg-orange-50"
                                    : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                            )}
                        >
                            <Icon size={18} className={clsx(
                                "mr-3 transition-transform group-hover:scale-110",
                                isActive ? "text-orange-600" : "text-slate-400"
                            )} />
                            <span>{link.name}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-600"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-slate-50">
                <button
                    onClick={signout}
                    className="flex items-center w-full px-5 py-4 text-xs font-black text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all uppercase tracking-widest"
                >
                    <LogOut size={18} className="mr-3" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
