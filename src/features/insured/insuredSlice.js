import { createSlice } from "@reduxjs/toolkit";
import { createInsured, getAllInsureds, getInsuredById } from "./insuredThunk";


const insuredSlice = createSlice ({
    name: "insured",
    initialState: {
        loading: false,
        error: null,
        success: false,
        currentInsured: null,
        insureds: []
        

    },
    reducers:{
        resetState: (state) =>{
            state.success=false,
            state.error=null;
        },
    },
    extraReducers:(builder) =>{
        builder
        //création d'assuré

            .addCase(createInsured.pending, (state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(createInsured.fulfilled, (state, action)=>{
                state.loading=false
                state.success=true
                state.currentInsured=action.payload
            })
            .addCase(createInsured.rejected, (state, action)=>{
                state.loading=false
                state.error=action.payload
            })

        // fetch all assurés
            .addCase(getAllInsureds.pending, (state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(getAllInsureds.fulfilled, (state, action)=>{
                state.loading=false
                state.insureds=action.payload
            })
            .addCase(getAllInsureds.rejected, (state, action)=>{
                state.loading=false
                state.error=action.payload
            })
        
        // fetch one Insured
            .addCase(getInsuredById.pending, (state)=>{
                state.loading=true
                state.error=null
                state.currentInsured=null
            })
            .addCase(getInsuredById.fulfilled, (state, action)=>{
                state.loading=false
                state.currentInsured=action.payload
            })
            .addCase(getInsuredById.rejected, (state, action)=>{
                state.loading=false
                state.error=action.payload
            })

    }


})
export const {resetState} = insuredSlice.actions
export default insuredSlice.reducer;


