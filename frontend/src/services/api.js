import axios from 'axios';

const API = axios.create({
    baseURL: 'https://campusone-87s8.onrender.com/api',
});

// Add token to requests
API.interceptors.request.use((req) => {
    if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'));
        req.headers.Authorization = `Bearer ${user.token}`;
    }
    return req;
});

export default API;
