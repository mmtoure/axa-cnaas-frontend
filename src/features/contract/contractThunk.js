import { createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../util/api";

export const getAllContracts =createAsyncThunk(
    'contract/getAllContracts',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/contracts")
            console.log("fetch all contracts success",res.data);
            return res.data

            
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message || "fetch all contracts failed")
            }
        }

    }

)

export const getContractById =createAsyncThunk(
    'contract/getContractById',
    async (contractId, { rejectWithValue }) => {
        try {
            const res = await api.get(`/contracts/${contractId}`)
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