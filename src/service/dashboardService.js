// filepath: c:\Users\PC\Desktop\COMEX-REAL\RESILIENT-AcadMark\src\service\dashboardService.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

// Add request interceptor for authentication
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getAdvisoryStats = async () => {
  try {
    const response = await API.get('/teacher/advisory-stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching advisory stats:', error);
    throw error;
  }
};

export const getSubjectClasses = async () => {
  try {
    const response = await API.get('/teacher/subject-classes');
    return response.data;
  } catch (error) {
    console.error('Error fetching subject classes:', error);
    throw error;
  }
};

export const getGradeSummary = async () => {
  try {
    const response = await API.get('/teacher/grade-summary');
    return response.data;
  } catch (error) {
    console.error('Error fetching grade summary:', error);
    throw error;
  }
};

export const getRecentGrades = async () => {
  try {
    const response = await API.get('/teacher/recent-grades');
    return response.data;
  } catch (error) {
    console.error('Error fetching recent grades:', error);
    throw error;
  }
};
