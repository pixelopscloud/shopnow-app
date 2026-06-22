import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost';

export const userAPI = axios.create({ baseURL: `${API_BASE}:3001` });
export const productAPI = axios.create({ baseURL: `${API_BASE}:3002` });
export const orderAPI = axios.create({ baseURL: `${API_BASE}:3003` });
export const paymentAPI = axios.create({ baseURL: `${API_BASE}:3004` });

// Add token to requests
[userAPI, productAPI, orderAPI, paymentAPI].forEach(api => {
  api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
});