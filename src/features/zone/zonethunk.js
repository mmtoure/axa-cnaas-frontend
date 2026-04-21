import {createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../util/api";

export const createZone = createAsyncThunk(
    'zone/createZone',
    async (zoneData, { rejectWithValue }) => {
        try {
           //create zone 
           const res = await api.post("/zones", zoneData)
           console.log("create zone success", res.data);
           return res.data  
        } catch (error) {
            return rejectWithValue(error.message || "Failed to create zone");
        }
    }


)

//get all zones
export const getZones = createAsyncThunk(
    'zone/getZones',
    async (_, { rejectWithValue }) => {
        try {
           //get all zones
              const res = await api.get("/zones")
                console.log("get zones success", res.data);
                return res.data
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch zones");
        }
    }
);
//get zone by id
export const getZoneById = createAsyncThunk(
    'zone/getZoneById',
    async (zoneId, { rejectWithValue }) => {
        try {
           //get zone by id
              const res = await api.get(`/zones/${zoneId}`)
                console.log("get zone by id success", res.data);
                return res.data
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch zone");
        }
    }
);

//update zone
export const updateZone = createAsyncThunk(
    'zone/updateZone',
    async ({id, ...zoneData}, { rejectWithValue }) => {
        console.log("Updating zone with ID:", id, "and data:", zoneData);
        try {
            console.log("Updating zone with ID:", id, "and data:", zoneData);
           //update zone
                const res = await api.put(`/zones/${id}`, zoneData)
                console.log("update zone success", res.data);
                return res.data
        } catch (error) {
            return rejectWithValue(error.message || "Failed to update zone");
        }
    }
);



//delete zone
export const deleteZone = createAsyncThunk(
    'zone/deleteZone',
    async (zoneId, { rejectWithValue }) => {
        try {
           //delete zone
              const res = await api.delete(`/zones/${zoneId}`)
                console.log("delete zone success", res.data);
                return res.data
        } catch (error) {
            return rejectWithValue(error.message || "Failed to delete zone");
        }
    }
);