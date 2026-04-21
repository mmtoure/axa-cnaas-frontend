import { createSlice } from "@reduxjs/toolkit";
import { createZone, deleteZone, getZoneById, getZones, updateZone } from "./zonethunk";

const zoneSlice = createSlice({
    name: "zone",
    initialState: {
        loading: false,
        zone: null,
        zones: [],
        error: null,
        success: false,
    },
    reducers:{
        resetState: (state) =>{
            state.success=false,
            state.error=null;
        },
    },

    extraReducers: (builder) => {
        builder
            // create zone
            .addCase(createZone.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createZone.fulfilled, (state, action) => {
                state.loading = false;
                state.zone = action.payload;
                state.success = true;
            })
            .addCase(createZone.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get all zones
            .addCase(getZones.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getZones.fulfilled, (state, action) => {
                state.loading = false;
                state.zones = action.payload;
            })
            .addCase(getZones.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // delete zone
            .addCase(deleteZone.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteZone.fulfilled, (state, action) => {
                state.loading = false;
                state.zones = state.zones.filter(zone => zone.id !== action.payload.id);
                
            })
            .addCase(deleteZone.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get zone by id
             .addCase(getZoneById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getZoneById.fulfilled, (state, action) => {
                state.loading = false;
                state.zone = action.payload;
            })
            .addCase(getZoneById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // update zone
            .addCase(updateZone.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateZone.fulfilled, (state, action) => {
                state.loading = false;
                state.zone = action.payload;
                state.success = true;
            })
            .addCase(updateZone.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



    }
});

export const { resetState } = zoneSlice.actions;
export default zoneSlice.reducer;

