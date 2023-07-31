import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";


export const registerUser=createAsyncThunk("auth/register", async(userData, thunkAPI)=>{
    try{
        return await authService.register(userData)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});
export const loginUser=createAsyncThunk("auth/login", async(userData, thunkAPI)=>{
    try{
        return await authService.login(userData);
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});
export const addProdToCart=createAsyncThunk("user/cart/add", async(cartData, thunkAPI)=>{
    try{
        return await authService.addToCart(cartData);
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});
export const getUserCart=createAsyncThunk("user/cart/get", async( thunkAPI)=>{
    try{
        return await authService.getCart()
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});

export const deleteCartProduct=createAsyncThunk("user/cart/product/delete", async(id, thunkAPI)=>{
    try{
        return await authService.removeproductFromCart(id)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});

export const updateCartProduct=createAsyncThunk("user/cart/product/update", async(cartDetail, thunkAPI)=>{
    try{
        return await authService.updateproductFromCart(cartDetail)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});

export const createAOrder=createAsyncThunk("user/cart/create-order", async(orderDetail, thunkAPI)=>{
    try{
        return await authService.creatOrder(orderDetail)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});

export const getOrders=createAsyncThunk("user/order/get", async( thunkAPI)=>{
    try{
        return await authService.getUserOrders()
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});

export const updatedAUser=createAsyncThunk("user/profile/update", async(data, thunkAPI)=>{
    try{
        return await authService.updateUser(data)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});

export const forgotPasswordToken=createAsyncThunk("password/token", async(data, thunkAPI)=>{
    try{
        return await authService.forgotPassToken(data)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});

export const getUserWishlist=createAsyncThunk("user/wishlist", async(thunkAPI)=>{
    try{
        return await authService.getWishlist()
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});
const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;



const initialState={
    user:getCustomerfromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:""
    
   
}


export const authSlice=createSlice({
    name: "auth",
    initialState: initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.isLoading=true;
        }).addCase(registerUser.fulfilled, (state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createUser=action.payload;
            if(state.isSuccess===true){
                toast.success("User Create Succefully");
            }
        }).addCase(registerUser.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
                toast.error(action.error);
            }
        })
        .addCase(getUserWishlist.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getUserWishlist.fulfilled, (state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.wishlist=action.payload;
           
        }).addCase(getUserWishlist.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
           
        })
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true;
            
    }).addCase(loginUser.fulfilled, (state, action)=>{
        state.isLoading=false;
        state.isError=false;
        state.isSuccess=true;
        state.user=action.payload;
        localStorage.setItem("token", action.payload.token)
        if(state.isSuccess===true){
            toast.success("User logged in Succefully");
        }
    }).addCase(loginUser.rejected,(state, action)=>{
        state.isLoading=false;
        state.isError=true;
        state.isSuccess=false;
        state.message=action.error;
        if(state.isError===true){
            toast.info("invalid creadential");
        }
    })
    .addCase(addProdToCart.pending,(state)=>{
        state.isLoading=true;
    }).addCase(addProdToCart.fulfilled, (state, action)=>{
        state.isLoading=false;
        state.isError=false;
        state.isSuccess=true;
        state.cartProduct=action.payload;
        if(state.isSuccess){
            toast.success("Add to Cart Product Successfully");
        }
    }).addCase(addProdToCart.rejected,(state, action)=>{
        state.isLoading=false;
        state.isError=true;
        state.isSuccess=false;
        state.message=action.error;
        if(state.isError){
            toast.error("Failed to Add Cart");
        }
       
    })

    .addCase(getUserCart.pending,(state)=>{
        state.isLoading=true;
       
    }).addCase(getUserCart.fulfilled, (state, action)=>{
        state.isLoading=false;
        state.isError=false;
        state.isSuccess=true;
        state.cartProducts=action.payload;
        
       
    }).addCase(getUserCart.rejected,(state, action)=>{
        state.isLoading=false;
        state.isError=true;
        state.isSuccess=false;
        state.message=action.error;
       
    })
    .addCase(updateCartProduct.pending,(state)=>{
        state.isLoading=true;
       
    }).addCase(updateCartProduct.fulfilled, (state, action)=>{
        state.isLoading=false;
        state.isError=false;
        state.isSuccess=true;
        state.updatedCartProduct=action.payload;
        if(state.isSuccess===true){
            toast.success("Product succufully update");
        }
        
       
    }).addCase(updateCartProduct.rejected,(state, action)=>{
        state.isLoading=false;
        state.isError=true;
        state.isSuccess=false;
        state.message=action.error;
        if(state.isError===true){
            toast.error("something went wrong");
        }
       
    })

    .addCase(deleteCartProduct.pending,(state)=>{
        state.isLoading=true;
       
    }).addCase(deleteCartProduct.fulfilled, (state, action)=>{
        state.isLoading=false;
        state.isError=false;
        state.isSuccess=true;
        state.deletedCartProduct=action.payload;
        if(state.isSuccess===true){
            toast.success("Product succufully delete from cart");
        } 
    }).addCase(deleteCartProduct.rejected,(state, action)=>{
        state.isLoading=false;
        state.isError=true;
        state.isSuccess=false;
        state.message=action.error;
        if(state.isSuccess===true){
            toast.error("something went wrong");
        }
    })
    .addCase(createAOrder.pending,(state)=>{
        state.isLoading=true;
    }).addCase(createAOrder.fulfilled, (state, action)=>{
        state.isLoading=false;
        state.isError=false;
        state.isSuccess=true;
        state.orderedProduct=action.payload;
        if(state.isSuccess===true){
            toast.success("order created Succefully");
        }
    }).addCase(createAOrder.rejected,(state, action)=>{
        state.isLoading=false;
        state.isError=true;
        state.isSuccess=false;
        state.message=action.error;
        if(state.isError===true){
            toast.error("something went wrong");
        }
    })

    .addCase(getOrders.pending,(state)=>{
        state.isLoading=true;
    }).addCase(getOrders.fulfilled, (state, action)=>{
        state.isLoading=false;
        state.isError=false;
        state.isSuccess=true;
        state.getorderedProduct=action.payload;
        
    }).addCase(getOrders.rejected,(state, action)=>{
        state.isLoading=false;
        state.isError=true;
        state.isSuccess=false;
        state.message=action.error;
        if(state.isError===true){
            toast.error("something went wrong");
        }
    })

    .addCase(updatedAUser.pending,(state)=>{
        state.isLoading=true;
    }).addCase(updatedAUser.fulfilled, (state, action)=>{
        state.isLoading=false;
        state.isError=false;
        state.isSuccess=true;
        state.updatedUser=action.payload;
        if(state.isSuccess===true){
            toast.success("User Update Succefully");
        }
        
    }).addCase(updatedAUser.rejected,(state, action)=>{
        state.isLoading=false;
        state.isError=true;
        state.isSuccess=false;
        state.message=action.error;
        if(state.isError===true){
            toast.error("something went wrong");
        }
    })
    .addCase(forgotPasswordToken.pending,(state)=>{
        state.isLoading=true;
    }).addCase(forgotPasswordToken.fulfilled, (state, action)=>{
        state.isLoading=false;
        state.isError=false;
        state.isSuccess=true;
        state.token=action.payload;
        if(state.isSuccess===true){
            toast.success("forgot password Email sent Succefully");
        }
        
    }).addCase(forgotPasswordToken.rejected,(state, action)=>{
        state.isLoading=false;
        state.isError=true;
        state.isSuccess=false;
        state.message=action.error;
        if(state.isError===true){
            toast.error("something went wrong");
        }
    })
    
    }

})
export default authSlice.reducer;