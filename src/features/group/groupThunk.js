import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../util/api";

export const createGroup = createAsyncThunk(
 'group/createGroup',
  async (groupData, { rejectWithValue }) => {
    try {
      const res = await api.post("/uploadExcel",groupData)
      console.log("create group success",res.data);
      return res.data
      
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message || "create group failed")
      }
    }
  }
)

export const getAllGroups = createAsyncThunk(
    'group/getAllGroups',
    async (_, { rejectWithValue }) =>{
        try {
            const res = await api.get("/groups")
            console.log("All groups success",res.data);
            return res.data

        }
       catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message || "fetch all groups failed")
      }
    }
       
    }
)


export const getGroupById = createAsyncThunk(
    'group/getGroupdById',
    async (groupId, { rejectWithValue }) =>{
        try {
            const res = await api.get(`/groups/${groupId}`)
            console.log("find group by id success",res.data);
            return res.data

        }
       catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message || "fetch group by idfailed")
      }
    }
       
    }
)