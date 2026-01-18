import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../util/api";

export const createInsured = createAsyncThunk(
 'insured/create-insured',
  async (insuredData, { rejectWithValue }) => {
    try {
      const res = await api.post("/insureds",insuredData)
      console.log("create insured success",res.data);
      return res.data
      
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message || "create user failed")
      }
    }
  }
)

export const getAllInsureds = createAsyncThunk(
    'insured/getAllInsureds',
    async (_, { rejectWithValue }) =>{
        try {
            const res = await api.get("/insureds")
            console.log("All insureds success",res.data);
            return res.data

        }
       catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message || "create user failed")
      }
    }
       
    }
)


export const getInsuredById = createAsyncThunk(
    'insured/getInsuredById',
    async (insuredId, { rejectWithValue }) =>{
      console.log("ID",insuredId);
      
        try {
            const res = await api.get(`/insureds/${insuredId}`)
            console.log("find insured by id success",res.data);
            return res.data

        }
       catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message || "create user failed")
      }
    }
       
    }
)