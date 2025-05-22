import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const classService = {
    // Get all classes with their subjects
    async getClasses() {
        try {
            const response = await axios.get(`${API_URL}/classes`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    // Get subjects for a specific class
    async getClassSubjects(classId) {
        try {
            const response = await axios.get(`${API_URL}/student-class-teacher-subject/class/${classId}/subjects-with-teachers`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    // Get teachers for a specific class
    async getClassTeachers(classId) {
        try {
            const response = await axios.get(`${API_URL}/student-class-teacher-subject/class/${classId}/teachers`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    // Error handler
    handleError(error) {
        if (error.response) {
            return error.response.data;
        }
        return {
            status: 'error',
            message: 'An unexpected error occurred'
        };
    }
};
