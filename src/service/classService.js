import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const classService = {
    // Get all classes
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

    // Get class details by ID
    async getClassDetails(classId) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('Please log in first');
                return;
            }

            const response = await axios.get(`${API_URL}/classes/${classId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            
            if (response.data.status === 'success') {
                return {
                    status: 'success',
                    data: {
                        maleCount: response.data.data.maleCount,
                        femaleCount: response.data.data.femaleCount,
                        totalStudents: response.data.data.totalStudents,
                        className: response.data.data.className,
                        section: response.data.data.section,
                        gradeLevel: response.data.data.gradeLevel,
                        track: response.data.data.track,
                        curriculum: response.data.data.curriculum
                    }
                };
            } else {
                throw new Error(response.data.message || 'Failed to fetch class details');
            }
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
            }
            throw this.handleError(error);
        }
    },

    // Get students in a class
    async getClassStudents(classId) {
        try {
            const response = await axios.get(`${API_URL}/classes/${classId}/students`, {
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
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return {
                status: 'error',
                message: error.response.data.message || 'An error occurred',
                statusCode: error.response.status
            };
        } else if (error.request) {
            // The request was made but no response was received
            return {
                status: 'error',
                message: 'No response from server',
                statusCode: 0
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            return {
                status: 'error',
                message: error.message,
                statusCode: 0
            };
        }
    }
};
