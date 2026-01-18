import { createSlice } from "@reduxjs/toolkit";
import { getAllContracts, getContractById } from "./contractThunk";

const contractSlice = createSlice({
    name: "contract",
    initialState: {
        contracts: [],
        contract: null,
        loading: false,
        error: null
    },
    reducers:{
         resetState: (state) =>{
            state.success=false,
            state.error=null;
        },
    },
    extraReducers: (builder) =>{
        builder
            // fetch all contracts
                .addCase(getAllContracts.pending, (state)=>{
                    state.loading=true
                    state.error=null
                })
                .addCase(getAllContracts.fulfilled, (state, action)=>{
                    state.loading=false
                    state.contracts=action.payload
                })
                .addCase(getAllContracts.rejected, (state, action)=>{
                    state.loading=false
                    state.error=action.payload
                })
                
            //fetch a contract 
                .addCase(getContractById.pending, (state)=>{
                        state.loading=true
                        state.error=null
                })
                .addCase(getContractById.fulfilled, (state, action)=>{
                        state.loading=false
                        state.contract=action.payload
                })
                .addCase(getContractById.rejected, (state, action)=>{
                        state.loading=false
                        state.error=action.payload
                })
            
                    
            }
        }
    )
export const {resetState} = contractSlice.actions

 export default contractSlice.reducer;