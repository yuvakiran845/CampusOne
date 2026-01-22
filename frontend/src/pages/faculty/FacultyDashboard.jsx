import DashboardLayout from '../../components/layout/DashboardLayout';
import { Users, BookOpen, ClipboardCheck } from 'lucide-react';

const FacultyDashboard = () => {
    return (
        <DashboardLayout role="faculty">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-900">Faculty Dashboard</h1>
                    <button className="btn-primary">Mark Attendance New</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-700">Total Classes</h3>
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                <BookOpen className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">5</p>
                        <p className="text-sm text-slate-500 mt-1">Active this semester</p>
                    </div>

                    <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-700">Students</h3>
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                <Users className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">240</p>
                        <p className="text-sm text-slate-500 mt-1">Across all sections</p>
                    </div>

                    <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-700">Attendance Marked</h3>
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                <ClipboardCheck className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">98%</p>
                        <p className="text-sm text-slate-500 mt-1">Last 30 days</p>
                    </div>
                </div>

                {/* Recent Activity / Classes */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100">
                        <h3 className="font-bold text-slate-900">Today's Classes</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {[1, 2].map((i) => (
                            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div>
                                    <h4 className="font-medium text-slate-900">Advanced Data Structures</h4>
                                    <p className="text-sm text-slate-500">Class 3-A • 09:00 AM - 10:00 AM</p>
                                </div>
                                <button className="text-sm font-medium text-primary hover:text-primary-hover">
                                    View Students
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FacultyDashboard;
