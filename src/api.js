import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menyisipkan token Bearer otomatis
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('labpinjam_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor untuk menangani error autentikasi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('labpinjam_token');
      localStorage.removeItem('labpinjam_user');
    }
    return Promise.reject(error);
  }
);

export default api;

