// services/userService.js
import axiosInstance from './index';

const userService = {
    getUsers: async () => {
        try {
            const response = await axiosInstance.get('/users');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    // Other user-related functions
};

export default userService;
