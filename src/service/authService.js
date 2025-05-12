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

    // If not admin, proceed with teacher login API call
    const response = await API.post('/login', {
      email,
      password,
    });
    return {
      ...response.data,
      isAdmin: false,
    };
  } catch (error) {
    throw error.response?.data?.error || 'Login failed';
  }
};
