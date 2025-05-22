// filepath: c:\Users\PC\Desktop\COMEX-REAL\RESILIENT-AcadMark\src\service\dashboardService.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

export const getAdvisoryStats = async () => {
  const token = localStorage.getItem('token');
  const response = await API.get('/teacher/advisory-stats', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getSubjectClasses = async () => {
  const token = localStorage.getItem('token');
  const response = await API.get('/teacher/subject-classes', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getGradeSummary = async () => {
  const token = localStorage.getItem('token');
  const response = await API.get('/teacher/grade-summary', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getRecentGrades = async () => {
  const token = localStorage.getItem('token');
  const response = await API.get('/teacher/recent-grades', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
