import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});


// ----------------------- PROFILE ---------------------------

export const getProfile = async () => {
  try {
    const teacherID = localStorage.getItem('teacherID'); // Get teacherID from localStorage
    if (!teacherID) {
      throw new Error('Teacher ID not found in localStorage');
    }

    // Get the authentication token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await API.get(`/teacher/profile?teacherID=${teacherID}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.put('/teacher/profile', profileData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data.teacher; // Return updated teacher data
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const updateAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);

  try {
    const token = localStorage.getItem('token');
    const response = await API.post('/teacher/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating avatar:', error);
    throw error;
  }
};

// ----------------------- RESEARCH ---------------------------

export const addResearch = async (researchData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.post('/teacher/research', {
      Title: researchData.Title,
      Abstract: researchData.Abstract
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Backend error:', error.response?.data);
    throw error;
  }
};

export const deleteResearchById = async (researchId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.delete(`/teacher/research/${researchId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Backend error:', error.response?.data);
    throw error;
  }
};

// ----------------------- LESSON PLAN ---------------------------

export const getLessonPlans = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.get('/teacher/lesson-plans', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching lesson plans:', error);
    throw error;
  }
};

export const addLessonPlan = async (lessonPlanData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.post('/teacher/lesson-plans', {
      lesson_plan_no: lessonPlanData.lessonPlanNo,
      category: lessonPlanData.category,
      grade_level: lessonPlanData.gradeLevel,
      section: lessonPlanData.section,
      link: lessonPlanData.link,
      status: 'Pending' // Force status to Pending for new entries
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding lesson plan:', error);
    throw error;
  }
};

export const updateLessonPlan = async (id, data) => {
  try {
    const response = await API.put(`/teacher/lesson-plans/${id}`, {
      lesson_plan_no: data.lesson_plan_no, // Ensure string conversion
      category: data.category,
      grade_level: data.grade_level,
      section: data.section,
      link: data.link
    });
    return response.data;
  } catch (error) {
    console.error('Error updating lesson plan:', error.response?.data);
    throw error;
  }
};

export const deleteLessonPlan = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await API.delete(`/teacher/lesson-plans/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
  } catch (error) {
    console.error('Error deleting lesson plan:', error);
    throw error;
  }
};


