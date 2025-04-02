import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(user);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === 'Network Error') {
      console.error('Failed to connect to server:', error);
      return Promise.reject(new Error('Failed to connect to server. Please check if the server is running.'));
    }
    return Promise.reject(error);
  }
);

// Auth API
export const login = (email, password) => api.post('/users/login', { email, password });
export const register = (name, email, password) => api.post('/users/register', { name, email, password });
export const getProfile = () => api.get('/users/profile');

// Products API
export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (productData) => api.post('/products', productData);
export const updateProduct = (id, productData) => api.put(`/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Bookings API
export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const getMyBookings = () => api.get('/bookings/my-bookings');
export const getAllBookings = () => api.get('/bookings/admin');
export const updateBookingStatus = (id, status) => api.put(`/bookings/${id}/status`, { status });
export const getAvailableSlots = (date) => api.get(`/bookings/available-slots?date=${date}`);

export default api;
