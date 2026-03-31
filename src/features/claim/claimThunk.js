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
        console.log("Error", error.message)
        
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
export const createAllclaims =createAsyncThunk(
    'claim/createAllClaims',
    async (allClaimData, { rejectWithValue }) => {
        console.log("allClaimData", allClaimData);
    const res = await api.post("/claims/create-all",allClaimData)
      console.log("create claim success",res.data);
      return res.data
  }

)

export const validateClaim =createAsyncThunk(
    'claim/validateClaim',
    async (claimId, { rejectWithValue }) => {
      console.log("claimId",claimId);
      
        try {
            const res = await api.get(`/claims/${claimId}/valider`)
            console.log("fetch claim success",res.data);
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
export const rejectClaim =createAsyncThunk(
    'claim/rejectClaim',
    async ({claimId, rejectReason}, { rejectWithValue }) => {
        try {
            const res = await api.put(`/claims/${claimId}/rejeter`, { rejectReason })
            console.log("fetch claim success",res.data);
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

export const deleteClaim =createAsyncThunk(
    'claim/deleteClaim',
    async (claimId, { rejectWithValue }) => {
        try {
            const res = await api.delete(`/claims/${claimId}`)
            console.log("delete claim success",res.data);
            return res.data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message || "delete claim failed")
            }
        }

    }   
)
export const paidClaim = createAsyncThunk(
  'claim/paidClaim',
   async (claimId, { rejectWithValue }) => {
        try {
            const res = await api.get(`/claims/${claimId}/payer`)
            console.log("paid claim success",res.data);
            return res.data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message || "paid claim failed")
            }
        }

    }   
)