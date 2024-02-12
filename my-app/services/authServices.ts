import axiosInstance from './services';

// Function to register a new user
export const registerUser = async (user: any) => {
  try {
    const response = await axiosInstance.post('/register', user);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Function to log in a user
export const loginUser = async (credentials: any) => {
  try {
    const response = await axiosInstance.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

 
// Function to check if the user is authorized
export const checkAuthStatus = async () => {
  try {
    const response = await axiosInstance.get(`/check-auth`);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};