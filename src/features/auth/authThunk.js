import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../util/api";

export const createUser = createAsyncThunk(
  'auth/create-user',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("/create-user",userData)
      console.log("create user success",res.data);
      return res.data
      
    } catch (error) {
    // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message || "create user failed")
      }
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({email, password}, { rejectWithValue }) => {
    
    
    try {
      const res = await api.post("/login",{email, password})
      console.log("login success",res.data);
       localStorage.setItem("token", res.data.token);
      return res.data
      
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data?.message || "Erreur de connexion",
          code: error.response.data?.code,
        });
      }

      // Network / server down
      return rejectWithValue({
        status: 500,
        message: "Impossible de contacter le serveur",
      });
    }
  }

)