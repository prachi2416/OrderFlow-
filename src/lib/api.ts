import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mocking responses for the frontend since backend isn't implemented
api.interceptors.request.use((config) => {
  // Add auth token if needed
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Use this file to define typed API calls
export const ProductService = {
  getProducts: () => api.get('/products'),
  getProduct: (id: string) => api.get(`/products/${id}`),
};

export const OrderService = {
  getOrders: () => api.get('/orders'),
  getOrder: (id: string) => api.get(`/orders/${id}`),
  createOrder: (data: any) => api.post('/orders', data),
};

export const AuthService = {
  login: (data: any) => api.post('/auth/login', data),
  register: (data: any) => api.post('/auth/register', data),
};

export default api;
