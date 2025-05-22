import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // example: 'http://localhost:8000/api'
    withCredentials: false,
});

export const createStudentClass = async ({ class_id, sy_id, student_ids }) => {
    try {
        const response = await API.post('/assign-students', {
            class_id,
            sy_id,
            student_ids,
        });

        return response.data; // contains message and assigned students
    } catch (error) {
        if (error.response) {
            // Return validation errors or other server errors
            return {
                error: true,
                status: error.response.status,
                data: error.response.data
            };
        } else {
            // Network or other unexpected errors
            return {
                error: true,
                message: 'An unexpected error occurred.',
            };
        }
    }
};
