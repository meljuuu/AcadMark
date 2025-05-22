import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

/**
 * Get all students in the teacher's advisory class
 */
export const getAdvisoryStudents = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await API.get('/teacher/advisory-students', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching advisory students:', error);
    if (import.meta.env.DEV) {
      // Return mock data for development
      return {
        status: 'success',
        students: getSampleStudents(),
      };
    }
    throw error;
  }
};

/**
 * Get subjects for a specific student
 */
export const getStudentSubjects = async (studentId) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await API.get(`/student/${studentId}/subjects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching student subjects:', error);
    if (import.meta.env.DEV) {
      // Return mock data for development
      return {
        status: 'success',
        subjects: getSampleSubjects(studentId),
      };
    }
    throw error;
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
