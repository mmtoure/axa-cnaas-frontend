import { changePassword, getUserById, loginUser } from "./authThunk";
import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("token"),
        loading: false,
        error: null,
        isAuthenticated: !!localStorage.getItem("token"),
    
    },
    reducers: {
        logout: (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        state.isAuthenticated = false;
        },
    },
    extraReducers:(builder) =>{
        builder
            .addCase(loginUser.pending, (state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(loginUser.fulfilled, (state, action)=>{
                state.loading=false;
                state.user = action.payload.user
                state.token = action.payload.token;
                state.isAuthenticated = true;

            })
            .addCase(loginUser.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload?.message || "Login failed";
            })

            // getUserById cases
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch user";
            })

            //change password cases can be added here
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to change password";
            })

    }
})
export const { logout } = authSlice.actions;
export default authSlice.reducer;
