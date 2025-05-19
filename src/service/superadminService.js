import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

// 👇 Define this
export const getClassesWithStudentCount = async () => {
  try {
    const response = await API.get("/superadmin/classes-with-students");
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error.response ? error.response.data : error;
  }
};
