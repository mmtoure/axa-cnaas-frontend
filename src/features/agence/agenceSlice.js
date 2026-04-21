import { createSlice } from "@reduxjs/toolkit";
import { createAgence, deleteAgence, getAgenceById, getAgenceByZoneId, getAgences, updateAgence } from "./agenceThunk";

const agenceSlice = createSlice({
    name: "agence",
    initialState: {
        loading: false,
        agence: null,
        agences: [],
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
            // create agence
            .addCase(createAgence.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAgence.fulfilled, (state, action) => {
                state.loading = false;
                state.agence = action.payload;
                state.success = true;
            })
            .addCase(createAgence.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get all agences
            .addCase(getAgences.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAgences.fulfilled, (state, action) => {
                state.loading = false;
                state.agences = action.payload;
            })
            .addCase(getAgences.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // delete agence
            .addCase(deleteAgence.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAgence.fulfilled, (state, action) => {
                state.loading = false;
                state.agences = state.agences.filter(agence => agence.id !== action.payload.id);
            })
            .addCase(deleteAgence.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get agence by id
            .addCase(getAgenceById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAgenceById.fulfilled, (state, action) => {
                state.loading = false;
                state.agence = action.payload;
            })
            .addCase(getAgenceById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get agence by zone id
            .addCase(getAgenceByZoneId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAgenceByZoneId.fulfilled, (state, action) => {
                state.loading = false;
                state.agences = action.payload;
            })
            .addCase(getAgenceByZoneId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // update agence
            .addCase(updateAgence.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAgence.fulfilled, (state, action) => {
                state.loading = false;
                state.agence = action.payload;
                state.success = true;
            })
            .addCase(updateAgence.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        

    }
});

export const { resetState } = agenceSlice.actions;
export default agenceSlice.reducer;

