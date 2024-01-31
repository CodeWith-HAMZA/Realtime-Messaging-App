export interface User {
    name: string;
    email: string;
}

export interface Chat {
    isGroupChat: boolean;
    users: User[];
    _id: string;
    chatName: string;
    groupAdmin?: User;
}