import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contactService } from "./contactService";
import { toast } from "react-toastify";

export const createQuery=createAsyncThunk("contact/get", async(contactData, thunkAPI)=>{
    try{
        return await contactService.postQuery(contactData);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});


const contactState={
    contact: "",
    isError: "",
    isSuccess:'',
    isLoading: "",
    message: "",
};

export const contactSlice=createSlice({
    name: "contact",
    initialState: contactState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(createQuery.pending, (state)=>{
            state.isLoading=true;
        })
        .addCase(createQuery.fulfilled, (state, action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.contact=action.payload
            if(state.isSuccess===true){
                toast.success("Query submitted successfully")
            }
        })
        .addCase(createQuery.rejected, (state, action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error
            if(state.isError===true){
                toast.success("something went wrong")
            }
        })
    },
});
export default contactSlice.reducer;