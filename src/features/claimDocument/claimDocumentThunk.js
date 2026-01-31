import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../util/api";

export const getDocumentClaimById = createAsyncThunk (
    'claimDocument/getDocumentClaimId',
    async (claimDocumentId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.get(`/api/files/claims/${claimDocumentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
            console.log("Document", res.blob());
            return await res.blob()

        }
        catch (error) {

        return rejectWithValue(error.message || "get claimDocument failed")
      
    }
    }

)