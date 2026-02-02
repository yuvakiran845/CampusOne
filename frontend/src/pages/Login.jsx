import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useContext, useEffect, useRef } from 'react';
import {
    User,
    Lock,
    Loader2,
    GraduationCap,
    BookOpen,
    ShieldCheck,
    Mail,
    Eye,
    EyeOff,
    ArrowLeft
} from 'lucide-react';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const { login, forgotPassword, resetPassword } = useContext(AuthContext);
    const emailInputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [activeRole, setActiveRole] = useState('student');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Forgot Password States
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP/New Pass
    const [forgotData, setForgotData] = useState({
        email: '',
        otp: '',
        newPassword: ''
    });

    const { email, password } = formData;

    useEffect(() => {
        if (emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, [activeRole, isForgotPassword]);

    const roles = [
        { id: 'student', label: 'Student', icon: User },
        { id: 'faculty', label: 'Faculty', icon: BookOpen },
        { id: 'admin', label: 'Admin', icon: ShieldCheck },
    ];

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onForgotChange = (e) => {
        setForgotData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userData = await login(email, password);

            toast.success(`Welcome back, ${userData.name}!`);

            if (userData.role === 'student') navigate('/student/dashboard');
            else if (userData.role === 'faculty') navigate('/faculty/dashboard');
            else if (userData.role === 'admin') navigate('/admin/dashboard');
            else navigate('/');

        } catch (error) {
            const message = error.response?.data?.message || 'Invalid credentials';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await forgotPassword(forgotData.email);
            toast.success('Verification OTP sent to your email!');
            setForgotStep(2);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await resetPassword({
                email: forgotData.email,
                otp: forgotData.otp,
                newPassword: forgotData.newPassword
            });
            toast.success('Password reset successful! Please login.');
            setIsForgotPassword(false);
            setForgotStep(1);
            setFormData({ ...formData, email: forgotData.email, password: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid OTP or expired');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full bg-slate-50 flex items-center justify-center p-6 overflow-hidden font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900 relative">
            {/* Back Arrow */}
            <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => isForgotPassword ? setIsForgotPassword(false) : navigate('/')}
                className="absolute top-8 left-8 p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group flex items-center gap-2"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] pr-1">
                    {isForgotPassword ? 'Back to Login' : 'Home'}
                </span>
            </motion.button>

            {/* Minimal Centered Card */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-[420px]"
            >
                {/* Logo & Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="inline-flex bg-indigo-600 p-3 rounded-2xl mb-4 shadow-lg shadow-indigo-200"
                    >
                        <GraduationCap className="w-8 h-8 text-white" />
                    </motion.div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CampusOne</h1>
                    <p className="text-slate-500 text-sm font-medium">Institutional Access Portal</p>
                </div>

                {/* Main Card Content */}
                <div className="bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10">
                    <AnimatePresence mode="wait">
                        {!isForgotPassword ? (
                            <motion.div
                                key="login-form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Role Segmented Picker */}
                                <div className="mb-8">
                                    <div className="flex p-1.5 bg-slate-100/80 rounded-xl relative">
                                        {roles.map((role) => (
                                            <button
                                                key={role.id}
                                                type="button"
                                                onClick={() => setActiveRole(role.id)}
                                                className={`relative flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-colors z-10 ${activeRole === role.id ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                                                    }`}
                                            >
                                                {role.label}
                                                {activeRole === role.id && (
                                                    <motion.div
                                                        layoutId="segmented-bg"
                                                        className="absolute inset-0 bg-white rounded-lg shadow-sm z-[-1]"
                                                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-6">
                                    <div className="space-y-5">
                                        {/* Email Field */}
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
                                            <div className="relative group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                                                    <Mail size={18} strokeWidth={2} />
                                                </div>
                                                <input
                                                    ref={emailInputRef}
                                                    type="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={onChange}
                                                    required
                                                    autoComplete="username"
                                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all placeholder:text-slate-300"
                                                    placeholder={`name@${activeRole}.campus.edu`}
                                                />
                                            </div>
                                        </div>

                                        {/* Password Field */}
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between items-end">
                                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsForgotPassword(true)}
                                                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest transition-colors"
                                                >
                                                    Forgot?
                                                </button>
                                            </div>
                                            <div className="relative group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                                                    <Lock size={18} strokeWidth={2} />
                                                </div>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    value={password}
                                                    onChange={onChange}
                                                    required
                                                    autoComplete="current-password"
                                                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-transparent rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all placeholder:text-slate-300"
                                                    placeholder="••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-indigo-600 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.01, translateY: -1 }}
                                        whileTap={{ scale: 0.99 }}
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                                    >
                                        {loading ? (
                                            <Loader2 className="animate-spin w-5 h-5" />
                                        ) : (
                                            <span className="text-sm uppercase tracking-[0.1em]">Sign In</span>
                                        )}
                                    </motion.button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="forgot-password-form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="text-left mb-6">
                                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">Recover Password</h3>
                                    <p className="text-slate-500 text-xs font-medium">
                                        {forgotStep === 1
                                            ? "Enter your email to receive a verification OTP."
                                            : "Enter the OTP sent to your email and set a new password."}
                                    </p>
                                </div>

                                {forgotStep === 1 ? (
                                    <form onSubmit={handleForgotPassword} className="space-y-6">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={forgotData.email}
                                                onChange={onForgotChange}
                                                required
                                                className="w-full px-4 py-3.5 bg-slate-50 border border-transparent rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                                                placeholder="Enter your registered email"
                                            />
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
                                        >
                                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Send Verification OTP"}
                                        </motion.button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleResetPassword} className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">OTP Code</label>
                                                <input
                                                    type="text"
                                                    name="otp"
                                                    value={forgotData.otp}
                                                    onChange={onForgotChange}
                                                    required
                                                    maxLength={6}
                                                    className="w-full px-4 py-3.5 bg-slate-50 border border-transparent rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all text-center tracking-[0.5em]"
                                                    placeholder="000000"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">New Password</label>
                                                <input
                                                    type="password"
                                                    name="newPassword"
                                                    value={forgotData.newPassword}
                                                    onChange={onForgotChange}
                                                    required
                                                    className="w-full px-4 py-3.5 bg-slate-50 border border-transparent rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                                                    placeholder="Minimum 6 characters"
                                                />
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
                                        >
                                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Reset Password"}
                                        </motion.button>
                                    </form>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Link */}
                <div className="text-center mt-8">
                    <p className="text-slate-400 text-xs font-medium">
                        Need assistance? <span className="text-indigo-500 hover:underline cursor-pointer font-bold">Contact Support</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
