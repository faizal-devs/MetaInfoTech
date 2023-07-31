import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";
import { toast } from "react-toastify";



export const getAllProducts=createAsyncThunk("product/getAproduct", async(data, thunkAPI)=>{
    try{
        return await productService.getProducts(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});
export const addtoWishlists=createAsyncThunk("product/wishlist", async(prodId, thunkAPI)=>{
    try{
        return await productService.addToWishlist(prodId);
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});
export const getAProduct=createAsyncThunk("product/get", async(id, thunkAPI)=>{
    try{
        return await productService.getSingleProduct(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});

export const addRating=createAsyncThunk("product/rating", async(data, thunkAPI)=>{
    try{
        return await productService.rateProduct(data)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});
const productState={
    product:"",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:"",
    addToWish: "",
    singleproduct:""
}

export const productSlice=createSlice({
    name: "product",
    initialState: productState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllProducts.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllProducts.fulfilled, (state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.product=action.payload;
           
        }).addCase(getAllProducts.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
           
        })
        .addCase(addtoWishlists.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addtoWishlists.fulfilled, (state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.addToWish=action.payload;
            if(state.isSuccess){
                toast.success("Product add Wishlist Successfully")
            }
        }).addCase(addtoWishlists.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError){
                toast.error("sometihng went wrong")
            }
           
        })
        .addCase(getAProduct.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAProduct.fulfilled, (state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.singleproduct=action.payload;
            state.message="product fatch succussfully"
           
        }).addCase(getAProduct.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
           
        })
        .addCase(addRating.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addRating.fulfilled, (state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.rating=action.payload;
            if(state.isSuccess){
                toast.success("Add Rating Successfully")
            }
           
        }).addCase(addRating.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isSuccess==true){
                toast.success("something went wrong")
            }
        })
    }

})
export default productSlice.reducer;