import { motion } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const StatCard = ({ title, value, label, icon: Icon, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
    >
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
                <p className={`text-xs font-medium mt-1 ${color === 'success' ? 'text-green-600' : 'text-slate-500'}`}>
                    {label}
                </p>
            </div>
            <div className={`p-3 rounded-lg ${color === 'primary' ? 'bg-indigo-50 text-indigo-600' :
                    color === 'success' ? 'bg-emerald-50 text-emerald-600' :
                        'bg-amber-50 text-amber-600'
                }`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
    </motion.div>
);

const StudentDashboard = () => {
    const { user } = useContext(AuthContext);
    const firstName = user?.name?.split(' ')[0] || 'Student';

    return (
        <DashboardLayout role="student">
            <div className="space-y-8">
                {/* Welcome Section */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Good Morning, {firstName} ☀️</h1>
                    <p className="text-slate-500">Here is what's happening in your campus today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Attendance"
                        value="85%"
                        label="+2% from last month"
                        icon={CheckCircle}
                        color="success"
                    />
                    <StatCard
                        title="Upcoming Classes"
                        value="4"
                        label="Next: Data Structures lab"
                        icon={Clock}
                        color="primary"
                    />
                    <StatCard
                        title="Pending Assignments"
                        value="2"
                        label="Due: Tomorrow"
                        icon={AlertCircle}
                        color="warning"
                    />
                </div>

                {/* Content Area Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Chart/Table Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                            <h3 className="font-bold text-slate-900 mb-4">Today's Schedule</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                                        <div className="w-16 text-center border-r border-slate-100 pr-4">
                                            <span className="block text-sm font-bold text-slate-900">09:00</span>
                                            <span className="block text-xs text-slate-500">AM</span>
                                        </div>
                                        <div className="pl-4 flex-1">
                                            <h4 className="text-sm font-bold text-slate-900">Advanced Web Development</h4>
                                            <p className="text-xs text-slate-500">Lab 2 • H. Block</p>
                                        </div>
                                        <span className="px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-600 rounded">
                                            Ongoing
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar Widget */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                            <h3 className="font-bold text-slate-900 mb-4">Notices</h3>
                            <div className="space-y-4">
                                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                                    <p className="text-sm font-medium text-amber-800">Exam Fee Deadline</p>
                                    <p className="text-xs text-amber-600 mt-1">Submit by Friday, 24th Jan</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 mt-2 bg-slate-300 rounded-full"></div>
                                    <div>
                                        <p className="text-sm text-slate-800">Holiday declared on Monday</p>
                                        <p className="text-xs text-slate-500">2 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default StudentDashboard;
