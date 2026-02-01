import { Bell, Search, Menu, GraduationCap, X } from 'lucide-react';
import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
    const { user, searchQuery, setSearchQuery } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleProfileClick = () => {
        const role = user?.role?.toLowerCase() || 'student';
        navigate(`/${role}/dashboard`, { state: { activeTab: 'profile' } });
    };

    return (
        <header className="sticky top-0 z-40 h-16 md:h-20 bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-3 md:px-8">
            {/* Left Section: Burger Menu */}
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleSidebar}
                    className="p-3 rounded-2xl text-slate-900 lg:hidden bg-slate-100/50 hover:bg-slate-100 transition-all min-h-[48px] min-w-[48px] mr-2"
                    style={{ fontSize: '2rem' }}
                >
                    {isSidebarOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Middle Section: Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full group">
                    <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isSearchFocused ? 'text-orange-600' : 'text-slate-400'}`} />
                    <input
                        type="text"
                        placeholder="Search for students, records, or nodes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-semibold focus:bg-white focus:border-orange-200 outline-none transition-all placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* Right Section: Notifications, Profile */}
            <div className="flex items-center gap-3 md:gap-4">
                <button className="hidden sm:flex p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all relative">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-600 border-2 border-white rounded-full" />
                </button>

                {/* Profile Avatar */}
                <div
                    onClick={handleProfileClick}
                    className="flex items-center gap-3 cursor-pointer p-1 rounded-xl h-10 w-10 md:h-auto md:w-auto"
                >
                    <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-sm font-black shadow-sm hover:scale-105 transition-transform group">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                </div>
            </div>
        </header>
        );
    }

export default Header;
