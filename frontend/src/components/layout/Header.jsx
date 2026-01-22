import { Bell, Search, Menu } from 'lucide-react';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate(); // Added navigation hook

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">

            {/* Left: Mobile Toggle & Page Title */}
            <div className="flex items-center">
                <button
                    onClick={toggleSidebar}
                    className="p-2 -ml-2 mr-2 rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Breadcrumb / Title placeholder */}
                <h2 className="text-lg font-semibold text-slate-800 hidden sm:block">
                    Dashboard
                </h2>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Search Bar - Hidden on mobile for now */}
                <div className="hidden md:flex relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 w-64 bg-slate-50 border-none rounded-full text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                    />
                </div>

                {/* Notifications */}
                <button className="p-2 relative rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* User Profile */}
                <div className="flex items-center pl-4 border-l border-slate-200 cursor-pointer" onClick={handleLogout} title="Click to Logout">
                    <div className="text-right mr-3 hidden sm:block">
                        <p className="text-sm font-medium text-slate-900">{user?.name || 'User'}</p>
                        <p className="text-xs text-slate-500 uppercase">{user?.role || 'Guest'}</p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white font-medium text-sm shadow-md ring-2 ring-white">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
