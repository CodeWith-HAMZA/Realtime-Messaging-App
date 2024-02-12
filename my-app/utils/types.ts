

export interface Chat {
    isGroupChat: boolean;
    users: User[];
    _id: string;
    chatName: string;
    groupAdmin?: User;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    profile: string; 
}