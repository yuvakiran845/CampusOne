import {
    Users,
    GraduationCap,
    ChevronRight,
    LayoutDashboard,
    Menu,
    X,
    Mail,
    Phone,
    MapPin,
    Instagram,
    Linkedin,
    Youtube,
    ClipboardCheck,
    LineChart,
    Bell,
    ArrowRight,
    Award,
    Cpu,
    Globe,
    Search,
    Zap,
    Target,
    CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import CollegeImageSlider from '../../components/CollegeImageSlider';

// --- Sub-Components ---

const Navbar = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', path: '#features' },
        { name: 'About', path: '#about' },
        { name: 'Contact', path: '#contact' }
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-4 md:px-8 py-4 md:py-6`}
        >
            <nav
                className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-[2.5rem] px-6 py-2 ${scrolled
                    ? 'bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]'
                    : 'bg-transparent'
                    }`}
            >
                {/* Logo Section */}
                <div
                    className="flex items-center gap-3 cursor-pointer group shrink-0"
                    onClick={() => navigate('/')}
                >
                    <div className="bg-orange-600 p-2 rounded-2xl text-white shadow-xl shadow-orange-600/20 group-hover:rotate-12 transition-all duration-500">
                        <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className={`text-xl font-black tracking-tight leading-none transition-colors duration-500 ${scrolled ? 'text-slate-950' : 'text-white'}`}>
                            CampusOne
                        </span>
                        <span className={`text-[8px] font-black uppercase tracking-[0.2em] mt-1 transition-colors duration-500 ${scrolled ? 'text-slate-400' : 'text-white/60'}`}>
                            University Intelligence
                        </span>
                    </div>
                </div>

                {/* Right Side Navigation Items */}
                <div className="hidden lg:flex items-center gap-6 ml-auto">
                    {/* Portal Buttons - Clean Text to Orange Box on Scroll */}
                    <button
                        onClick={() => navigate('/login')}
                        className={`group px-5 py-2.5 rounded-2xl text-[12px] font-black uppercase tracking-wider transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-2
                            ${scrolled
                                ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/40 border-none'
                                : 'text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
                            }`}
                    >
                        <Users size={16} className={`transition-transform duration-500 group-hover:rotate-12 ${scrolled ? 'text-white' : 'text-orange-500'}`} />
                        <span>Student Portal</span>
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className={`group px-5 py-2.5 rounded-2xl text-[12px] font-black uppercase tracking-wider transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-2
                            ${scrolled
                                ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/40 border-none'
                                : 'text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
                            }`}
                    >
                        <GraduationCap size={16} className={`transition-transform duration-500 group-hover:-rotate-12 ${scrolled ? 'text-white' : 'text-orange-500'}`} />
                        <span>Faculty Portal</span>
                    </button>

                    {/* Section Links */}
                    <div className="flex items-center gap-2 mx-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                className={`px-4 py-2 text-[13px] font-bold tracking-tight rounded-xl transition-all duration-300 relative group
                                    ${scrolled ? 'text-slate-600 hover:text-orange-600 hover:bg-slate-50' : 'text-white/80 hover:text-white'}`}
                            >
                                {link.name}
                                <span className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </a>
                        ))}
                    </div>

                    {/* Final Sign In Button - Ultra High Contrast */}
                    <button
                        onClick={() => navigate('/login')}
                        className={`ml-4 px-8 py-3 rounded-2xl text-[13px] font-black uppercase tracking-[0.1em] transition-all duration-500 shadow-2xl hover:scale-110 active:scale-95
                            ${scrolled
                                ? 'bg-orange-600 text-white'
                                : 'bg-white text-orange-600 border border-white hover:bg-orange-600 hover:text-white shadow-white/10'
                            }`}
                    >
                        Sign In
                    </button>
                </div>

                {/* Mobile Specific Logic */}
                <button
                    className={`p-2.5 rounded-2xl transition-all lg:hidden ml-4 ${scrolled || mobileMenuOpen ? 'text-slate-900 bg-slate-100' : 'text-white bg-white/10'}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay - Premium Expand */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="mt-4 max-w-7xl mx-auto"
                    >
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => navigate('/login')} className="p-6 bg-orange-600 rounded-3xl text-white font-black text-center shadow-xl shadow-orange-600/20">
                                    STUDENT
                                </button>
                                <button onClick={() => navigate('/login')} className="p-6 bg-slate-950 rounded-3xl text-white font-black text-center shadow-xl">
                                    FACULTY
                                </button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <a key={link.name} href={link.path} onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 bg-slate-50 rounded-2xl text-slate-905 font-bold flex justify-between items-center">
                                        {link.name}
                                        <ChevronRight size={18} className="text-slate-400" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

const FeatureCard = ({ title, desc, icon: Icon, action, path }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
        >
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                <Icon size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">{title}</h3>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8">{desc}</p>
            <button
                onClick={() => navigate(path)}
                className="w-full md:w-auto px-6 py-3 bg-slate-50 text-slate-900 rounded-xl font-bold text-sm md:text-base group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px]"
            >
                {action}
                <ArrowRight size={18} />
            </button>
        </motion.div>
    );
};

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen font-['Inter',sans-serif] bg-white overflow-x-hidden selection:bg-orange-100 selection:text-orange-900 scroll-smooth">
            <Navbar />

            {/* Hero Section - Mobile First */}
            <section className="relative min-h-[100dvh] flex flex-col pt-32 pb-20 px-5 md:px-8 bg-slate-900 overflow-hidden">
                {/* Improved Background logic for mobile - Increased visibility and contrast */}
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                    className="absolute inset-0 z-0 bg-cover bg-center brightness-[0.7] contrast-[1.2] saturate-[1.1]"
                    style={{ backgroundImage: 'url(/svce_chatgpt.png)' }}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/80" />

                <div className="relative z-20 max-w-7xl mx-auto w-full h-full flex flex-col justify-center items-center lg:items-end text-center lg:text-right pt-[20px] lg:translate-x-[40px]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Active Academic Session 2026</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] mb-6 font-['Poppins',sans-serif]"
                    >
                        <span className="text-white">Advanced </span>
                        <motion.span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-100 to-orange-400 bg-[length:200%_auto] inline-block"
                            animate={{ backgroundPosition: ['200% center', '-200% center'] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        >
                            Campus
                        </motion.span>
                        <br />
                        <motion.span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-100 to-orange-400 bg-[length:200%_auto] inline-block"
                            animate={{ backgroundPosition: ['-200% center', '200% center'] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        >
                            Management
                        </motion.span>
                        <span className="text-white"> System.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm md:text-lg text-white/90 max-w-2xl mb-10 leading-relaxed font-semibold drop-shadow-sm"
                    >
                        Reliable, secure, and lightning-fast. The unified operating system for <span className="text-orange-500 font-black px-1.5 py-0.5 bg-orange-500/10 rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.3)] border border-orange-500/20">SVCE</span> students and faculty members.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto lg:justify-end"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/login')}
                            className="group relative px-8 py-3.5 bg-orange-600 text-white rounded-[2rem] font-black text-base shadow-2xl shadow-orange-600/30 transition-all overflow-hidden"
                        >
                            <span className="relative z-10">Launch Student Portal</span>
                            <motion.div
                                className="absolute inset-x-0 top-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-30deg]"
                                animate={{ left: ['-100%', '200%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative px-8 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-[2rem] font-black text-base transition-all overflow-hidden shadow-2xl"
                        >
                            <span className="relative z-10">Explore Features</span>
                            <motion.div
                                className="absolute inset-x-0 top-0 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-30deg]"
                                whileHover={{ left: ['-100%', '200%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Quick Stats Banner - Positioned below Hero */}
            <section className="relative z-30 pt-12 md:pt-16 px-5 md:px-8 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { value: "10k+", label: "STUDENTS", color: "text-orange-600", delay: 0.1 },
                            { value: "500+", label: "FACULTY", color: "text-indigo-600", delay: 0.2 },
                            { value: "150+", label: "COURSES", color: "text-emerald-600", delay: 0.3 },
                            { value: "90%", label: "PLACEMENT", color: "text-rose-600", delay: 0.4 }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: stat.delay, duration: 0.5 }}
                                className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center justify-center text-center group hover:scale-105 transition-all duration-500"
                            >
                                <span className={`text-3xl md:text-5xl font-black mb-2 tracking-tighter ${stat.color}`}>
                                    {stat.value}
                                </span>
                                <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                                    {stat.label}
                                </span>
                                <div className="mt-4 w-8 h-1 bg-slate-100 rounded-full group-hover:w-16 group-hover:bg-orange-600 transition-all duration-500" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Cards Grid */}
            <section id="features" className="py-24 px-5 md:px-8 bg-slate-50">
                <div className="max-w-7xl mx-auto text-center md:text-left">
                    <div className="mb-16">
                        <span className="text-orange-600 font-bold text-sm uppercase tracking-widest mb-4 block">Unified Infrastructure</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-['Poppins',sans-serif]">Core Functional Modules</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard
                            title="Live Attendance"
                            desc="Real-time tracking of academic presence with automated low-attendance warnings."
                            icon={ClipboardCheck}
                            action="Check Attendance"
                            path="/login"
                        />
                        <FeatureCard
                            title="Performance"
                            desc="Detailed academic transcripts, internal marks analysis, and semester CGPA tracking."
                            icon={LineChart}
                            action="View Results"
                            path="/login"
                        />
                        <FeatureCard
                            title="Faculty Portal"
                            desc="Enterprise-grade tools for classroom management, grading, and scheduling."
                            icon={Users}
                            action="Faculty Login"
                            path="/login"
                        />
                        <FeatureCard
                            title="Smart Notifications"
                            desc="Direct institutional updates regarding exams, events, and administrative alerts."
                            icon={Bell}
                            action="Access Alerts"
                            path="/login"
                        />
                    </div>
                </div>
            </section>

            {/* About Section - Mobile Optimized */}
            <section id="about" className="py-24 px-5 md:px-8 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8 text-center md:text-left"
                        >
                            <div>
                                <span className="bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">About College</span>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tighter font-['Poppins',sans-serif]">
                                    Shaping the <br />
                                    <span className="text-orange-600 underline underline-offset-8 decoration-slate-200">Innovators</span> of SVCE
                                </h2>
                            </div>
                            <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium">
                                Founded in 2007, Sri Venkateswara College of Engineering (SVCE) Tirupati has rapidly emerged as a premier destination for technical education in Andhra Pradesh. We provide a holistic ecosystem that blends rigorous academic curriculum with real-world industry applications.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                                {[
                                    { title: "Academic Excellence", desc: "NAAC A+ Accrediated and NBA certified programs.", icon: Award },
                                    { title: "Industry 4.0 Labs", desc: "State-of-the-art facilities for AI, Robotics, and IoT.", icon: Cpu },
                                    { title: "Global Placements", desc: "Elite track record with over 500+ multinational recruiters.", icon: Globe },
                                    { title: "Research Hub", desc: "Dedicated innovation cell with 50+ patents filed yearly.", icon: Search },
                                    { title: "Smart Campus", desc: "Fully eco-friendly campus with 24/7 high-speed digital connectivity.", icon: Zap },
                                    { title: "Skill Development", desc: "Integrated APSSDC labs and professional certification courses.", icon: Target }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 group">
                                        <div className="mt-1 shrink-0 w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                                            <item.icon size={18} />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-extrabold text-slate-900 text-sm md:text-base tracking-tight">{item.title}</h4>
                                                <CheckCircle2 size={12} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => window.open('https://svce.edu.in/', '_blank')}
                                className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all min-h-[56px] shadow-lg"
                            >
                                Official Institutional Site
                            </button>
                        </motion.div>

                        <div className="w-full relative px-2 md:px-0">
                            <CollegeImageSlider />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section - Clean ERP Style */}
            <section id="contact" className="py-24 px-5 md:px-8 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-orange-600 font-bold text-sm uppercase tracking-widest mb-4 block">Institutional Helpdesk</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-['Poppins',sans-serif]">Contact Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Admissions Office", detail: "+91-8886644969", icon: Phone },
                            { title: "Official Support", detail: "info@svce.edu.in", icon: Mail },
                            { title: "Campus Location", detail: "Tirupati, Andhra Pradesh", icon: MapPin }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-6">
                                    <item.icon size={24} />
                                </div>
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{item.title}</h4>
                                <p className="text-lg font-extrabold text-slate-900 tracking-tight">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Professional Footer */}
            <footer className="bg-slate-950 text-white pt-20 pb-10 px-5 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-orange-600 p-2 rounded-xl">
                                    <GraduationCap size={24} />
                                </div>
                                <span className="text-2xl font-extrabold tracking-tight">CampusOne</span>
                            </div>
                            <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
                                The official institutional operating system for engineering excellence and streamlined academic administration.
                            </p>
                            <div className="flex gap-4">
                                {[
                                    { icon: Instagram, url: "https://www.instagram.com/svcetirupati/" },
                                    { icon: Linkedin, url: "https://www.linkedin.com/school/sri-venkateswara-college-of-engineering-tirupati/" },
                                    { icon: Youtube, url: "https://www.youtube.com/@SVCETirupati" }
                                ].map((soc, i) => (
                                    <a key={i} href={soc.url} target="_blank" className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-orange-600 transition-colors">
                                        <soc.icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Quick Links</h4>
                            <ul className="space-y-4 text-slate-300 font-semibold">
                                <li><a href="#about" className="hover:text-orange-500">Institutional Profile</a></li>
                                <li><a href="#features" className="hover:text-orange-500">System Modules</a></li>
                                <li><a href="/login" className="hover:text-orange-500">Student Access</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Legal</h4>
                            <ul className="space-y-4 text-slate-300 font-semibold">
                                <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-orange-500">Institutional Terms</a></li>
                                <li><a href="#" className="hover:text-orange-500">IT Security</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                        <p>© 2026 SVCE Tirupati. Engineered by CampusOne Team.</p>
                        <p>Version 2.4.0 (Stable)</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
