import { useState, useContext, useEffect } from 'react';
import {
    Users,
    GraduationCap,
    LayoutDashboard,
    Settings,
    Search,
    Plus,
    ChevronRight,
    ArrowUpRight,
    ArrowLeft,
    CheckCircle2,
    Shield,
    Trash2,
    Edit3,
    BarChart3,
    Layers,
    Bell,
    TrendingUp,
    Zap,
    Trophy,
    Calendar,
    FileText,
    Star,
    Grid,
    User,
    Clock,
    Filter,
    Save,
    BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthContext from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';

const AdminDashboard = ({ activeTab: initialTab = 'dashboard' }) => {
    const { user, searchQuery, setSearchQuery } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState(initialTab);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    const FeatureCard = ({ title, value, icon: Icon, color, onClick, desc }) => (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden text-left"
        >
            <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-all shadow-lg shadow-current/20`}>
                <Icon size={28} className="text-white" />
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{desc}</p>
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{title}</h3>
                <div className="flex items-center gap-2 text-orange-600 font-bold text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 mt-2">
                    Access Portal <ArrowUpRight size={12} />
                </div>
            </div>
        </motion.div>
    );

    const Overview = () => (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Admin Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-left">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                        Admin <span className="text-orange-600 italic">Central.</span>
                    </h1>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">Root_Access_Level_0</span>
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><Users size={20} /></div>
                        <div>
                            <p className="text-sm font-black text-slate-900 leading-none">2,451</p>
                            <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Total Users</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard
                    title="Faculty Mgmt"
                    desc="Academic Staff"
                    icon={User}
                    color="bg-slate-950"
                    onClick={() => setActiveTab('faculty')}
                />
                <FeatureCard
                    title="Student Core"
                    desc="Enrollment Nodes"
                    icon={GraduationCap}
                    color="bg-orange-600"
                    onClick={() => setActiveTab('students')}
                />
                <FeatureCard
                    title="Intelligence"
                    desc="Data Analytics"
                    icon={BarChart3}
                    color="bg-blue-600"
                    onClick={() => setActiveTab('intelligence')}
                />
                <FeatureCard
                    title="Configuration"
                    desc="System Settings"
                    icon={Settings}
                    color="bg-indigo-600"
                    onClick={() => setActiveTab('settings')}
                />
                <FeatureCard
                    title="Compliance"
                    desc="Security Audit"
                    icon={Shield}
                    color="bg-emerald-600"
                    onClick={() => setActiveTab('compliance')}
                />
                <FeatureCard
                    title="Inventory"
                    desc="Resource Node"
                    icon={Layers}
                    color="bg-violet-600"
                    onClick={() => setActiveTab('inventory')}
                />
            </div>

            {/* Quick Metrics */}
            <div className="bg-slate-950 rounded-[3rem] p-10 text-white shadow-2xl space-y-10 relative overflow-hidden group text-left">
                <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12"><Zap size={140} /></div>
                <div className="flex items-center justify-between relative z-10">
                    <h3 className="text-2xl font-black tracking-tighter uppercase italic text-orange-500 leading-none">Live System Throughput</h3>
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest">Operational</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 relative z-10">
                    {[
                        { label: 'Network Latency', value: '42ms', color: 'text-emerald-400' },
                        { label: 'Active Sessions', value: '842', color: 'text-orange-400' },
                        { label: 'DB Integrity', value: '99.9%', color: 'text-blue-400' },
                        { label: 'System Load', value: '12%', color: 'text-violet-400' },
                    ].map((m, i) => (
                        <div key={i} className="space-y-1">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{m.label}</p>
                            <p className={`text-3xl font-black ${m.color} tracking-tighter`}>{m.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <DashboardLayout role="admin">
            <div className="max-w-7xl mx-auto py-8 md:py-16 px-4 md:px-8 pb-32">
                <style>
                    {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
                    .admin-erp-font { font-family: 'Inter', sans-serif; }
                    .admin-erp-font h1, .admin-erp-font h2, .admin-erp-font h3, .admin-erp-font h4 { font-family: 'Poppins', sans-serif; }
                    `}
                </style>
                <div className="admin-erp-font">
                    {activeTab === 'dashboard' && <Overview />}

                    {activeTab !== 'dashboard' && (
                        <div className="space-y-12 animate-in fade-in duration-700 text-left">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                                <div className="space-y-4">
                                    <button onClick={() => setActiveTab('dashboard')} className="group flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-orange-600 uppercase tracking-[0.3em] transition-all">
                                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                        Back to HUB
                                    </button>
                                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                                        {activeTab} <span className="text-slate-200">System.</span>
                                    </h1>
                                </div>
                                <div className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
                                    Audit_Node: {activeTab.toUpperCase()}_v1.0
                                </div>
                            </div>

                            <div className="py-24 text-center space-y-10">
                                <div className="w-28 h-28 bg-slate-50 rounded-[3rem] flex items-center justify-center mx-auto shadow-inner">
                                    <Layers className="text-slate-200" size={48} />
                                </div>
                                <div className="space-y-3">
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">Operational Layer Locked</h2>
                                    <p className="text-sm text-slate-400 font-medium italic uppercase tracking-widest">This terminal node is currently undergoing maintenance or sync updates.</p>
                                </div>
                                <button onClick={() => setActiveTab('dashboard')} className="px-12 py-6 bg-slate-950 text-white rounded-3xl text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-orange-600 transition-all mx-auto block active:scale-95">Return to Portal</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;
