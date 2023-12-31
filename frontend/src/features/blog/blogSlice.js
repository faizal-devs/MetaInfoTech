import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { blogService } from "./blogService";

export const getAllBlogs=createAsyncThunk("blogs/get", async(thunkAPI)=>{
    try{
        return await blogService.getBlogs();

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const getABlog=createAsyncThunk("blog/get", async(id, thunkAPI)=>{
    try{
        return await blogService.getBlog(id);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

const blogState={
    blog: "",
    isError: "",
    isSuccess:'',
    isLoading: "",
    message: "",
    blogs:""
};

export const blogSlice=createSlice({
    name: "blog",
    initialState: blogState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(getAllBlogs.pending, (state)=>{
            state.isLoading=true;
        })
        .addCase(getAllBlogs.fulfilled, (state, action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.blog=action.payload
        })
        .addCase(getAllBlogs.rejected, (state, action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error
        })

        .addCase(getABlog.pending, (state)=>{
            state.isLoading=true;
        })
        .addCase(getABlog.fulfilled, (state, action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.blogs=action.payload
        })
        .addCase(getABlog.rejected, (state, action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error
        });
    },
});
export default blogSlice.reducer;