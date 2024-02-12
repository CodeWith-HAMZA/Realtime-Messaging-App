'use client'
import { removeCookie, setCookie } from '@/lib/utils';
import UserService from '@/services/userServices';
import axios from 'axios';
import { Island_Moments } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, ReactNode, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Toaster } from 'sonner';

interface User {
    isLoggedIn: boolean;
    name: string;
    email: string;
    token?: string
}

interface UserContextProps {
    user: User;
    login: (name: string, email: string, token: string) => void;
    logout: () => void;
    updateUser: (name: string, email: string) => void;
    getAuthCookie: () => string;

}

export const UserContext = React.createContext<UserContextProps>({
    user: {
        isLoggedIn: false,
        name: '',
        email: '',
    },
    login: () => { },
    logout: () => { },
    updateUser: () => { },
    getAuthCookie: () => ''



});

interface UserProviderProps {
    children: ReactNode;
    data: object
}

const UserProvider: React.FC<UserProviderProps> = ({ children, ...t }) => {

    const [user, setUser] = useState<User>({
        isLoggedIn: false,
        name: '',
        email: '',
        token: ''
    });
    const [cookies, setCookie, removeCookie] = useCookies(["Authorization"]);
    const router = useRouter()

    const getAuthCookie = () => {
        return cookies["Authorization"]
    }

    const login = (name: string, email: string, token: string = '') => {
        setCookie("Authorization", token, { path: "/" });
        setUser({
            isLoggedIn: true,
            name,
            email,
            token
        });
        router.push('/chat')
    };



    const logout = () => {
        removeCookie("Authorization")
        router.push("/auth/login")
        setUser({
            isLoggedIn: false,
            name: '',
            email: '',
        });
    };


    const updateUser = (name: string, email: string) => {
        setUser((prevUser) => ({
            ...prevUser,
            name,
            email,
        }));
    };

    return (
        <UserContext.Provider value={{ getAuthCookie, user, login, logout, updateUser, }}>
            <Toaster />
            {children}
        </UserContext.Provider>
    );
};


const useUser = (): UserContextProps => {
    return useContext(UserContext);
};

export { useUser };

export default UserProvider;