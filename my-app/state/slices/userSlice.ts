import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        name: '',
        email: '',
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.name = '';
            state.email = '';
        },
        updateUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
    },
});

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;