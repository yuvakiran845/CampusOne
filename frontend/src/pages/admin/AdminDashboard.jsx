import DashboardLayout from '../../components/layout/DashboardLayout';
import { Users, GraduationCap, Building2, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
    return (
        <DashboardLayout role="admin">
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Admin Overview</h1>
                    <p className="text-slate-500">Manage institution-wide settings and users.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-slate-500">Total Students</h3>
                            <Users className="w-5 h-5 text-indigo-600" />
                        </div>
                        <p className="text-3xl font-bold text-slate-900">1,240</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-slate-500">Faculty Members</h3>
                            <GraduationCap className="w-5 h-5 text-emerald-600" />
                        </div>
                        <p className="text-3xl font-bold text-slate-900">84</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-slate-500">Departments</h3>
                            <Building2 className="w-5 h-5 text-amber-600" />
                        </div>
                        <p className="text-3xl font-bold text-slate-900">12</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-slate-500">Avg Attendance</h3>
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-3xl font-bold text-slate-900">92%</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 min-h-[300px] flex items-center justify-center text-slate-400">
                    Department Performance Chart Placeholder
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;
