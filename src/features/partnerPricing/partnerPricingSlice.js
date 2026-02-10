import { createSlice } from "@reduxjs/toolkit";
import { createPricing, getPricingsByPartner} from "./partnerPricingThunk";


const pricingSlice = createSlice ({
    name: "pricing",
    initialState: {
        loading: false,
        error: null,
        success: false,
        pricing: null,
        pricings: []
        

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

            .addCase(createPricing.pending, (state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(createPricing.fulfilled, (state, action)=>{
                state.loading=false
                state.success=true
                state.pricing=action.payload
            })
            .addCase(createPricing.rejected, (state, action)=>{
                state.loading=false
                state.error=action.payload
            })

        // fetch all assurés
            .addCase(getPricingsByPartner.pending, (state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(getPricingsByPartner.fulfilled, (state, action)=>{
                state.loading=false
                state.pricings=action.payload
            })
            .addCase(getPricingsByPartner.rejected, (state, action)=>{
                state.loading=false
                state.error=action.payload
            })
        
   
    }
})
export const {resetState} = pricingSlice.actions
export default pricingSlice.reducer;


