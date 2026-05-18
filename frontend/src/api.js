import axios from 'axios';

const api = axios.create({
  baseURL: 'https://endsem-backend.onrender.com/api', // Match backend port
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
