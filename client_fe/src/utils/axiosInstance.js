import axios from 'axios';

import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
})

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle error globally
        if (error.response && error.response.status === 401) {
            // Redirect to login page or show a message
            window.location.href = '/login'; // Adjust the URL as needed
            console.error('Unauthorized access - redirecting to login');
        } else if(error.code === 'ECONNABORTED'){
            console.error('Request timed out. Please try again later.');

        }
        
        // else {
        //     console.error('An error occurred:', error.message);
        // }
        return Promise.reject(error);
    }
);


export default axiosInstance;