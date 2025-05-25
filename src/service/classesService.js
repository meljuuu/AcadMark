import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const classService = {
    // Get all classes with their subjects
    async getClasses(teacherId) {
        try {
            console.log('Sending request with teacher ID:', teacherId);
            
            const response = await axios.get(`${API_URL}/classes`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    teacher_id: teacherId
                }
            });
            
            console.log('API Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('API Error:', error.response?.data || error);
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

    // Get students for a specific subject
    async getClassStudents(subjectId) {
        try {
            const response = await axios.get(`${API_URL}/classes/${subjectId}/students`, {
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
            console.error('Error response:', error.response.data);
            return error.response.data;
        }
        console.error('Unexpected error:', error);
        return {
            status: 'error',
            message: 'An unexpected error occurred'
        };
    }
};
