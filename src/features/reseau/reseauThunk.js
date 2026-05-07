import {createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../util/api";

export const createReseau = createAsyncThunk(
    'reseau/createReseau',
    async (reseauData, { rejectWithValue }) => {
        try {
           //create reseau 
           const res = await api.post("/reseaux", reseauData)
           console.log("create reseau success", res.data);
           return res.data  
        } catch (error) {
            return rejectWithValue(error.message || "Failed to create reseau");
        }
    }


)

//get all zones
export const getReseaux = createAsyncThunk(
    'reseau/getReseaux',
    async (_, { rejectWithValue }) => {
        try {
           //get all zones
              const res = await api.get("/reseaux")
                console.log("get zones success", res.data);
                return res.data
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch zones");
        }
    }
);
//get zone by id
export const getReseauById = createAsyncThunk(
    'reseau/getReseauById',
    async (reseauId, { rejectWithValue }) => {
        try {
           //get reseau by id
              const res = await api.get(`/reseaux/${reseauId}`)
                console.log("get reseau by id success", res.data);
                return res.data
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch reseau");
        }
    }
);

//update reseau
export const updateReseau = createAsyncThunk(
    'reseau/updateReseau',
    async ({id, ...reseauData}, { rejectWithValue }) => {
        try {
            console.log("Updating reseau with ID:", id, "and data:", reseauData);
           //update reseau
                const res = await api.put(`/reseaux/${id}`, reseauData)
                console.log("update reseau success", res.data);
                return res.data
        } catch (error) {
            return rejectWithValue(error.message || "Failed to update reseau");
        }
    }
);



//delete reseau
export const deleteReseau = createAsyncThunk(
    'reseau/deleteReseau',
    async (reseauId, { rejectWithValue }) => {
        try {
           //delete reseau
              const res = await api.delete(`/reseaux/${reseauId}`)
                console.log("delete reseau success", res.data);
                return res.data
        } catch (error) {
            return rejectWithValue(error.message || "Failed to delete reseau");
        }
    }
);

//get available networks for user

export const getAvailableNetwork = createAsyncThunk(
    'reseau/getAvailableNetwork',
    async (_, { rejectWithValue }) => {
        try {
           //get available networks for user 
                const res = await api.get("/reseaux/unassigned")
                console.log("get available networks success", res.data);
                return res.data
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch available networks");
        }
    }
);