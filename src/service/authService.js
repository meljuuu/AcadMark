import axios from 'axios';
import teachersData from '../data/teachers.json';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const loginTeacher = async (email, password) => {
  try {
    // First check if it's an admin login
    const admin = teachersData.admin.find(
      (a) => a.username === email && a.password === password
    );
    if (admin) {
      return {
        ...admin,
        isAdmin: true,
      };
    }

    // If not admin, check teacher login
    const teacher = teachersData.teachers.find(
      (t) => t.email === email && t.password === password
    );
    if (teacher) {
      return {
        ...teacher,
        isAdmin: false,
      };
    }

    throw new Error('Invalid email or password');
  } catch (error) {
    throw error.message || 'Login failed';
  }
};
