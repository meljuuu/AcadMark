import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

// Add response interceptor for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        message: error.response.data?.message || 'An error occurred'
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Get all students in the teacher's advisory class
 */
export const getAdvisoryStudents = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Token:', token ? 'Present' : 'Missing');

    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await API.get('/teacher/advisory-students', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Advisory students response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to fetch advisory students',
      error: error.message
    };
  }
};

/**
 * Get subjects for a specific student
 */
export const getStudentSubjects = async (studentId) => {
  try {
    const token = localStorage.getItem('token');
    console.log('Getting subjects for student:', studentId); // Debug log

    if (!token) {
      throw new Error('Authentication token not found');
    }

    if (!studentId) {
      throw new Error('Student ID is required');
    }

    const response = await API.get(`/student/${studentId}/subjects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Subjects response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Error fetching student subjects:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to fetch student subjects',
      error: error.message
    };
  }
};

/**
 * Get student grades for a specific subject
 */
export const getStudentGrades = async (studentId, subjectId) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await API.get(`/student/${studentId}/subject/${subjectId}/grades`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching student grades:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to fetch student grades',
      error: error.message
    };
  }
};

/**
 * Generate sample data for development
 */
const getSampleStudents = () => {
  return [
    {
      student_id: '1',
      lrn: '123456789012',
      firstName: 'John',
      lastName: 'Doe',
      middleName: 'Smith',
      sex: 'M',
      birthDate: '2005-05-15',
      curriculum: 'Academic',
      address: '123 Main St, Barangay 1, Manila, Metro Manila',
    },
    {
      student_id: '2',
      lrn: '987654321098',
      firstName: 'Jane',
      lastName: 'Smith',
      middleName: 'Lee',
      sex: 'F',
      birthDate: '2006-08-22',
      curriculum: 'Academic',
      address: '456 Park Ave, Barangay 2, Manila, Metro Manila',
    },
  ];
};

/**
 * Generate sample subjects for development
 */
const getSampleSubjects = (studentId) => {
  return [
    {
      subject_id: '101',
      subjectName: 'Mathematics',
      class_id: '1',
      student_id: [studentId],
    },
    {
      subject_id: '102',
      subjectName: 'Science',
      class_id: '1',
      student_id: [studentId],
    },
    {
      subject_id: '103',
      subjectName: 'English',
      class_id: '1',
      student_id: [studentId],
    },
  ];
};
