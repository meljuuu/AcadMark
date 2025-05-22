import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

export const submitGrades = async (gradesData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.post(
      '/grades/bulk',
      { grades: gradesData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error.response ? error.response.data : error;
  }
};

export const apiSubmitGrades = async (gradesData) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post(
      `${API_URL}/grades/bulk`,
      { grades: gradesData }, // Make sure it matches the structure expected by your controller
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Grade submission error:', error);

    if (error.response) {
      return error.response.data;
    }

    return {
      status: 'error',
      message: 'Network error or server unreachable',
    };
  }
};

export const getStudentGrades = async (studentId, subjectId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.get(
      `/grades?student_id=${studentId}&subject_id=${subjectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error.response ? error.response.data : error;
  }
};
