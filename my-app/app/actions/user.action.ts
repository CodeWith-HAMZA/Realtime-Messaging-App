'use client'
import { ApiRequestOptions, hit } from "@/utils/api";

const baseUrl = 'http://localhost:4000/api/user';

export const registerUser = async (name: string, email: string, password: string) => {
    const url = baseUrl + '/register';
    const options: ApiRequestOptions = {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await hit(url, options);
        return await response;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const loginUser = async (email: string, password: string) => {
    const url = baseUrl + '/login';
    const options: ApiRequestOptions = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await hit(url, options);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateUserProfile = async (name: string, email: string, token: string) => {
    const url = baseUrl + '/profile';
    const options: ApiRequestOptions = {
        method: 'PATCH',
        body: JSON.stringify({ name, email }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await hit(url, options);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};


export const deleteUserAccount = async (token: string) => {
    const url = baseUrl + '/account';
    const options: ApiRequestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await hit(url, options);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllUsers = async (token: string) => {
    const url = baseUrl + '/';
    const options: ApiRequestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await hit(url, options);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};