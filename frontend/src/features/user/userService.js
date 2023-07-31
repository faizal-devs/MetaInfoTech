import axios from "axios";
import { base_url, config } from "../../utills/axiosConfig";

const register=async(userData)=>{
    const response=await axios.post(`${base_url}user/register`, userData);
    if(response.data){
        if (response.data) {
            localStorage.setItem("customer", JSON.stringify(response.data));
          }
        return response.data
    }
};
const login=async(userData)=>{
    const response=await axios.post(`${base_url}user/login`, userData);
    if(response.data){
        return response.data
    }
};
const getWishlist=async()=>{
    const response=await axios.get(`${base_url}user/wishlist`, config);
    if(response.data){
        return response.data
    }
};

const addToCart=async(cartData)=>{
    const response=await axios.post(`${base_url}user/cart`,cartData, config);
    if(response.data){
        return response.data
    }
};
const getCart=async()=>{
    const response=await axios.get(`${base_url}user/cart`, config);
    if(response.data){
        return response.data
    }
};
const removeproductFromCart=async(cartItemId)=>{
    const response=await axios.delete(`${base_url}user/delete-product-cart/${cartItemId}`, config);
    if(response.data){
        return response.data
    }
};

const updateproductFromCart=async(cartDetail)=>{
    const response=await axios.post(`${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`, null, config);
    if(response.data){
        return response.data
        
    }
};
const creatOrder=async(orderDetail)=>{
    const response=await axios.post(`${base_url}user/cart/create-order`, orderDetail, config);
    if(response.data){
        return response.data
        
    }
};
const getUserOrders=async()=>{
    const response=await axios.get(`${base_url}user/getorders`, config);
    if(response.data){
        return response.data
        
    }
};
const updateUser=async(data)=>{
    const response=await axios.put(`${base_url}user/edit-user`,data, config);
    if(response.data){
        return response.data
        
    }
};
const forgotPassToken=async(data)=>{
    const response=await axios.post(`${base_url}forgot-password-token`,data);
    if(response.data){
        return response.data
        
    }
};

export const authService={
    register,
    login,
    getWishlist,
    addToCart,
    getCart,
    removeproductFromCart,
    updateproductFromCart,
    creatOrder,
    getUserOrders,
    updateUser,
    forgotPassToken,
    
}