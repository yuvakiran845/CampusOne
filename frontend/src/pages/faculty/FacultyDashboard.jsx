import { useState, useContext, useEffect, useMemo } from 'react';
import {
    LayoutDashboard,
    ClipboardCheck,
    Award,
    Bell,
    User,
    ArrowLeft,
    CheckCircle2,
    ArrowUpRight,
    Search,
    ChevronDown,
    Plus,
    Trash2,
    Save,
    Calendar,
    GraduationCap,
    Mail,
    Phone,
    Building2,
    Briefcase,
    Library,
    Users,
    Settings as SettingsIcon,
    Globe,
    ShieldCheck,
    LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';

const FacultyDashboard = ({ activeTab: initialTab = 'dashboard' }) => {
    const { user, loading, signout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(initialTab);
    const [selectedSection, setSelectedSection] = useState('CSE-E');
    const [isSaving, setIsSaving] = useState(false);

    // Sync activeTab with navigation prop
    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    // Sync activeTab with navigation state (e.g. from Header profile click)
    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    const facultyDetails = {
        name: user?.name || "Dr. Ramesh Kumar",
        id: "EMP_SVCE_4021",
        designation: "Professor",
        department: "Computer Science",
        email: "ramesh.kumar@svce.edu.in",
        phone: "+91 98480 22345",
        cabin: "HL-405",
        joinDate: "Aug 12, 2015",
        specialization: "Artificial Intelligence & Security",
        gender: "Male",
        dob: "15 May 1980",
        bloodGroup: "O+",
        experience: "15+ Years"
    };

    const collegeDetails = {
        name: "Sri Venkateswara College of Engineering",
        code: "SVCE",
        location: "Sriperumbudur, Tamil Nadu",
        established: "1985",
        affiliation: "Anna University",
        accreditation: "NAAC A++ | NBA",
        website: "www.svce.ac.in"
    };

    const departmentDetails = {
        name: "Department of Computer Science and Engineering",
        head: "Dr. K. S. Shanthi",
        facultyCount: "42",
        labs: "12 Research Labs",
        focus: "Applied AI, Cyber Security, Cloud Computing",
        block: "Information Science Block (ISB)"
    };

    const sections = ['CSE-A', 'CSE-B', 'CSE-E'];
    const studentsBySection = useMemo(() => {
        const data = {};
        sections.forEach((sec, idx) => {
            data[sec] = Array.from({ length: 50 }, (_, i) => ({
                id: i + 1,
                roll: `23BFA0${idx + 1}${String(i + 1).padStart(2, '0')}`,
                name: i % 2 === 0 ? `Student ${i + 1}A` : `Student ${i + 1}B`,
            }));
        });
        return data;
    }, []);

    const [attendanceMap, setAttendanceMap] = useState({});
    const [attendanceFinalized, setAttendanceFinalized] = useState(null);
    const [marksMap, setMarksMap] = useState(() => {
        const initial = {};
        sections.forEach(sec => {
            initial[sec] = {};
            studentsBySection[sec].forEach(s => {
                initial[sec][s.roll] = {
                    int1_exam: '', int1_assgn: '',
                    int2_exam: '', int2_assgn: ''
                };
            });
        });
        return initial;
    });

    if (loading) return null;

    const BackButton = ({ onClick }) => (
        <button
            onClick={() => {
                if (onClick) {
                    onClick();
                } else {
                    setActiveTab('dashboard');
                    navigate('/faculty/dashboard', { state: {} });
                }
            }}
            className="group flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-[0.3em] transition-all mb-8"
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
        </button>
    );

    const FeatureCard = ({ title, label, icon: Icon, color, onClick, subtext }) => (
        <motion.div
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="bg-white p-6 rounded-3xl md:rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex items-center gap-6 text-left"
        >
            <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-all`}>
                <Icon size={24} className="text-white" />
            </div>
            <div className="space-y-0.5">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</p>
                <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">{title}</h3>
                {subtext && (
                    <div className="flex items-center gap-1 text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">
                        {subtext} <ArrowUpRight size={8} />
                    </div>
                )}
            </div>
        </motion.div>
    );

    const Overview = () => (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pt-4">
                <div className="space-y-4 text-left">
                    <div className="space-y-1 text-left">
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
                            FACULTY <span className="text-slate-200">HUB.</span>
                        </h1>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-slate-950 text-white rounded-lg text-[8px] font-black tracking-[0.3em] uppercase">
                                {collegeDetails.code}_NODE_2026
                            </span>
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                    title="Attendance"
                    label="Session Sync"
                    icon={ClipboardCheck}
                    color="bg-indigo-600"
                    onClick={() => navigate('/faculty/attendance')}
                />
                <FeatureCard
                    title="Marks Entry"
                    label="Academic Yield"
                    icon={Award}
                    color="bg-teal-600"
                    onClick={() => navigate('/faculty/marks')}
                    subtext="Yield Matrix Active"
                />
                <FeatureCard
                    title="Announcements"
                    label="Global Feed"
                    icon={Bell}
                    color="bg-rose-500"
                    onClick={() => navigate('/faculty/notices')}
                />
                <FeatureCard
                    title="Profile"
                    label="Node Config"
                    icon={User}
                    color="bg-slate-900"
                    onClick={() => navigate('/faculty/profile')}
                    subtext="View Details"
                />
                <FeatureCard
                    title="Settings"
                    label="System Config"
                    icon={SettingsIcon}
                    color="bg-amber-500"
                    onClick={() => navigate('/faculty/settings')}
                    subtext="College & Dept"
                />
            </div>

            <div className="bg-white rounded-3xl md:rounded-[3rem] p-6 sm:p-10 border border-slate-50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-left space-y-1">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">Recent Sync Operations</h3>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Historical Node Audit Log</p>
                </div>
                <button className="px-10 py-5 bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-slate-950 hover:text-white transition-all shadow-sm">
                    Archive
                </button>
            </div>

            {/* Dashboard Ending Sign Out Button */}
            <div className="flex justify-center pt-8">
                <button
                    onClick={signout}
                    className="flex items-center gap-3 px-10 py-5 bg-rose-50 text-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-sm hover:bg-rose-600 hover:text-white transition-all active:scale-95 group border border-rose-100"
                >
                    <LogOut size={16} className="group-hover:rotate-12 transition-transform" />
                    Terminate Faculty Session
                </button>
            </div>
        </div>
    );

    const AttendanceModule = () => {
        const toggleRoll = (roll) => {
            setAttendanceMap(prev => ({
                ...prev,
                [selectedSection]: {
                    ...(prev[selectedSection] || {}),
                    [roll]: !prev[selectedSection]?.[roll]
                }
            }));
        };

        const handleFinalize = () => {
            const sectionData = attendanceMap[selectedSection] || {};
            const presentCount = Object.values(sectionData).filter(Boolean).length;
            setAttendanceFinalized({
                section: selectedSection,
                present: presentCount,
                absent: studentsBySection[selectedSection].length - presentCount,
                date: new Date().toLocaleDateString('en-GB'),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                subject: "Advanced Operating Systems"
            });
        };

        if (attendanceFinalized) {
            return (
                <div className="space-y-12 animate-in fade-in zoom-in duration-500 text-left">
                    <BackButton />
                    <div className="bg-white rounded-[3.5rem] p-12 border-2 border-emerald-100 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 text-emerald-600">
                            <CheckCircle2 size={160} />
                        </div>
                        <div className="space-y-10 relative z-10">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-emerald-600">
                                    <CheckCircle2 size={24} />
                                    <span className="text-xs font-black uppercase tracking-[0.4em]">Synchronization Complete</span>
                                </div>
                                <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">{attendanceFinalized.subject}</h1>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Section Node</p>
                                    <p className="text-3xl font-black text-slate-900">{attendanceFinalized.section}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sync Date</p>
                                    <p className="text-3xl font-black text-slate-900">{attendanceFinalized.date}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Presentees</p>
                                    <p className="text-3xl font-black text-emerald-600">{attendanceFinalized.present}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Absentees</p>
                                    <p className="text-3xl font-black text-rose-600">{attendanceFinalized.absent}</p>
                                </div>
                            </div>

                            <div className="pt-10 border-t border-slate-50 flex flex-wrap gap-4">
                                <button onClick={() => setAttendanceFinalized(null)} className="px-10 py-5 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-emerald-600 transition-all">Download Audit PDF</button>
                                <button
                                    onClick={() => {
                                        setActiveTab('dashboard');
                                        navigate('/faculty/dashboard', { state: {} });
                                    }}
                                    className="px-10 py-5 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-slate-200 transition-all"
                                >
                                    Exit to Hub
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-12 animate-in slide-in-from-bottom-6 duration-700 text-left pt-10">
                <div className="flex flex-col sm:flex-row md:flex-row justify-between items-start md:items-end gap-8">
                    <div className="space-y-4">
                        <BackButton />
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Attendance <span className="text-slate-200">Sync.</span></h1>
                    </div>
                    <div className="flex bg-slate-50 p-2 rounded-[1.5rem] border border-slate-100 flex-wrap">
                        {sections.map(sec => (
                            <button
                                key={sec}
                                onClick={() => setSelectedSection(sec)}
                                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedSection === sec ? 'bg-white shadow-xl text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {sec}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-[3.5rem] p-10 md:p-12 border border-slate-50 shadow-sm space-y-12">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Institutional Roll Roster</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Students: {studentsBySection[selectedSection].length} • Select Presentees</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3">
                        {studentsBySection[selectedSection].map(student => {
                            const isPresent = attendanceMap[selectedSection]?.[student.roll];
                            return (
                                <motion.button
                                    key={student.roll}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => toggleRoll(student.roll)}
                                    className={`aspect-square rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 shadow-sm relative ${isPresent ? 'border-emerald-500 bg-white ring-4 ring-emerald-50' : 'bg-slate-50 border-slate-100 text-slate-300'}`}
                                >
                                    <span className={`text-[11px] font-black tabular-nums tracking-tighter ${isPresent ? 'text-emerald-600' : 'text-slate-900'}`}>{student.roll.slice(-3)}</span>
                                    {isPresent && <CheckCircle2 size={12} strokeWidth={4} className="text-emerald-500 absolute -top-1 -right-1 bg-white rounded-full" />}
                                </motion.button>
                            );
                        })}
                    </div>

                    <div className="mt-12 p-6 sm:p-10 bg-slate-950 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12"><ClipboardCheck size={140} /></div>
                        <div className="space-y-2 relative z-10 text-left">
                            <h3 className="text-3xl font-black tracking-tighter leading-none uppercase italic">Finalize Synchronization</h3>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Unselected students will be marked as Absentees</p>
                        </div>
                        <button
                            onClick={handleFinalize}
                            className="w-full md:w-auto px-12 py-6 bg-indigo-600 hover:bg-emerald-600 rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-95 relative z-10 min-w-[300px]"
                        >
                            Finalize Attendance Sync
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const MarksModule = () => {
        const updateMark = (roll, field, val) => {
            const numVal = parseInt(val) || 0;
            const max = field.includes('assgn') ? 5 : 25;
            if (numVal > max) return;

            setMarksMap(prev => ({
                ...prev,
                [selectedSection]: {
                    ...prev[selectedSection],
                    [roll]: {
                        ...prev[selectedSection][roll],
                        [field]: val
                    }
                }
            }));
        };

        const deleteMarks = (roll) => {
            setMarksMap(prev => ({
                ...prev,
                [selectedSection]: {
                    ...prev[selectedSection],
                    [roll]: { int1_exam: '', int1_assgn: '', int2_exam: '', int2_assgn: '' }
                }
            }));
        };

        return (
            <div className="space-y-12 animate-in slide-in-from-bottom-6 duration-700 text-left pt-10">
                <div className="flex flex-col sm:flex-row md:flex-row justify-between items-start md:items-end gap-8">
                    <div className="space-y-4">
                        <BackButton />
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Marks <span className="text-slate-200">Vault.</span></h1>
                    </div>
                    <div className="flex bg-slate-50 p-2 rounded-[1.5rem] border border-slate-100 flex-wrap">
                        {sections.map(sec => (
                            <button
                                key={sec}
                                onClick={() => setSelectedSection(sec)}
                                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedSection === sec ? 'bg-white shadow-xl text-teal-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {sec}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-[3.5rem] p-4 sm:p-10 md:p-12 border border-slate-50 shadow-sm space-y-10 overflow-x-auto">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-8">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Internal Yield Matrix</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Int 1 (25+5) • Int 2 (25+5)</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto pb-8">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="border-b border-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="py-6 pl-4">Student Identity</th>
                                    <th className="py-6 px-4 text-center bg-slate-50/50 rounded-t-3xl">Int 1 Exam (25)</th>
                                    <th className="py-6 px-4 text-center bg-slate-50/50">Int 1 Assgn (5)</th>
                                    <th className="py-6 px-4 text-center bg-teal-50/30">Int 2 Exam (25)</th>
                                    <th className="py-6 px-4 text-center bg-teal-50/30 rounded-t-3xl">Int 2 Assgn (5)</th>
                                    <th className="py-6 text-center">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsBySection[selectedSection].slice(0, 15).map(student => {
                                    const marks = marksMap[selectedSection][student.roll];
                                    return (
                                        <tr key={student.roll} className="border-b border-slate-50 group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-6 pl-4">
                                                <p className="text-sm font-black text-slate-900 leading-none">{student.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{student.roll}</p>
                                            </td>
                                            <td className="py-6 px-4 bg-slate-50/50">
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={marks.int1_exam}
                                                    onChange={(e) => updateMark(student.roll, 'int1_exam', e.target.value)}
                                                    className="w-20 p-4 bg-white border-2 border-slate-200 rounded-2xl text-base font-black text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all text-center mx-auto block shadow-sm"
                                                />
                                            </td>
                                            <td className="py-6 px-4 bg-slate-50/50">
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={marks.int1_assgn}
                                                    onChange={(e) => updateMark(student.roll, 'int1_assgn', e.target.value)}
                                                    className="w-20 p-4 bg-white border-2 border-slate-200 rounded-2xl text-base font-black text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all text-center mx-auto block shadow-sm"
                                                />
                                            </td>
                                            <td className="py-6 px-4 bg-teal-50/20">
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={marks.int2_exam}
                                                    onChange={(e) => updateMark(student.roll, 'int2_exam', e.target.value)}
                                                    className="w-20 p-4 bg-white border-2 border-teal-100 rounded-2xl text-base font-black text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition-all text-center mx-auto block shadow-sm"
                                                />
                                            </td>
                                            <td className="py-6 px-4 bg-teal-50/20">
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={marks.int2_assgn}
                                                    onChange={(e) => updateMark(student.roll, 'int2_assgn', e.target.value)}
                                                    className="w-20 p-4 bg-white border-2 border-teal-100 rounded-2xl text-base font-black text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition-all text-center mx-auto block shadow-sm"
                                                />
                                            </td>
                                            <td className="py-6 text-center">
                                                <button
                                                    onClick={() => deleteMarks(student.roll)}
                                                    className="p-4 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <div className="mt-16 p-6 sm:p-10 bg-slate-950 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12"><Award size={140} /></div>
                            <div className="space-y-3 relative z-10 text-left">
                                <h3 className="text-3xl font-black tracking-tighter leading-none uppercase italic">Finalize Academic Yield</h3>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Ensure all nodes are audited before final synchronization</p>
                            </div>
                            <button
                                onClick={() => { setIsSaving(true); setTimeout(() => setIsSaving(false), 2000); }}
                                className="w-full md:w-auto px-16 py-6 bg-teal-600 hover:bg-teal-500 rounded-3xl text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-95 relative z-10 min-w-[320px]"
                            >
                                {isSaving ? <span className="animate-pulse">Vaulting Yield...</span> : "Submit Final Yield Data"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const AnnouncementsModule = () => (
        <div className="space-y-12 animate-in slide-in-from-bottom-6 duration-700 text-left pt-10">
            <div className="space-y-4">
                <BackButton />
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Global <span className="text-slate-200">Feed.</span></h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10">
                {[
                    {
                        title: "Future Builders Hackathon",
                        type: "Hackathon Overflow",
                        date: "Nov 24-26, 2026",
                        img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
                        color: "bg-indigo-600",
                        tag: "INSTITUTIONAL SYNC"
                    },
                    {
                        title: "AI & Neural Networks Course",
                        type: "Advanced Node",
                        date: "Starting Dec 1, 2026",
                        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
                        color: "bg-teal-600",
                        tag: "PROFESSIONAL YIELD"
                    }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-[3rem] overflow-hidden border border-slate-50 shadow-sm flex flex-col h-full group"
                    >
                        <div className="h-64 relative bg-slate-900">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute top-8 left-8">
                                <span className={`px-4 py-2 ${item.color} text-white text-[9px] font-black uppercase tracking-widest rounded-xl`}>{item.tag}</span>
                            </div>
                        </div>
                        <div className="p-10 space-y-6 flex-1 flex flex-col justify-between">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{item.type} • {item.date}</p>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight">{item.title}</h3>
                            </div>
                            <button className="w-full py-5 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-950 hover:text-white transition-all">Request Entry Node</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );

    const ProfileModule = () => (
        <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-6 duration-700 text-left bg-white p-4 sm:p-8 md:p-12 min-h-screen pt-10 rounded-[3rem] shadow-sm">
            <BackButton />

            <div className="space-y-2 border-b border-slate-200 pb-6">
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Profile Details</h1>
                <p className="text-slate-400 font-medium tracking-tight">Manage your institutional identity and node configuration.</p>
            </div>

            <div className="space-y-8 pt-4">
                <div className="border-b border-slate-200 pb-2">
                    <h3 className="text-xl font-semibold text-slate-900">Personal Details</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-y-8 gap-x-12">
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Full Name</p>
                        <p className="text-lg font-semibold text-slate-900 uppercase">{facultyDetails.name}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Gender</p>
                        <p className="text-lg font-semibold text-slate-900 uppercase">{facultyDetails.gender}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Date of Birth</p>
                        <p className="text-lg font-semibold text-slate-900">{facultyDetails.dob}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Mobile number</p>
                        <p className="text-lg font-semibold text-slate-900">{facultyDetails.phone}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Email address</p>
                        <p className="text-lg font-semibold text-slate-900">{facultyDetails.email}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Blood group</p>
                        <p className="text-lg font-semibold text-slate-900">{facultyDetails.bloodGroup}</p>
                    </div>
                </div>
            </div>

            <div className="space-y-8 pt-4">
                <div className="border-b border-slate-200 pb-2">
                    <h3 className="text-xl font-semibold text-slate-900">Institutional Details</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-y-8 gap-x-12">
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Faculty ID</p>
                        <p className="text-lg font-semibold text-slate-900 uppercase">{facultyDetails.id}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Designation</p>
                        <p className="text-lg font-semibold text-slate-900 uppercase">{facultyDetails.designation}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Department</p>
                        <p className="text-lg font-semibold text-slate-900 uppercase">{facultyDetails.department}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Cabin Location</p>
                        <p className="text-lg font-semibold text-slate-900 uppercase">{facultyDetails.cabin}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Joining Date</p>
                        <p className="text-lg font-semibold text-slate-900">{facultyDetails.joinDate}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Experience</p>
                        <p className="text-lg font-semibold text-slate-900">{facultyDetails.experience}</p>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                        <p className="text-[13px] text-slate-500 font-medium">Specialization</p>
                        <p className="text-lg font-semibold text-slate-900 uppercase italic tracking-tight">{facultyDetails.specialization}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const SettingsModule = () => (
        <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-6 duration-700 text-left bg-white p-4 sm:p-8 md:p-12 min-h-screen pt-10 rounded-[3rem] shadow-sm">
            <BackButton />

            <div className="space-y-2 border-b border-slate-200 pb-6">
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">System Settings</h1>
                <p className="text-slate-400 font-medium tracking-tight">Institutional and departmental node configurations.</p>
            </div>

            {/* College Details Section */}
            <div className="space-y-8 pt-4">
                <div className="flex items-center gap-4 border-b border-slate-200 pb-2">
                    <Building2 className="text-amber-500" size={24} />
                    <h3 className="text-xl font-semibold text-slate-900">College Details</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-y-8 gap-x-12">
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Institutional Name</p>
                        <p className="text-lg font-black text-slate-900 uppercase">{collegeDetails.name}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">College Code</p>
                        <p className="text-lg font-black text-slate-900 uppercase">{collegeDetails.code}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Location</p>
                        <p className="text-lg font-semibold text-slate-900">{collegeDetails.location}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Established</p>
                        <p className="text-lg font-semibold text-slate-900">{collegeDetails.established}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Affiliation</p>
                        <p className="text-lg font-semibold text-slate-900">{collegeDetails.affiliation}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Accreditation</p>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="text-emerald-500" size={16} />
                            <p className="text-lg font-black text-slate-900">{collegeDetails.accreditation}</p>
                        </div>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                        <p className="text-[13px] text-slate-500 font-medium">Official Portal</p>
                        <div className="flex items-center gap-2 text-indigo-600">
                            <Globe size={16} />
                            <p className="text-lg font-bold underline cursor-pointer">{collegeDetails.website}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Department Details Section */}
            <div className="space-y-8 pt-8">
                <div className="flex items-center gap-4 border-b border-slate-200 pb-2">
                    <Library className="text-indigo-500" size={24} />
                    <h3 className="text-xl font-semibold text-slate-900">Department Overview</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-y-8 gap-x-12">
                    <div className="space-y-1 md:col-span-2">
                        <p className="text-[13px] text-slate-500 font-medium">Department Name</p>
                        <p className="text-xl font-black text-slate-900 uppercase">{departmentDetails.name}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Head of Department</p>
                        <p className="text-lg font-bold text-slate-900">{departmentDetails.head}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Faculty Strength</p>
                        <div className="flex items-center gap-2">
                            <Users size={16} className="text-slate-400" />
                            <p className="text-lg font-bold text-slate-900">{departmentDetails.facultyCount} Members</p>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Research Verticals</p>
                        <p className="text-lg font-semibold text-slate-900">{departmentDetails.labs}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Block Location</p>
                        <p className="text-lg font-bold text-slate-900">{departmentDetails.block}</p>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                        <p className="text-[13px] text-slate-500 font-medium">Key Specializations</p>
                        <p className="text-lg font-semibold text-slate-900 italic">{departmentDetails.focus}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <DashboardLayout role="faculty" burgerMenuPosition="left" burgerMenuSize="lg">
            <div className="max-w-7xl mx-auto py-12 px-2 sm:px-8 pb-32">
                <style>
                    {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap');
                    .faculty-erp-font { font-family: 'Inter', sans-serif; }
                    .faculty-erp-font h1, .faculty-erp-font h2, .faculty-erp-font h3, .faculty-erp-font h4 { font-family: 'Poppins', sans-serif; }
                    `}
                </style>
                <div className="faculty-erp-font mt-0">
                    {/* Move hero section down for mobile */}
                    <div className="pt-8 sm:pt-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {activeTab === 'dashboard' && <Overview />}
                                {activeTab === 'attendance' && <AttendanceModule />}
                                {activeTab === 'marks' && <MarksModule />}
                                {activeTab === 'notices' && <AnnouncementsModule />}
                                {activeTab === 'profile' && <ProfileModule />}
                                {activeTab === 'settings' && <SettingsModule />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    {/* Bottom Navigation removed for DashboardLayout to handle mobile nav */}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FacultyDashboard;
