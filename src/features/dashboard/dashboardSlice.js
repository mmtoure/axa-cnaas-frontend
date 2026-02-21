import { createSlice } from "@reduxjs/toolkit";
import { getData } from "./dashboardThunk";

const dashboardSlice = createSlice ({
    name: "dashboard",
    initialState: {
        loading: false, 
        success: false,
        data: null,
    },
    reducers:{
        resetState: (state) =>{
            state.success=false,
            state.error=null;
        },
    },
    extraReducers:(builder) =>{
        builder
        // fetch all assurés
        .addCase(getData.pending, (state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(getData.fulfilled, (state, action)=>{
            state.loading=false
            state.data=action.payload
        })
        .addCase(getData.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload
        })

    }
})
export const {resetState} = dashboardSlice.actions
export default dashboardSlice.reducer;