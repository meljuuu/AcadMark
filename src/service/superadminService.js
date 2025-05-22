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

