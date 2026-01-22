import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Hardcoded local for now
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
