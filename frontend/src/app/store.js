import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/user/userSlice';
import productReducer from "../features/product/productSlice";
// import customerReducer from "../features/cutomers/customerSlice";
// import productReducer from "../features/product/productSlice";
// import brandReducer from "../features/brand/brandSlice";
// import pCategoryReducer from "../features/pcategory/pcategorySlice";
// import bCategoryReducer from "../features/bcategory/bcategorySlice";
import blogReducer from "../features/blog/blogSlice";
// import colorReducer from "../features/color/colorSlice";
import contactReducer from "../features/contact/contactSlice"
// import uploadReducer from "../features/upload/uploadSlice";
// import couponReducer from "../features/coupon/couponSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    // customer: customerReducer,
    // product: productReducer,
    // brand: brandReducer,
    // pCategory: pCategoryReducer,
    // bCategory: bCategoryReducer,
    blog: blogReducer,
    // color: colorReducer,
    contact: contactReducer,
    // upload: uploadReducer,
    // coupon: couponReducer,
  },
});

