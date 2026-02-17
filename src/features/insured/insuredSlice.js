import { createSlice } from "@reduxjs/toolkit";
import { createInsured, getAllInsureds, getInsuredById, generateContractByInsured, getInsureds } from "./insuredThunk";


const insuredSlice = createSlice ({
    name: "insured",
    initialState: {
        loading: false,
        error: null,
        success: false,
        currentInsured: null,
        generateContract: null,
        insureds: [],
          content: [],
        totalPages: 0,
        currentPage: 0,
        

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
        // generate contract pdf
            .addCase(generateContractByInsured.pending, (state)=>{
                state.loading=true  
                state.error=null
                state.generateContract=null
            })
            .addCase(generateContractByInsured.fulfilled, (state, action)=>{
                state.loading=false
                state.generateContract=action.payload
            })
            .addCase(generateContractByInsured.rejected, (state, action)=>{
                state.loading=false
                state.error=action.payload
            })

             //contracts by page
                        .addCase(getInsureds.pending, (state) => {
                            state.loading = true
                            state.error = null
                        })
                        .addCase(getInsureds.fulfilled, (state, action) => {
                            state.loading = false;
                            state.content = action.payload.content;
                            state.totalPages = action.payload.totalPages;
                            state.currentPage = action.payload.number;
                        })
                        .addCase(getInsureds.rejected, (state, action) => {
                            state.loading = false
                            state.error = action.payload
                        })
            
    }
})
export const {resetState} = insuredSlice.actions
export default insuredSlice.reducer;


