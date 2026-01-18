import { loginUser } from "./authThunk";
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

    }
})
export const { logout } = authSlice.actions;
export default authSlice.reducer;
