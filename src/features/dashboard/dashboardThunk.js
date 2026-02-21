import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../util/api";

export const getData = createAsyncThunk(
    'dashboard/getData',
    async (_, { rejectWithValue }) =>{
        try {
            const res = await api.get("/dashboard")
            console.log("All data dashboard success",res.data);
            return res.data

        }
       catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message || "fetch all data failed")
      }
    }
       
    }
)