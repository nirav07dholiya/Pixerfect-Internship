import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    edit: null,
    view: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
        setEdit: (state, action) => {   
            state.edit = action.payload;
        },
        setView: (state, action) => {
            state.view = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.edit = null;
            state.view = null;
        },
        clearEdit: (state) => {
            state.edit = null;
        },
        clearView: (state) => {
            state.view = null;
        },
    },
});

export const { setUser, clearUser, setEdit, clearEdit, setView, clearView } = userSlice.actions;
export default userSlice.reducer;