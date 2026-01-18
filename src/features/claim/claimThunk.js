import { createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../util/api";


export const createClaim = createAsyncThunk(
 'claim/createClaim',
  async (claimData, { rejectWithValue }) => {
    try {
      const res = await api.post("/claims",claimData)
      console.log("create claim success",res.data);
      return res.data
      
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message || "create claim failed")
      }
    }
  }
)

export const getAllclaims =createAsyncThunk(
    'claim/getAllClaims',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/claims")
            console.log("fetch all claims success",res.data);
            return res.data

            
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message || "fetch all claims failed")
            }
        }

    }

)

export const getclaimById =createAsyncThunk(
    'claim/getclaimById',
    async (contractId, { rejectWithValue }) => {
        try {
            const res = await api.get(`/claims/${contractId}`)
            console.log("fetch contract success",res.data);
            return res.data

            
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message || "fetch contract failed")
            }
        }

    }

)