import React from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux"
import { getOrders } from "../features/user/userSlice";
import { useEffect } from "react";
const Orders=()=>{
    const dispatch =useDispatch();
    const orderedstate=useSelector(state=>state?.auth?.getorderedProduct?.orders)
    console.log(orderedstate);

    useEffect(()=>{
        dispatch(getOrders())
    },[])
    return (
        <>
        <BreadCrumb title="My Orders" />
        <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
         <div className="col-12">
         <div className="row">
          <div className="col-3">
        <h5>Order Id</h5>
         </div>
         <div className="col-3">
        <h5>Total Amount</h5>
         </div>
         <div className="col-3">
         <h5>Total Amount After Discount</h5>
         </div>
         <div className="col-3">
         <h5>Status</h5>
         </div>
         </div>
         
         </div>
         <div className="col-12 mt-3">
    {
        orderedstate && orderedstate?.map((item,index)=>{
          return(
            <div 
            style={{backgroundColor:"#febd69"}}
           className="row my-3"  key={index}>
            <div className="col-3">
          <p>{item?._id}</p>
           </div>
           <div className="col-3">
           <p>{item?.totalPrice}</p>
           </div>
           <div className="col-3">
           <p>{item?.totalPriceAfterDiscount}</p>
           </div>
           <div className="col-3">
           <p>{item?.orderStatus}</p>
           </div>
           <div className="col-12">
           <div className="row p-3" style={{backgroundColor:"#232f3e"}} >
           <div className="col-3">
          <p>Product Name</p>
           </div>
           <div className="col-3">
           <p>quantity</p>
           </div>
           <div className="col-3">
           <p>Price</p>
           </div>
           <div className="col-3">
           <p>Color</p>
           </div>
   {
    item?.orderItems?.map((i,index)=>{
        return(
            <div className="col-12">
            <div className="row bg-secondary p-3">
            <div className="col-3">
           <h6>{i?.product?.title}</h6>
            </div>
            <div className="col-3">
            <h6>{i?.product?.quantity}</h6>
            </div>
            <div className="col-3">
            <h6>{i?.product?.price}</h6>
            </div>
            <div className="col-3">
            <ul className="colors ps-0">

<li style={{backgroundColor:i?.color}} key={index}></li>

</ul>
            </div>
            </div>
            </div>
        )
    })
   }
           </div>
           </div>
           </div>
          )
         
        
        })
}
         </div>
         </div>
        </Container>
        </>
    )
}

export default Orders;