import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

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

export const addResearch = async (researchData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.post('/teacher/research', researchData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding research:', error);
    throw error;
  }
};
