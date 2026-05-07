
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../util/api';
import { tr } from 'zod/locales';


export const getRegions = createAsyncThunk(
    'region/getRegions',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/regions');
            console.log("get regions success", res.data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch regions");
        }
    }
);

//get anassigned regions network
export const getUnassignedRegions = createAsyncThunk(
    'region/getUnassignedRegions',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/regions/unassigned');
            console.log("get unassigned regions success", res.data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch unassigned regions");
        }
    }
);

//get available regions for reseau creation (unassigned + assigned to reseau but not to agence)
export const getAvailableRegions = createAsyncThunk(            
    'region/getAvailableRegions',
    async (networkId, { rejectWithValue }) => {
       
       try {
        
            const res = await api.get(`/regions/${networkId}/available`);
            console.log("get available regions success", res.data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch available regions");
        }
    }
);

export const getRegionByid = createAsyncThunk(
    'region/getRegionById',
    async (regionId,{rejectWithValue}) =>{
        try {
            const res = await api.get(`/regions/${regionId}`);
            
            console.log("region by id", res.data)
            return res.data
            
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch  regions");
        }
    }
)
