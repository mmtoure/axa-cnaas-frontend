import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../util/api";

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("/create-user",userData)
      //localStorage.setItem("token", res.data.token)
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

export const me = createAsyncThunk(
  'user/me',
  async (_,{ rejectWithValue }) => {
    try {
      const res = await api.get("/me")
      console.log("ME",res.data);
      return res.data
      
    } catch (error) {
    // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message || "fetch user data failed")
      }
    }
  }
)

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_,{ rejectWithValue }) => {
    try {
      const res = await api.get("/users")
      console.log("USER DATA",res.data);
      return res.data
      
    } catch (error) {
    // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message || "fetch user data failed")
      }
    }
  }
)