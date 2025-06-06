import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: false,
});

export const getAllTeacherSubjects = async () => {
    try {
        const response = await API.get('/teacher-subjects/getAll');
        return response.data.teachersSubjects;
    } catch (error) {
        console.error('Failed to fetch teachers:', error);
    }
};


export const getAllClasses = async () => {
    try {
        const response = await API.post('/get-all-classes');
        return response.data;
    } catch (error) {
        console.error("Failed to fetch classes:", error);
        throw error;
    }
};

export const getClassesExcludingIncomplete = async () => {
    try {
        const response = await API.get('/get-super-classes');
        return response.data || [];
    } catch (error) {
        console.error('Failed to fetch classes excluding incomplete:', error);
        throw error;
    }
};
export const createClass = async (formData) => {
    try {
        const response = await API.post('/admin/create-class', formData);
        return response.data;
    } catch (error) {
        console.error("Failed to create class:", error.response?.data || error);
        throw error;
    }
};

export const getAcceptedClasses = async () => {
    try {
        const response = await API.get('/get-accepted-classes');
        return response.data || [];
    } catch (error) {
        console.error('Failed to fetch accepted classes:', error);
        throw error;
    }
};

