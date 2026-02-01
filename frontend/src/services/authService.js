import API from './api';

const login = async (userData) => {
    const response = await API.post('/users/login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const signout = () => {
    localStorage.clear();
    sessionStorage.clear();
};

const getCurrentUser = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
        return null;
    }
};

const forgotPassword = async (email) => {
    const response = await API.post('/users/forgotpassword', { email });
    return response.data;
};

const resetPassword = async (resetData) => {
    const response = await API.post('/users/resetpassword', resetData);
    return response.data;
};

const authService = {
    login,
    signout,
    getCurrentUser,
    forgotPassword,
    resetPassword,
};

export default authService;
