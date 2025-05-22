import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: false,
});

export const getAllClasses = async () => {
    try {
        const response = await API.post('/get-all-classes');
        return response.data;
    } catch (error) {
        console.error("Failed to fetch classes:", error);
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

export const addStudentsToClass = async (payload) => {
    try {
        const response = await API.post('/admin/add-student-to-class', {
            student_ids: payload.student_ids,
            class_id: payload.class_id
        });

        return response.data;
    } catch (error) {
        console.error('Error adding students to class:', error.response?.data || error);
        throw error.response?.data || error;
    }
};