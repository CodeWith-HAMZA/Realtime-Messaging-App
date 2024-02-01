'use client'
import React, { useState, ReactNode, useContext } from 'react';
import { Toaster } from 'sonner';

interface User {
    isLoggedIn: boolean;
    name: string;
    email: string;
}

interface UserContextProps {
    user: User;
    login: (name: string, email: string) => void;
    logout: () => void;
    updateUser: (name: string, email: string) => void;
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
});

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>({
        isLoggedIn: false,
        name: '',
        email: '',
    });

    const login = (name: string, email: string) => {
        setUser({
            isLoggedIn: true,
            name,
            email,
        });
    };

    const logout = () => {
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
        <UserContext.Provider value={{ user, login, logout, updateUser }}>
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