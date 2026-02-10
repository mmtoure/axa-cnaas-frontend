import { createSlice } from "@reduxjs/toolkit";
import { createClaim, getAllclaims, getclaimById, createAllclaims } from "./claimThunk";



const claimSlice = createSlice ({
    name: "claim",
    initialState: {
        loading: false,
        error: null,
        success: false,
        currentClaim: null,
        claims: []
        

    },
    reducers:{
        resetState: (state) =>{
            state.success=false,
            state.error=null;
        },
    },
    extraReducers:(builder) =>{
        builder
        //création de sinistre

            .addCase(createClaim.pending, (state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(createClaim.fulfilled, (state, action)=>{
                state.loading=false
                state.success=true
                state.currentClaim=action.payload
            })
            .addCase(createClaim.rejected, (state, action)=>{
                state.loading=false
                state.error=action.payload
            })

        // fetch all sinistres
            .addCase(getAllclaims.pending, (state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(getAllclaims.fulfilled, (state, action)=>{
            
                state.loading=false
                state.claims=action.payload
            })
            .addCase(getAllclaims.rejected, (state, action)=>{
                state.loading=false
                state.error=action.payload
            })
        
        // fetch one claim
            .addCase(getclaimById.pending, (state)=>{
                state.loading=true
                state.error=null
                state.currentClaim=null
            })
            .addCase(getclaimById.fulfilled, (state, action)=>{
                state.loading=false
                state.currentClaim=action.payload
            })
            .addCase(getclaimById.rejected, (state, action)=>{
                state.loading=false
                state.error=action.payload
            })

            // create malti claims
            .addCase(createAllclaims.pending, (state)=>{
                state.loading=true
                state.error=null
                state.claims=null
            })
            .addCase(createAllclaims.fulfilled, (state, action)=>{
                state.loading=false
                state.success=true
                state.error=null
                state.claims=action.payload
            })
            .addCase(createAllclaims.rejected, (state, action)=>{
                state.loading=false
                state.error=action.payload
            })

    }


})
export const {resetState} = claimSlice.actions
export default claimSlice.reducer;


