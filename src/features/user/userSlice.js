import { createSlice } from "@reduxjs/toolkit";
import { me, getAllUsers, createUser } from "./userThunk";

const userSlice = createSlice({
    name: "user",
    initialState: {
    loading: false,
    user: null,
    users: [],
    error: null,
    success: false,
    
},
reducers :{
    logout:(state)=>{
        state.user=null,
        localStorage.removeItem("token")
    }
},
extraReducers:(builder) =>{
    builder
    //get current user
        .addCase(me.pending, (state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(me.fulfilled, (state, action)=>{
            state.loading=false;
            state.user = action.payload

        })
        .addCase(me.rejected, (state, action)=>{
            state.loading=false
            state.error = action.payload
        })

        // get all users
        .addCase(getAllUsers.pending, (state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(getAllUsers.fulfilled, (state, action)=>{
            state.loading=false;
            state.users = action.payload

        })
        .addCase(getAllUsers.rejected, (state, action)=>{
            state.loading=false
            state.error = action.payload
        })

        // create user
        .addCase(createUser.pending, (state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(createUser.fulfilled, (state, action)=>{
            state.loading=false
            state.user = action.payload
            state.success=true

        })
        .addCase(createUser.rejected, (state, action)=>{
            state.loading=false
            state.error = action.payload
        })


}
})

export default userSlice.reducer;
