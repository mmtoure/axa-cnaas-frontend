import { createSlice } from "@reduxjs/toolkit";
import { getDocumentClaimById } from "./claimDocumentThunk";
const claimDocumentSlice = createSlice({
    name: "claimDocument",
    initialState: {
        loading: false,
        error: null,
        success: false,
        claimDocument: null,
    },
    reducers:{
        resetState: (state) =>{
            state.success=false,
            state.loading=false,
            state.error=null
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(getDocumentClaimById.pending, (state)=>{
            state.loading=true,
            state.success=false,
            state.error=null,
            state.claimDocument=null
        })
        .addCase(getDocumentClaimById.fulfilled, (state,action)=>{
            state.loading=false,
            state.success=true,
            state.error=null,
            state.claimDocument=action.payload
        })
        .addCase(getDocumentClaimById.rejected, (state, action)=>{
            state.loading=false,
            state.success=false,
            state.claimDocument=null,
            state.error=action.payload
        })

    }
})
export const {resetState} = claimDocumentSlice.actions
export default claimDocumentSlice.reducer;
