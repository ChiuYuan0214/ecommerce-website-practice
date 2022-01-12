import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: false
};

const authSlice = createSlice({
    name: 'authentication',
    initialState,
    login: (state) => {
        state.isAuth = true;
    },
    logout: state => {
        state.isAuth = false;
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;