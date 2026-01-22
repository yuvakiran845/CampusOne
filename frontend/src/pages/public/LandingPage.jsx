import {
    Users,
    BookOpen,
    GraduationCap,
    ShieldCheck,
    ChevronRight,
    Play,
    LayoutDashboard,
    CalendarDays,
    Menu,
    X,
    Mail,
    Phone,
    MapPin,
    Send,
    CheckCircle2,
    Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`sticky top-0 w-full z-50 bg-white shadow-lg transition-all duration-300 py-3`} // Always solid background, shadow, sticky
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between py-2">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2.5 rounded-xl shadow-lg">
                        <GraduationCap className="text-white w-7 h-7" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-slate-900">CampusOne</span>
                </motion.div>

                <div className="hidden md:flex items-center space-x-10">
                    {['Features', 'About', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="relative font-medium text-lg tracking-wide text-slate-700 group transition-colors duration-200"
                        >
                            {item}
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-hover:w-full"></span>
                            <span className="block h-0.5 bg-gradient-to-r from-orange-500 to-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </a>
                    ))}
                </div>

                <div className="flex items-center space-x-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/login')}
                        className="font-semibold text-lg text-slate-700 hover:text-orange-600 transition-colors duration-200"
                    >
                        Sign In
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.07, boxShadow: "0 10px 30px -5px rgba(249, 115, 22, 0.5)" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/login')}
                        className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-bold shadow-lg flex items-center tracking-wide transition-all duration-300 ease-in-out"
                    >
                        Get Started
                        <ChevronRight className="w-5 h-5 ml-1" />
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    );
};

const FeatureCard = ({ feature, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -10 }}
        className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-500`} />

        <div className={`w-14 h-14 ${feature.bg} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
            <feature.icon className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
            {feature.title}
        </h3>
        <p className="text-slate-500 leading-relaxed mb-6 group-hover:text-slate-600">
            {feature.desc}
        </p>

        <div className="flex items-center text-sm font-bold text-orange-600 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Learn More <ArrowRight className="w-4 h-4 ml-2" />
        </div>
    </motion.div>
);

const ArrowRight = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m0-4H3" />
    </svg>
);

const StatItem = ({ stat, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="relative bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-xl text-center group"
    >
        <div className={`w-16 h-16 mx-auto ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition-transform`}>
            <stat.icon className="w-8 h-8" />
        </div>
        <h3 className="text-4xl font-extrabold text-slate-900 mb-1 tracking-tight">{stat.value}</h3>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
    </motion.div>
);

const AboutSection = () => (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <div className="mb-6">
                        <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider inline-block mb-4">
                            About CampusOne
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
                            Shaping the Future of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                                Education & Innovation
                            </span>
                        </h2>
                        <p className="text-lg text-slate-500 mb-6 leading-relaxed">
                            Founded with a vision to revolutionize learning, CampusOne has grown into a premier institution fostering excellence, creativity, and leadership. We bridge the gap between traditional academics and modern industry demands.
                        </p>
                        <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                            Our campus is more than just classrooms; it's a vibrant ecosystem where students explore, create, and innovate with state-of-the-art facilities and world-class mentorship.
                        </p>

                        <div className="space-y-4 mb-8">
                            {[
                                "Industry-Aligned Curriculum",
                                "World-Class Research Facilities",
                                "Global University Partnerships",
                                "100% Placement Assistance"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center space-x-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                    <span className="text-slate-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary px-8 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center hover:bg-slate-800 transition-colors shadow-xl"
                        >
                            Read Our Story <ChevronRight className="w-4 h-4 ml-2" />
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    {/* Abstract Composition replacing the image for now to keep it premium without relying on external assets likely to fail */}
                    <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                        <div className="absolute inset-0">
                            <img
                                src="/about_college.jpg"
                                alt="Campus Life"
                                className="w-full h-full object-cover brightness-90 contrast-110 saturate-120 hover:scale-110 transition-transform duration-700"
                                style={{ filter: 'brightness(0.90) contrast(1.15) saturate(1.2)' }}
                            />
                        </div>
                        {/* Overlay Card */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="bg-orange-100 p-3 rounded-full">
                                    <Users className="w-8 h-8 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-slate-900">25+</p>
                                    <p className="text-xs font-semibold uppercase text-slate-500">Years of Excellence</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-orange-200 rounded-full blur-3xl opacity-50" />
                    <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-50" />
                </motion.div>
            </div>
        </div>
    </section>
);

const ContactSection = () => (
    <section id="contact" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider inline-block mb-4">
                    Get in Touch
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                    We'd Love to Hear from You
                </h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                    Have questions about admissions, campus life, or partnerships? Reach out to our team.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                {/* Contact Info Sidebar */}
                <div className="lg:col-span-2 bg-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                        <p className="text-slate-400 mb-8">
                            Fill up the form and our Team will get back to you within 24 hours.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <Phone className="w-6 h-6 text-orange-500 mt-1" />
                                <div>
                                    <p className="text-sm text-slate-400 font-medium">Call Us</p>
                                    <p className="text-lg font-semibold">+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <Mail className="w-6 h-6 text-orange-500 mt-1" />
                                <div>
                                    <p className="text-sm text-slate-400 font-medium">Email Us</p>
                                    <p className="text-lg font-semibold">admissions@campusone.edu</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <MapPin className="w-6 h-6 text-orange-500 mt-1" />
                                <div>
                                    <p className="text-sm text-slate-400 font-medium">Visit Us</p>
                                    <p className="text-lg font-semibold">
                                        CampusOne University,<br />
                                        Knowledge Park III, Tech City
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="relative z-10 mt-12">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer backdrop-blur-sm">
                                    <Globe className="w-5 h-5 text-white" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-3 p-10">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">First Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Last Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" placeholder="john@example.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Subject</label>
                            <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-600">
                                <option>Admissions Inquiry</option>
                                <option>Campus Visit Support</option>
                                <option>Course Details</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Message</label>
                            <textarea rows="4" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 flex items-center justify-center space-x-2"
                        >
                            <span>Send Message</span>
                            <Send className="w-5 h-5" />
                        </motion.button>
                    </form>
                </div>
            </div>
        </div>
    </section>
);

const LandingPage = () => {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    return (
        <div className="min-h-screen font-sans relative">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Premium Hero Background */}
                <div className="absolute inset-0 w-full h-full z-0" style={{
                    backgroundImage: 'url(/hero_bg.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }} />
                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 z-10" style={{
                    background: 'linear-gradient(135deg, rgba(30,41,59,0.65) 0%, rgba(30,41,59,0.55) 60%, rgba(249,115,22,0.25) 100%)'
                }} />

                <motion.div
                    style={{ opacity, scale }}
                    className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 pb-32 flex flex-col items-center justify-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-2xl animate-fade-in-bottom">
                            SV College of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400 bg-300% animate-gradient">
                                Engineering
                            </span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-white/80 font-serif italic text-2xl mb-8 tracking-widest drop-shadow-lg animate-fade-in-bottom"
                        >
                            — SINCE 1981 —
                        </motion.p>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="inline-block group cursor-default"
                        >
                            <p className="text-3xl md:text-5xl font-serif italic text-white tracking-wide drop-shadow-xl">
                                "Education for a better <span className="text-orange-300 font-semibold group-hover:text-orange-200 transition-colors">society</span>"
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Floating Stats Pill - Bottom of Hero */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute bottom-12 left-0 right-0 z-20 px-4"
                >
                    <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-xl rounded-full shadow-2xl py-5 px-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-slate-800 border border-white/50">
                        <div className="flex flex-col items-center group cursor-pointer w-full md:w-auto">
                            <h3 className="text-3xl font-black text-slate-900 group-hover:text-orange-600 transition-colors">15,000+</h3>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Students</p>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-slate-200"></div>
                        <div className="flex flex-col items-center group cursor-pointer w-full md:w-auto">
                            <h3 className="text-3xl font-black text-slate-900 group-hover:text-orange-600 transition-colors">850+</h3>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expert Faculty</p>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-slate-200"></div>
                        <div className="flex flex-col items-center group cursor-pointer w-full md:w-auto">
                            <h3 className="text-3xl font-black text-slate-900 group-hover:text-orange-600 transition-colors">200+</h3>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Course Programs</p>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-slate-200"></div>
                        <div className="flex flex-col items-center group cursor-pointer w-full md:w-auto">
                            <h3 className="text-3xl font-black text-slate-900 group-hover:text-orange-600 transition-colors">98%</h3>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Satisfaction Rate</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 bg-slate-50 relative overflow-hidden">
                {/* Decorative background blobs */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-orange-100 text-orange-700 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 inline-block shadow-sm"
                        >
                            Why Choose CampusOne?
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
                        >
                            Everything You Need to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                                Excel Academically
                            </span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: 'Student Portal',
                                desc: 'Access courses, grades, attendance, and academic resources in one centralized hub.',
                                icon: Users,
                                bg: 'bg-gradient-to-br from-orange-400 to-orange-600',
                                gradient: 'from-orange-400 to-orange-600'
                            },
                            {
                                title: 'Faculty Dashboard',
                                desc: 'Streamline course management, grading, and student engagement with powerful tools.',
                                icon: LayoutDashboard,
                                bg: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
                                gradient: 'from-emerald-400 to-emerald-600'
                            },
                            {
                                title: 'Course Management',
                                desc: 'Efficiently handle registration, scheduling, and curriculum planning for all semesters.',
                                icon: CalendarDays,
                                bg: 'bg-gradient-to-br from-blue-400 to-blue-600',
                                gradient: 'from-blue-400 to-blue-600'
                            },
                            {
                                title: 'Secure & Reliable',
                                desc: 'Enterprise-grade security ensuring your academic data is always safe and compliant.',
                                icon: ShieldCheck,
                                bg: 'bg-gradient-to-br from-amber-400 to-amber-600',
                                gradient: 'from-amber-400 to-amber-600'
                            }
                        ].map((feature, index) => (
                            <FeatureCard key={index} feature={feature} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            <AboutSection />
            <ContactSection />

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 py-20 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
                                    <GraduationCap className="text-white w-6 h-6" />
                                </div>
                                <span className="text-2xl font-bold text-white tracking-tight">CampusOne</span>
                            </div>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                Redefining education manageent with intelligent technology solutions for the modern campus.
                            </p>
                        </div>

                        {/* Quick Links, Support, Contact columns - simplified for brevity but matching style */}
                        {[
                            { title: "Product", links: ["Features", "Pricing", "Case Studies", "Reviews"] },
                            { title: "Resources", links: ["Documentation", "Help Center", "Community", "Guides"] },
                            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"] }
                        ].map((col, idx) => (
                            <div key={idx}>
                                <h3 className="text-white font-bold mb-6">{col.title}</h3>
                                <ul className="space-y-4">
                                    {col.links.map(link => (
                                        <li key={link}><a href="#" className="hover:text-orange-500 transition-colors">{link}</a></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-slate-500 text-sm">© 2026 CampusOne. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            {/* Social Icons Placeholder */}
                            <div className="w-6 h-6 bg-slate-800 rounded-full hover:bg-orange-500 transition-colors cursor-pointer" />
                            <div className="w-6 h-6 bg-slate-800 rounded-full hover:bg-orange-500 transition-colors cursor-pointer" />
                            <div className="w-6 h-6 bg-slate-800 rounded-full hover:bg-orange-500 transition-colors cursor-pointer" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
