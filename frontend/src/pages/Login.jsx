import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useContext } from 'react';
import { User, Lock, ArrowRight, Loader2, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [activeRole, setActiveRole] = useState('student'); // student, faculty, admin
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const roles = [
        { id: 'student', label: 'Student', icon: User },
        { id: 'faculty', label: 'Faculty', icon: BookOpen },
        { id: 'admin', label: 'Administrator', icon: ShieldCheck },
    ];

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // In a real app we'd pass role too, or backend determines it.
            // For now, we simulate different emails for different roles using the seeder.
            const userData = await login(email, password);

            // Basic role validation vs selected tab
            if (userData.role !== activeRole) {
                // Optional: warn mismatch? specific to requirement?
                // For now, allow it but maybe show a toast "Logged in as [Role]"
            }

            toast.success(`Welcome back, ${userData.name}!`);

            if (userData.role === 'student') navigate('/student/dashboard');
            else if (userData.role === 'faculty') navigate('/faculty/dashboard');
            else if (userData.role === 'admin') navigate('/admin/dashboard');
            else navigate('/');

        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* Simple Navbar for Login Page */}
            <nav className="bg-white border-b border-slate-200 px-8 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="bg-primary p-1.5 rounded-lg">
                        <GraduationCap className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold text-slate-900">CampusOne</span>
                </div>
                <div className="flex items-center space-x-6">
                    <a href="/" className="text-sm font-medium text-slate-600 hover:text-primary">Features</a>
                    <a href="/" className="text-sm font-medium text-slate-600 hover:text-primary">About</a>
                    <a href="/" className="text-sm font-medium text-slate-600 hover:text-primary">Contact</a>
                    <div onClick={() => navigate('/')} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-primary-hover transition-colors">
                        Get Started
                    </div>
                </div>
            </nav>

            {/* Login Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="text-center mb-8">
                    <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                        Portal Login
                    </span>
                    <h1 className="text-3xl font-bold text-slate-900 mt-2">Welcome Back</h1>
                    <p className="text-slate-500 mt-2">Sign in to access your portal</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-8"
                >
                    <p className="text-sm font-medium text-slate-900 mb-4">I am a...</p>

                    {/* Role Tabs */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                        {roles.map((role) => (
                            <button
                                key={role.id}
                                onClick={() => setActiveRole(role.id)}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 ${activeRole === role.id
                                    ? 'border-orange-500 bg-orange-50 text-orange-600 ring-2 ring-orange-500/20'
                                    : 'border-slate-200 text-slate-500 hover:border-orange-200 hover:bg-slate-50'
                                    }`}
                            >
                                <role.icon className={`w-5 h-5 mb-1.5 ${activeRole === role.id ? 'text-orange-600' : 'text-slate-400'}`} />
                                <span className="text-xs font-semibold">{role.label}</span>
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Email</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    className="input-field pl-10"
                                    placeholder="you@university.edu"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    className="input-field pl-10"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" />
                                <span className="text-slate-600">Remember me</span>
                            </label>
                            <a href="#" className="font-medium text-primary hover:text-primary-hover">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-3 text-base flex items-center justify-center space-x-2"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Sign In to Portal</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-500">
                        Need help? Contact <a href="#" className="text-primary font-semibold hover:underline">IT Support</a>
                    </div>
                </motion.div>
            </div>

            {/* Simple Footer for Login */}
            <footer className="bg-[#0F172A] py-12 text-center text-slate-400 text-sm">
                <p>© 2026 CampusOne. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Login;
