// services/personnelService.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default {
  async getAllTeachers() {
    const response = await axiosInstance.get('/teacher/getAll');
    return response.data;
  },

  async getSubjects() {
    const response = await axiosInstance.get('/subject/getSubjects');
    return response.data;
  },

  async deleteTeacher(id) {
    const response = await axiosInstance.delete(`/teachers/delete/${id}`);
    return response.data;
  },
};