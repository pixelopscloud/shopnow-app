import axios from 'axios';

const API_BASE = 'http://localhost';

export const userAPI = axios.create({ baseURL: API_BASE });
export const productAPI = axios.create({ baseURL: API_BASE });
export const orderAPI = axios.create({ baseURL: API_BASE });
export const paymentAPI = axios.create({ baseURL: API_BASE });

[userAPI, productAPI, orderAPI, paymentAPI].forEach(api => {
  api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
});