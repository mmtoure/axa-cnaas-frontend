import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../util/api";

export const createPricing = createAsyncThunk(
 'pricing/createPricing',
  async (pricingData, { rejectWithValue }) => {
    try {
      const res = await api.post("/pricings",pricingData)
      console.log("create pricing success",res.data);
      return res.data
      
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message || "create pricing failed")
      }
    }
  }
)

export const getPricingsByPartner = createAsyncThunk(
    'pricing/getPricingsByPartner',
    async (partnerId, { rejectWithValue }) =>{
        try {
            const res = await api.get(`/partners`)
            console.log("All pricings success",res.data);
            return res.data

        }
       catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message || "create pricings failed")
      }
    }
       
    }
)