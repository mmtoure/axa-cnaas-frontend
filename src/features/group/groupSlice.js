import { createSlice } from "@reduxjs/toolkit";
import { createGroup, getAllGroups, getGroupById } from "./groupThunk";

const groupSlice = createSlice ({
    name: "group",
    initialState: {
        loading: false,
        console: null,
        group: null,
        success: false,
        groups: []
        

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
    }


})
export const {resetState} = groupSlice.actions
export default groupSlice.reducer;


