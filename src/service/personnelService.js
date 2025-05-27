// services/personnelService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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

  async updateTeacher(id, payload) {
    const response = await axiosInstance.put(`/teachers/edit/${id}`, payload);
    return response.data;
  },

  async createTeacher(payload) {
    const response = await axiosInstance.post('/teacher/create-teacher', payload);
    return response.data;
  },
};