import { AxiosResponse } from 'axios';
import axiosInstance from './index';
import Cookies from 'js-cookie';
import { getCookie } from '@/lib/utils';
import { toast } from 'sonner';
import { User } from '@/utils/types';

type Users = { users: User[] };
class UserService {
    private token: string | undefined;

    constructor(AuthToken: string) {
        this.token = AuthToken;
    }

    // Register a new user
    async register(name: string, email: string, password: string) {
        try {
            const response = await axiosInstance.post('/api/user/register', {
                name,
                email,
                password,
            });

            return response.data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }

    // Login user
    async login(email: string, password: string) {
        try {
            const response = await axiosInstance.post('/api/user/login', {
                email,
                password,
            });

            toast.success("Successfully Logged in");
            return response.data;
        } catch (error) {
            toast.error("Error while logging in");
            console.error('Error logging in:', error);
            throw error;
        }
    }

    // Update user profile
    async updateProfile(name: string, email: string) {
        try {
            const response = await axiosInstance.patch(
                '/api/user/profile',
                {
                    name,
                    email,
                },
                {
                    headers: {
                        token: `${this.token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }

    // Delete user account
    async deleteAccount() {
        try {
            await axiosInstance.delete('/api/user/account', {
                headers: {
                    token: `${this.token}`,
                },
            });
        } catch (error) {
            console.error('Error deleting user account:', error);
            throw error;
        }
    }

    // Search users
    async searchUsers(searchQuery: string): Promise<Users> {
        try {
            const response = await axiosInstance.get('/api/user/search', {
                params: {
                    searchQuery,
                },
                headers: {
                    token: this.token,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error searching users:', error);
            throw error;
        }
    }
    async checkAuth() {
        try {
            const response = await axiosInstance.get('/api/user/check-auth', {
                headers: {
                    token: this.token
                },
            });
            return response.data;
        } catch (error) {
            console.log('Error searching users:', error);
            // throw error;
        }
    }
    async getProfile() {
        try {
            const response = await axiosInstance.get('/api/user/profile', {
                headers: {
                    token: this.token
                },
            });
            return response.data;
        } catch (error) {
            console.log('Error searching users:', error);
            // throw error;
        }
    }
}

export default UserService;
