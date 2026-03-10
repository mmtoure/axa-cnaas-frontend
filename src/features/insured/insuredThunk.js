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
export const deleteInsured = createAsyncThunk(
    'insured/deleteInsured',
    async (insuredId, { rejectWithValue }) =>{
      console.log("ID",insuredId);
      
        try {
            const res = await api.delete(`/insureds/${insuredId}`)
            console.log("delete insured success",res.data);
            return { id: insuredId };

        }
       catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message || "delete insured failed")
      }
    }
       
  }
)

export const generateContractByInsured = createAsyncThunk(
    'insured/generateContract',
    async (insuredId, { rejectWithValue }) =>{
        try {
            const res = await api.get(`/insureds/${insuredId}/pdf`,{
              responseType: "blob",
            })
            console.log("contract generate success",res.data);
            return res.data

        }
       catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message || "generate contract failed")
      }
    }
       
  }
)

export const getInsureds = createAsyncThunk(
    "insured/getInsureds",  

    async ({ page = 0, size = 10 }, { rejectWithValue }) => {
        try {
            const res = await api.get(
                `insureds?page=${page}&size=${size}`
            );
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Erreur pagination"
            );
        }
    }
);

export const fetchInsureds = createAsyncThunk(
  "insureds/fetchInsureds",
  async (filters) => {
    console.log("Filters in thunk:", filters);
    const response = await api.get("/insureds/filter", { params: filters });
    console.log(response);
    
    return response.data;
  }
);

export const exportInsuredsExcel = createAsyncThunk(
  "insureds/exportExcel",
  async (filters) => {

    const response = await api.get("/insureds/export", {
      params: filters,
      responseType: "blob"
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "assures.xlsx");

    document.body.appendChild(link);

    link.click();
  }
);
