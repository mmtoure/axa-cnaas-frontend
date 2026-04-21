import {createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../util/api";

export const createAgence = createAsyncThunk(
    'agence/createAgence',
    async (agenceData, { rejectWithValue }) => {
        try {
           //create agence 
           const res = await api.post("/agences", agenceData)
           console.log("create agence success", res.data);
           return res.data  
        } catch (error) {
            return rejectWithValue(error.message || "Failed to create agence");
        }
    }
)

//get all agences
export const getAgences = createAsyncThunk(
    'agence/getAgences',
    async (_, { rejectWithValue }) => {
        try {
           //get all agences
              const res = await api.get("/agences")
                console.log("get agences success", res.data);
                return res.data
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch agences");
        }
    }
);

//delete agence
export const deleteAgence = createAsyncThunk(
    'agence/deleteAgence',
    async (agenceId, { rejectWithValue }) => {
        try {
           //delete agence
              const res = await api.delete(`/agences/${agenceId}`)
                console.log("delete agence success", res.data);
                return res.data
        } catch (error) {
            return rejectWithValue(error.message || "Failed to delete agence");
        }
    }
);

//get agence by id
export const getAgenceById = createAsyncThunk(
    'agence/getAgenceById',
    async (agenceId, { rejectWithValue }) => {
        try {
           //get agence by id
                const res = await api.get(`/agences/${agenceId}`)
                console.log("get agence by id success", res.data);
                return res.data
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch agence");
        }
});

//get agence by zone id
export const getAgenceByZoneId = createAsyncThunk(
    'agence/getAgenceByZoneId',
    async (zoneId, { rejectWithValue }) => {
        try {
           //get agence by zone id
                const res = await api.get(`/agences/zone/${zoneId}`)
                console.log("get agence by zone id success", res.data);
                return res.data
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch agence by zone id");
        }   
});

//update agence
export const updateAgence = createAsyncThunk(
    'agence/updateAgence',
    async ({id, ...agenceData}, { rejectWithValue }) => {
        console.log("Updating agence with ID:", id, "and data:", agenceData);
        try {
            console.log("Updating agence with ID:", id, "and data:", agenceData);
              //update agence
                const res = await api.put(`/agences/${id}`, agenceData)
                console.log("update agence success", res.data);
                return res.data
        } catch (error) {
            return rejectWithValue(error.message || "Failed to update agence");
        }
    }
);
