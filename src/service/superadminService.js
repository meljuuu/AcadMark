import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});



// Classes Tab
export const getClassesWithStudentCount = async () => {
  try {
    const response = await API.get("/superadmin/classes-with-students");
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error.response ? error.response.data : error;
  }
};


// Students Tab
export const getAllStudentsData = async () => {
  try {
    const response = await API.get("/superadmin/students");
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error.response ? error.response.data : error;
  }
};


// Students Modal
export const getStudentById = async (id) => {
  try {
    const response = await API.get(`/superadmin/student/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    throw error;
  }
};

// Accept Student
export const acceptStudent = async (id) => {
  try {
    const response = await API.put(`/superadmin/student/${id}/accept`);
    return response.data;
  } catch (error) {
    console.error("Error accepting student:", error);
    throw error.response ? error.response.data : error;
  }
};

// Decline Student
export const declineStudent = async (id, comment) => {
  try {
    const response = await API.put(`/superadmin/student/${id}/decline`, {
      comment: comment, // ✅ Send the comment as request payload
    });
    return response.data;
  } catch (error) {
    console.error("Error declining student:", error);
    throw error.response ? error.response.data : error;
  }
};





