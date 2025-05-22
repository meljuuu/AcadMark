import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // example: 'http://localhost:8000/api'
    withCredentials: false,
});

export const getAllTeachers = async () => {
    try {
        const response = await API.get('/teacher/getTeachers');
        return response.data.teachers;
    } catch (error) {
        console.error('Failed to fetch teachers:', error);
        throw error;
    }
};