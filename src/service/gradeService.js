import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

// Function to submit grades (both single and bulk)
export const submitGrades = async (gradesData, classId) => {
  try {
    const payload = {
      grades: gradesData.map(grade => ({
        ...grade,
        Class_ID: classId
      }))
    };
    console.log('Submitting grades data:', gradesData);
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    if (!userStr) {
      throw new Error('User data not found');
    }
    
    const user = JSON.parse(userStr);
    if (!user.teacher_ID) {
      throw new Error('Teacher ID not found in user data');
    }

    const response = await API.post('/grades/bulk', payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // Log the response
    console.log('Server response:', response.data);

    return response.data;
  } catch (error) {
    console.error('Grade submission error:', error);
    if (error.response) {
      console.error('Validation errors:', error.response.data.errors);
    }
    throw error;
  }
};

// Function to get grades for a specific subject and class
export const getSubjectGrades = async (subjectId, classId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.get(
      `/grades/subject/${subjectId}/class/${classId}`,
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

// Function to get grades for a specific student
export const getStudentGrades = async (studentId, subjectId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.get(
      `/grades/student/${studentId}/subject/${subjectId}`,
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

function validateGradeData(gradeData) {
  const errors = [];
  
  if (!gradeData.Student_ID) {
    errors.push('Student ID is required');
  }
  if (!gradeData.Subject_ID) {
    errors.push('Subject ID is required');
  }
  if (!gradeData.Teacher_ID) {
    errors.push('Teacher ID is required');
  }
  
  // Validate quarter grades
  ['Q1', 'Q2', 'Q3', 'Q4'].forEach(quarter => {
    if (gradeData[quarter] !== null) {
      const grade = parseFloat(gradeData[quarter]);
      if (isNaN(grade) || grade < 0 || grade > 100) {
        errors.push(`${quarter} must be a number between 0 and 100`);
      }
    }
  });

  return errors;
}

export const updateGradeStatus = async (gradeId, status) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.put(
      `/grades/${gradeId}/status`,
      { status },
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

export const getAllData = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.get('/superadmin/grading', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error.response ? error.response.data : error;
  }
};
