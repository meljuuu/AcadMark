import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: false,
});

export const getAllSubjects = async () => {
    try {
        const response = await API.get('/getSubjects');
        return response.data.subjects;
    } catch (error) {
        console.error("Failed to fetch subjects:", error);
        throw error;
    }
};
