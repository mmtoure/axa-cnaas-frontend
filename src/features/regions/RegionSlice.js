import { createSlice } from "@reduxjs/toolkit";
import { getRegions, getUnassignedRegions,getAvailableRegions, getRegionByid } from "./RegionThunk";

const regionSlice = createSlice({
    name: "region",
    initialState: {
        regions: [],
        loading: false,
        error: null
    },
    reducers:{
        resetState: (state) =>{
            state.success=false,
            state.error=null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRegions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRegions.fulfilled, (state, action) => {
                state.loading = false;
                state.regions = action.payload;
            })
            .addCase(getRegions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(getUnassignedRegions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUnassignedRegions.fulfilled, (state, action) => {
                state.loading = false;
                state.regions = action.payload;
            })
            .addCase(getUnassignedRegions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(getAvailableRegions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAvailableRegions.fulfilled, (state, action) => {
                state.loading = false;
                state.regions = action.payload;
            })
            .addCase(getAvailableRegions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            });
              builder
            .addCase(getRegionByid.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRegionByid.fulfilled, (state, action) => {
                state.loading = false;
                state.region = action.payload;
            })
            .addCase(getRegionByid.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            });
                
          
    }
    
});
export const { resetState } = regionSlice.actions;
export default regionSlice.reducer;
