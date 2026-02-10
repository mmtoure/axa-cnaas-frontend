import { createSlice } from "@reduxjs/toolkit";
import { createPartner, getAllPartners, getPartnerById } from "./partnerThunk";

const partnerSlice = createSlice ({
    name: "partner",
    initialState: {
        loading: false,
        error: null,
        success: false,
        partner: null,
        partners: []
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
            .addCase(createPartner.pending, (state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(createPartner.fulfilled, (state, action)=>{
                state.loading=false
                state.success=true
                state.partner=action.payload
            })
            .addCase(createPartner.rejected, (state, action)=>{
                state.loading=false
                state.error=action.payload
            })

        // fetch all assurés
            .addCase(getAllPartners.pending, (state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(getAllPartners.fulfilled, (state, action)=>{
                state.loading=false
                state.partners=action.payload
            })
            .addCase(getAllPartners.rejected, (state, action)=>{
                state.loading=false
                state.error=action.payload
            })
        
               // fetch all assurés
            .addCase(getPartnerById.pending, (state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(getPartnerById.fulfilled, (state, action)=>{
                state.loading=false
                state.partner=action.payload
            })
            .addCase(getPartnerById.rejected, (state, action)=>{
                state.loading=false
                state.error=action.payload
            })
        
    }
})
export const {resetState} = partnerSlice.actions
export default partnerSlice.reducer;


