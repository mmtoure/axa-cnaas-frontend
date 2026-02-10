import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import userReduce from '../features/user/userSlice'
import insuredReducer from '../features/insured/insuredSlice'
import groupReducer from '../features/group/groupSlice'
import contractReducer from '../features/contract/contractSlice'
import claimReducer from '../features/claim/claimSlice'
import claimDocumentReducer from '../features/claimDocument/claimDocumentSlice'
import partnerReducer from '../features/partner/partnerSlice'
import pricingReducer from '../features/partnerPricing/partnerPricingSlice'



export const store = configureStore({
    reducer:{
        //Ajouter les reducers
        auth: authReducer,
        user: userReduce,
        insured: insuredReducer,
        group: groupReducer,
        contract: contractReducer,
        claim: claimReducer,
        claimDocument: claimDocumentReducer,
        partner: partnerReducer,
        pricing: pricingReducer

        
    }
})