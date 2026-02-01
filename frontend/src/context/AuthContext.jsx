import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = authService.getCurrentUser();
                if (storedUser) {
                    setUser(storedUser);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = async (email, password) => {
        const userData = await authService.login({ email, password });
        setUser(userData);
        return userData;
    };

    const signout = () => {
        authService.signout();
        setUser(null);
        window.location.href = '/login';
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC' }}>
                <div style={{ width: '40px', height: '40px', border: '4px solid #E2E8F0', borderTop: '4px solid #EA580C', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, login, signout, loading, searchQuery, setSearchQuery }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
