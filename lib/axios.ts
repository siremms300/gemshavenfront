import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Don't show toast for validation errors (400) as they're handled in the form
    const skipToast = error.config?.skipToast;
    
    if (!skipToast && typeof window !== 'undefined') {
      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 401:
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
              toast.error('Session expired. Please login again.');
              window.location.href = '/login';
            }
            break;
          case 403:
            toast.error(data.message || 'Access denied. You do not have permission.');
            break;
          case 404:
            toast.error(data.message || 'Resource not found.');
            break;
          case 500:
            toast.error('Server error. Please try again later.');
            break;
          // Don't show toast for 400 as it's handled in forms
          case 400:
            break;
          default:
            if (status >= 500) {
              toast.error('Server error. Please try again later.');
            }
        }
      } else if (error.request) {
        toast.error('Network error. Please check your connection and try again.');
      } else {
        console.error('Request error:', error.message);
      }
    }

    return Promise.reject(error);
  }
);

export default api;