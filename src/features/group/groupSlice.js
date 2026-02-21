import { createSlice } from "@reduxjs/toolkit";
import { createGroup, getAllGroups, getGroupById, generateContractByGroup, getGroups } from "./groupThunk";

const groupSlice = createSlice ({
    name: "group",
    initialState: {
        loading: false,
        console: null,
        group: null,
        generateContract: null,
        success: false,
        groups: [],
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

        //Create group
            .addCase(createGroup.pending, (state)=>{
                state.success=false
                state.loading=true
                state.error=null
            })
            .addCase(createGroup.fulfilled, (state, action)=>{
                state.success=true,
                state.loading=false
                state.insured=action.payload
            })
            .addCase(createGroup.rejected, (state, action)=>{
                state.success=false
                state.loading=false
                state.error=action.payload
            })

        // fetch all assurés
            .addCase(getAllGroups.pending, (state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(getAllGroups.fulfilled, (state, action)=>{
                state.loading=false
                state.groups=action.payload
            })
            .addCase(getAllGroups.rejected, (state, action)=>{
                state.loading=false
                state.error=action.payload
            })

        // fetch one group
        .addCase(getGroupById.pending, (state)=>{
                state.loading=true
                state.error=null
        })
        .addCase(getGroupById.fulfilled, (state, action)=>{
                state.loading=false
                state.group=action.payload
        })
        .addCase(getGroupById.rejected, (state, action)=>{
                state.loading=false
                state.error=action.payload
        })
        // generate contract pdf
        .addCase(generateContractByGroup.pending, (state)=>{
                state.loading=true  
                state.error=null
                state.generateContract=null
            })
            .addCase(generateContractByGroup.fulfilled, (state, action)=>{
                state.loading=false
                state.generateContract=action.payload
            })
            .addCase(generateContractByGroup.rejected, (state, action)=>{
                state.loading=false
                state.error=action.payload
            })
         //contracts by page
            .addCase(getGroups.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getGroups.fulfilled, (state, action) => {
                state.loading = false;
                state.content = action.payload.content;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.number;
            })
            .addCase(getGroups.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }


})
export const {resetState} = groupSlice.actions
export default groupSlice.reducer;


