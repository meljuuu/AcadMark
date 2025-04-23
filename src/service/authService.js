import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const loginTeacher = async (email, password) => {
  try {
    const response = await API.post('/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Login failed';
  }
};
