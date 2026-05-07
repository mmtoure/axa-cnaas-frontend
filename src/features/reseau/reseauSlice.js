import { createSlice } from "@reduxjs/toolkit";
import { createReseau, deleteReseau, getAvailableNetwork, getReseauById, getReseaux, updateReseau } from "./reseauThunk";

const reseauSlice = createSlice({
    name: "reseau",
    initialState: {
        loading: false,
        reseau: null,
        reseaux: [],
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
            // create reseau
            .addCase(createReseau.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReseau.fulfilled, (state, action) => {
                state.loading = false;
                state.reseau = action.payload;
                state.success = true;
            })
            .addCase(createReseau.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get all zones
            .addCase(getReseaux.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReseaux.fulfilled, (state, action) => {
                state.loading = false;
                state.reseaux = action.payload;
            })
            .addCase(getReseaux.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // delete reseau
            .addCase(deleteReseau.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteReseau.fulfilled, (state, action) => {
                state.loading = false;
                state.reseaux = state.reseaux.filter(reseau => reseau.id !== action.payload.id);
                
            })
            .addCase(deleteReseau.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get reseau by id
             .addCase(getReseauById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReseauById.fulfilled, (state, action) => {
                state.loading = false;
                state.reseau = action.payload;
            })
            .addCase(getReseauById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // update reseau
            .addCase(updateReseau.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateReseau.fulfilled, (state, action) => {
                state.loading = false;
                state.reseau = action.payload;
                state.success = true;
            })
            .addCase(updateReseau.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //get available networks
             .addCase(getAvailableNetwork.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAvailableNetwork.fulfilled, (state, action) => {
                state.loading = false;
                state.reseaux = action.payload;
            })
            .addCase(getAvailableNetwork.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })  



    }
});

export const { resetState } = reseauSlice.actions;
export default reseauSlice.reducer;

