import { useState, useContext, useEffect } from 'react';
import {
    ChevronRight,
    Search,
    Bell,
    TrendingUp,
    LayoutDashboard,
    ClipboardCheck,
    Award,
    Calendar,
    User as UserIcon,
    ChevronDown,
    GraduationCap,
    CheckCircle2,
    BarChart3,
    Clock,
    Layers,
    MapPin,
    ArrowLeft,
    ClipboardList,
    BookOpen
} from 'lucide-react';
import AuthContext from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const StudentDashboard = ({ activeTab: initialTabProp = 'dashboard' }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(initialTabProp);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        setActiveTab(initialTabProp);
    }, [initialTabProp]);

    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    // Update time every minute
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    if (loading) return null;

    const studentData = {
        name: user?.name || "Yuva Kiran",
        rollNumber: "23BFA05312",
        admissionNumber: "8792",
        branch: "Computer Science & Engineering",
        section: "E",
        year: "III",
        semester: "6",
        cgpa: 8.45,
        totalAttendance: 80.28,
        academicYear: "2025-26",
        date: currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase(),
        room: "HL-305",
        email: "yuvak2484@gmail.com",
        phone: "7661009068",
        fatherName: "PALLA THULASI RAM",
        motherName: "PALLA ANURADHA",
        parentMobile: "8500070842",
        bloodGroup: "O+",
        batch: "2023 - 2024",
        gender: "MALE",
        dob: "May 15, 2006",
        degree: "B.TECH",
        programCode: "CSE"
    };

    const attendanceStats = [
        { code: 'IQTA', name: 'INTRODUCTION TO QUANTUM TECHNOLOGY AND APPLICATIONS', percentage: '66.67%', val: 66.67, color: 'bg-rose-500' },
        { code: 'CC', name: 'CLOUD COMPUTING', percentage: '66.67%', val: 66.67, color: 'bg-orange-500' },
        { code: 'CNS', name: 'CRYPTOGRAPHY AND NETWORK SECURITY', percentage: '100.00%', val: 100, color: 'bg-cyan-400' },
        { code: 'ML', name: 'MACHINE LEARNING', percentage: '87.50%', val: 87.50, color: 'bg-teal-500' },
        { code: 'NLP', name: 'NATURAL LANGUAGE PROCESSING', percentage: '0%', val: 0, color: 'bg-cyan-400' },
        { code: 'DEVOPS', name: 'DEVOPS', percentage: '57.14%', val: 57.14, color: 'bg-orange-400' },
        { code: 'TPW & IPR', name: 'TECHNICAL PAPER WRITING AND IPR', percentage: '100.00%', val: 100, color: 'bg-cyan-500' },
        { code: 'SS', name: 'SOFT SKILLS', percentage: '92.00%', val: 92.00, color: 'bg-pink-500' },
        { code: 'CNS LAB', name: 'CNS LAB', percentage: '45.00%', val: 45.00, color: 'bg-rose-500' },
    ];

    const performanceData = [
        { sem: 'Sem 1', gpa: 8.2 },
        { sem: 'Sem 2', gpa: 8.5 },
        { sem: 'Sem 3', gpa: 8.1 },
        { sem: 'Sem 4', gpa: 8.6 },
        { sem: 'Sem 5', gpa: 8.4 },
        { sem: 'Sem 6', gpa: 8.8 },
    ];

    const timetable = {
        periods: [
            { id: 1, time: '09:15 - 10:15' },
            { id: 2, time: '10:15 - 11:15' },
            { id: 3, time: '11:15 - 12:15' },
            { id: 'L', time: '12:15 - 01:15', label: 'LUNCH' },
            { id: 4, time: '01:15 - 02:15' },
            { id: 5, time: '02:15 - 03:15' },
            { id: 6, time: '03:15 - 04:15' },
        ],
        days: [
            { day: 'Mon', slots: ['DM/SDS/OT', 'CNS', 'NLP', 'LUNCH', 'ML', 'IPR', 'STM3/DEV3,4'] },
            { day: 'Tue', slots: ['ML LAB', 'ML LAB', 'IQT', 'LUNCH', 'CNS', 'STM3/DEV3,4', 'CC'] },
            { day: 'Wed', slots: ['IQT', 'CC', 'DM/SDS/OT', 'LUNCH', 'SS', 'SS LAB', 'SS LAB'] },
            { day: 'Thu', slots: ['STM3/DEV3,4', 'CC', 'IQT', 'LUNCH', 'NLP', 'CNS', 'IQT'] },
            { day: 'Fri', slots: ['CNS LAB', 'CNS LAB', 'CNS', 'LUNCH', 'IQT', 'CC', 'ML'] },
            { day: 'Sat', slots: ['DM/SDS/OT', 'STM3/DEV3,4', 'IPR', 'LUNCH', 'SAC ACTIVITIES', 'SAC ACTIVITIES', 'SAC ACTIVITIES'] },
        ]
    };

    const currentDayIdx = currentTime.getDay();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDayStr = dayNames[currentDayIdx];
    const activeDay = currentDayStr;
    const currentDayData = timetable.days.find(d => d.day === activeDay);
    const todaySchedule = currentDayData?.slots || [];

    const h = currentTime.getHours();
    const m = currentTime.getMinutes();
    const totalMinutes = h * 60 + m;
    const isScheduleOver = totalMinutes >= (16 * 60 + 15); // After 4:15 PM

    const getCurrentStatus = () => {
        if (currentDayStr === 'Sun') return { text: 'Weekend Break 🍻', isBreak: true };
        if (isScheduleOver) return { text: 'Schedule Ends 🚶🌅', isBreak: true };
        if (totalMinutes >= (12 * 60 + 15) && totalMinutes < (13 * 60 + 15)) return { text: 'Lunch Break 🍱', isBreak: true };
        return { text: 'Day Active ⚡', isBreak: false };
    };

    const status = getCurrentStatus();

    const BackButton = ({ title }) => (
        <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-4 hover:opacity-70 transition-all text-slate-900 mb-8"
        >
            <ArrowLeft size={24} />
            <h2 className="text-2xl font-bold">{title}</h2>
        </button>
    );

    const MainOverview = () => (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="space-y-4 text-left">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 tracking-widest uppercase">
                        <span>GLOBAL OPS</span>
                        <span className="text-slate-200">/</span>
                        <span className="text-slate-900">STUDENT</span>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                            ACADEMIC YEAR {studentData.academicYear} • {studentData.date}
                        </p>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            Welcome back, <span className="text-slate-900">{studentData.name}</span>
                        </h1>
                        <p className="text-base font-bold text-slate-400">
                            Track your daily schedule and academic performance in real-time.
                        </p>
                    </div>
                </div>

                {/* CGPA Card badge */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-950 rounded-[2.5rem] p-8 text-white shadow-2xl flex items-center gap-8 min-w-[300px] relative overflow-hidden cursor-pointer group"
                    onClick={() => setActiveTab('marks')}
                >
                    <div className="space-y-1 text-left relative z-10">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Cumulative Grade</p>
                        <div className="flex items-end gap-1">
                            <span className="text-5xl font-black tabular-nums">{studentData.cgpa}</span>
                            <span className="text-slate-500 text-xs font-bold mb-1.5">/ 10.00 CGPA</span>
                        </div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-2xl relative z-10 group-hover:bg-indigo-600 transition-colors">
                        <TrendingUp size={28} className="text-white" />
                    </div>
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #4f46e5 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                </motion.div>
            </div>

            {/* Attendance & Analytics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <CheckCircle2 size={18} />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">Attendance Overview</h3>
                            </div>
                            <button onClick={() => setActiveTab('attendance')} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline transition-all">View Detailed Chart</button>
                        </div>

                        {/* Attendance Chart Bars */}
                        <div className="h-64 flex items-end justify-between gap-4 px-4 overflow-x-auto pb-4">
                            {attendanceStats.slice(0, 7).map((stat, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-4 group min-w-[40px]">
                                    <div className="w-full relative flex items-end justify-center h-48">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${stat.val}%` }}
                                            transition={{ duration: 1, delay: i * 0.1, ease: "circOut" }}
                                            className={`w-full max-w-[48px] ${stat.color} rounded-2xl shadow-lg group-hover:brightness-110 transition-all cursor-pointer`}
                                        />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{stat.code}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-emerald-50/30 rounded-[2rem] p-6 flex items-center justify-between border border-emerald-50">
                            <div className="flex items-center gap-3 text-left">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Total Attendance Ratio</span>
                            </div>
                            <span className="text-2xl font-black text-emerald-600 tabular-nums">{studentData.totalAttendance}%</span>
                        </div>
                    </div>
                </div>

                {/* Academic Mini-Report */}
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-10 flex flex-col h-full">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <BarChart3 size={20} className="text-indigo-600" />
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">Academic Progress</h3>
                            </div>
                            <button onClick={() => setActiveTab('marks')} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline transition-all">Full Report</button>
                        </div>

                        <div className="space-y-8 flex-1">
                            {attendanceStats.slice(0, 3).map((sub, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-black text-slate-900 tracking-tight text-left leading-tight">{sub.name}</span>
                                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Avg {sub.percentage}</span>
                                    </div>
                                    <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden flex gap-0.5">
                                        <motion.div initial={{ width: 0 }} animate={{ width: '40%' }} className="h-full bg-indigo-500 rounded-l-full" />
                                        <motion.div initial={{ width: 0 }} animate={{ width: '35%' }} className="h-full bg-indigo-400" />
                                        <motion.div initial={{ width: 0 }} animate={{ width: '15%' }} className="h-full bg-indigo-300 rounded-r-full" />
                                    </div>
                                    <div className="flex justify-between text-[8px] font-black text-slate-300 uppercase tracking-widest">
                                        <span>INT: 50/60</span>
                                        <span>SEM: 58/70</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={() => setActiveTab('marks')} className="w-full py-5 bg-slate-50 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-950 hover:text-white transition-all shadow-sm">
                            Analyze Detailed Performance
                        </button>
                    </div>
                </div>
            </div>

            {/* Daily Schedule Dynamic Section */}
            <div className="space-y-8">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                        <Calendar size={20} className="text-indigo-600" />
                        <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Today's Schedule <span className="text-slate-300 ml-2">({activeDay})</span></h3>
                    </div>
                    <button onClick={() => setActiveTab('timetable')} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View Full Timetable</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentDayStr === 'Sun' ? (
                        <div className="md:col-span-3 bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                                <Calendar size={32} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-2xl font-black text-slate-900 uppercase italic">Recharging for the Week</h4>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No classes scheduled for today (Sunday)</p>
                            </div>
                        </div>
                    ) : (
                        todaySchedule.slice(0, 3).map((slot, i) => (
                            <div key={i} className={`bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group text-left cursor-pointer ${isScheduleOver ? 'opacity-50 grayscale' : ''}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`p-3 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors`}>
                                        <Clock size={20} className="text-slate-400 group-hover:text-indigo-600" />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{timetable.periods[i].time}</span>
                                </div>
                                <h4 className={`text-2xl font-black text-slate-900 tracking-tightest group-hover:text-indigo-600 transition-colors uppercase italic ${slot === 'LUNCH' ? 'text-yellow-500' : ''}`}>{slot}</h4>
                                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-1">Venue: {studentData.room}</p>
                            </div>
                        ))
                    )}
                    <div className={`rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center space-y-2 group cursor-pointer border-b-4 shadow-2xl overflow-hidden relative transition-all ${status.isBreak ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-950 border-indigo-600'}`} onClick={() => setActiveTab('timetable')}>
                        <div className="space-y-1 relative z-10">
                            <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${status.isBreak ? 'text-indigo-200' : 'text-indigo-500'}`}>Node Status</span>
                            <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">{status.text}</h4>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    </div>
                </div>
            </div>
        </div>
    );

    const ProfileView = () => (
        <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-4 duration-700 text-left bg-white p-8 md:p-12 min-h-screen">
            <BackButton title="Profile Details" />

            {/* Personal Details Section */}
            <div className="space-y-8">
                <div className="border-b border-slate-200 pb-2">
                    <h3 className="text-xl font-semibold text-slate-900">Personal Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Gender</p>
                        <p className="text-lg font-semibold text-slate-900 uppercase">{studentData.gender}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Date of birth</p>
                        <p className="text-lg font-semibold text-slate-900">{studentData.dob}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Mobile</p>
                        <p className="text-lg font-semibold text-slate-900">{studentData.phone}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">E-Mail</p>
                        <p className="text-lg font-semibold text-slate-900">{studentData.email}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Father's Name</p>
                        <p className="text-lg font-semibold text-slate-900 uppercase">{studentData.fatherName}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Mother's Name</p>
                        <p className="text-lg font-semibold text-slate-900 uppercase">{studentData.motherName}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Parent's mobile</p>
                        <p className="text-lg font-semibold text-slate-900">{studentData.parentMobile}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Blood group</p>
                        <p className="text-lg font-semibold text-slate-900">{studentData.bloodGroup}</p>
                    </div>
                </div>
            </div>

            {/* Academic Details Section */}
            <div className="space-y-8 pt-4">
                <div className="border-b border-slate-200 pb-2">
                    <h3 className="text-xl font-semibold text-slate-900">Academic Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Roll number</p>
                        <p className="text-lg font-semibold text-slate-900 uppercase">{studentData.rollNumber}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Admission Number</p>
                        <p className="text-lg font-semibold text-slate-900">{studentData.admissionNumber}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Batch</p>
                        <p className="text-lg font-semibold text-slate-900">{studentData.batch}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Degree</p>
                        <p className="text-lg font-semibold text-slate-900">{studentData.degree}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Program code</p>
                        <p className="text-lg font-semibold text-slate-900 uppercase">{studentData.programCode}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Semester Number</p>
                        <p className="text-lg font-semibold text-slate-900">{studentData.semester}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[13px] text-slate-500 font-medium">Section</p>
                        <p className="text-lg font-semibold text-slate-900 uppercase">{studentData.section}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const AttendanceModule = () => {
        const chartLabels = ['IQTA', 'CC', 'CNS', 'ML', 'NLP', 'DEVOPS', 'TPW & IPR', 'SS', 'CNS LAB'];
        const chartValues = [150, 100, 50, 0];

        return (
            <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-4 duration-700 text-left bg-white p-8 md:p-12 min-h-screen -mt-[60px]">
                <BackButton title="Overall Attendance" />

                {/* Bar Chart Container */}
                <div className="relative h-80 w-full flex items-end pt-10">
                    {/* Y-Axis Labels */}
                    <div className="absolute left-0 h-full flex flex-col justify-between py-2 text-slate-500 text-xs font-semibold tabular-nums">
                        {chartValues.map(val => <span key={val}>{val}</span>)}
                    </div>

                    {/* Bars Grid */}
                    <div className="flex-1 ml-10 flex items-end justify-between h-full border-l border-slate-100 pl-4">
                        {attendanceStats.map((stat, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center group gap-4 px-1">
                                <div className="w-full relative h-[250px] flex items-end justify-center">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(stat.val / 150) * 100}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className={`w-full max-w-[24px] ${stat.color} rounded-t-sm shadow-sm opacity-90 group-hover:opacity-100 transition-opacity`}
                                    />
                                </div>
                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter whitespace-nowrap">{stat.code}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Total Stats Banner */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-8 text-center shadow-sm">
                    <p className="text-2xl font-semibold text-slate-900">
                        Total Attendance: <span className="text-slate-900 font-bold">{studentData.totalAttendance}%</span>
                    </p>
                </div>

                {/* Subject List */}
                <div className="space-y-8 pt-4">
                    {attendanceStats.slice(0, 7).map((stat, i) => (
                        <div key={i} className="flex items-start justify-between gap-6 group">
                            <div className="flex items-start gap-4 flex-1">
                                <div className={`w-4 h-4 rounded-full mt-1 shrink-0 ${stat.color}`} />
                                <h4 className="text-lg font-bold text-slate-900 leading-tight tracking-tight uppercase max-w-lg">
                                    {stat.name}
                                </h4>
                            </div>
                            <span className="text-2xl font-bold text-slate-900 tabular-nums">
                                {stat.percentage}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const PerformanceModule = () => (
        <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700 text-left">
            <BackButton title="Performance Pulse" />
            <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm space-y-12">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tightest uppercase italic">Performance Pulse</h2>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] italic">Historical GPA Sync • Cumulative {studentData.cgpa}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {performanceData.map((item, i) => {
                        const isCurrent = item.sem === 'Sem 6';
                        return (
                            <div key={i} className={`p-10 rounded-[3rem] shadow-xl relative overflow-hidden group border-b-4 transition-all ${isCurrent ? 'bg-orange-600 border-orange-400 scale-105 z-10' : 'bg-slate-950 border-indigo-600 text-white'}`}>
                                <div className="relative z-10 space-y-8">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isCurrent ? 'text-orange-200' : 'text-slate-500'}`}>{item.sem}</span>
                                            {isCurrent && <span className="block text-[8px] font-black bg-white/20 text-white px-2 py-0.5 rounded-full w-fit uppercase tracking-widest mt-1">Active Cycle</span>}
                                        </div>
                                        <TrendingUp size={20} className={isCurrent ? 'text-white' : 'text-indigo-500'} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className={`text-5xl font-black tracking-tightest leading-none ${isCurrent ? 'text-white' : 'text-white'}`}>{item.gpa}</p>
                                        <p className={`text-[10px] font-black uppercase tracking-widest ${isCurrent ? 'text-orange-100' : 'text-slate-600'}`}>
                                            {isCurrent ? 'Target GPA Sync' : 'Points Secured'}
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                                    <Award size={120} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    const TimetableModule = () => {
        return (
            <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700 text-left">
                <BackButton title="Institutional Timetable" />
                <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm space-y-12">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-4xl font-black text-slate-900 tracking-tightest uppercase italic">Institutional Timetable</h2>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] italic">{timetable.periods.length} Periods Daily • Venue Room {studentData.room}</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto pb-8">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr>
                                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] border-b border-slate-50">Day \ Period</th>
                                    {timetable.periods.map(p => (
                                        <th key={p.id} className="p-6 text-center border-b border-slate-50">
                                            <div className="space-y-1">
                                                <p className="text-sm font-black text-slate-900 tracking-tighter">P{p.id}</p>
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{p.time}</p>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {timetable.days.map((dayRow, i) => (
                                    <tr key={i} className={`group transition-colors ${dayRow.day === activeDay ? 'bg-orange-50/30' : 'hover:bg-slate-50/50'}`}>
                                        <td className="p-6 border-b border-slate-50">
                                            <span className={`text-base font-black uppercase italic tracking-tighter ${dayRow.day === activeDay ? 'text-orange-600' : 'text-slate-900'}`}>{dayRow.day}</span>
                                            {dayRow.day === activeDay && (
                                                <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-600 rounded text-[8px] font-black uppercase">Today</span>
                                            )}
                                        </td>
                                        {dayRow.slots.map((slot, j) => (
                                            <td key={j} className="p-4 border-b border-slate-50 text-center">
                                                <div className={`p-4 rounded-2xl border transition-all h-full flex items-center justify-center min-h-[60px] ${slot === 'LUNCH' ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-slate-100 shadow-sm group-hover:border-indigo-200'}`}>
                                                    <p className={`text-[11px] font-black uppercase tracking-tightest ${slot === 'LUNCH' ? 'text-yellow-600' : 'text-slate-900'}`}>{slot}</p>
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <DashboardLayout role="student">
            <div className="max-w-7xl mx-auto pt-2 px-8 pb-32 -mt-3">
                <style>
                    {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap');
                    .premium-erp-font { font-family: 'Inter', sans-serif; }
                    .premium-erp-font h1, .premium-erp-font h2, .premium-erp-font h3, .premium-erp-font h4, .premium-erp-font h5 { font-family: 'Poppins', sans-serif; }
                    `}
                </style>
                <div className="premium-erp-font">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'dashboard' && <MainOverview />}
                            {activeTab === 'attendance' && <AttendanceModule />}
                            {activeTab === 'marks' && <PerformanceModule />}
                            {activeTab === 'timetable' && <TimetableModule />}
                            {activeTab === 'profile' && <ProfileView />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default StudentDashboard;
