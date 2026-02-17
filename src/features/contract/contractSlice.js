import { createSlice } from "@reduxjs/toolkit";
import { getAllContracts, getContractById, generateContractPdf, getContracts } from "./contractThunk";

const contractSlice = createSlice({
    name: "contract",
    initialState: {
        contracts: [],
        contract: null,
        contractPdf: null,
        loading: false,
        error: null,
        content: [],
        totalPages: 0,
        currentPage: 0,
    },
    reducers: {
        resetState: (state) => {
            state.success = false,
                state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetch all contracts
            .addCase(getAllContracts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllContracts.fulfilled, (state, action) => {
                state.loading = false
                state.contracts = action.payload
            })
            .addCase(getAllContracts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            //fetch a contract 
            .addCase(getContractById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getContractById.fulfilled, (state, action) => {
                state.loading = false
                state.contract = action.payload
            })
            .addCase(getContractById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            //generate contract pdf
            .addCase(generateContractPdf.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(generateContractPdf.fulfilled, (state, action) => {
                state.loading = false
                state.contractPdf = action.payload
            })
            .addCase(generateContractPdf.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            //contracts by page
            .addCase(getContracts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getContracts.fulfilled, (state, action) => {
                state.loading = false;
                state.content = action.payload.content;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.number;
            })
            .addCase(getContracts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


    }
}
)
export const { resetState } = contractSlice.actions

export default contractSlice.reducer;