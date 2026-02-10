import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../util/api";

export const createPartner = createAsyncThunk(
    'partner/createPartner',
    async( partnerData, { rejectWithValue }) => {
    try {
      const res = await api.post("/partners",partnerData)
      console.log("create insured success",res.data);
      return res.data

    }
    catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message || "create partner failed")
        }

    }

})


export const getAllPartners = createAsyncThunk(
    "partner/getAllPartners",
    async (__, {rejectWithValue}) =>{
        try {
            const res = await api.get("/partners")
            console.log("fetching partners succes", res.data);
            return res.data;
            
            
        } catch (error) {
             if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message || "fetching partner failed")
        }
            
        }

    }

    
)

export const getPartnerById = createAsyncThunk(
    "partner/getPartnerById",
    async (partnerId, {rejectWithValue}) =>{
        try {
            const res = await api.get(`/partners/${partnerId}`)
            console.log("fetching partners succes", res.data);
            return res.data;
            
            
        } catch (error) {
             if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message || "fetching partner failed")
        }
            
        }

    }

    
)

