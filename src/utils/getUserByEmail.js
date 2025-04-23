import axiosInstance from "./axiosInstance";

const getUserByEmail = async (user_email) => {
  try {
    const res = await axiosInstance.get(`/api/users/${user_email}`);
    return res.data.user;
  } catch (error) {
    console.error(
      "Error fetching user by email:",
      error.response?.data || error.message
    );
    return null;
  }
};

export default getUserByEmail;
