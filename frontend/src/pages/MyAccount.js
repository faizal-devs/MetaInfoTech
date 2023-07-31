import React from 'react'
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux"
import {  useLocation, useNavigate } from "react-router-dom";
import { getOrders } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { updatedAUser } from '../features/user/userSlice';
import { AiFillEdit } from 'react-icons/ai';

const profileSchema = yup.object({
    firstname: yup.string().required("firstName is Required"),
    lastname: yup.string().required("lastName is Required"),
    email: yup.string().nullable().email('Invalid email').required("gmail is required"),
    mobile: yup.number().required("mobile no. is Required")
  });
const MyAccount = () => {
    const userState=useSelector(state=> state?.auth?.user)   
    const [edit, setEdit]= useState(true)
    console.log(userState);
     const navigate=useNavigate()
    const dispatch =useDispatch();
    const formik =useFormik({
        enableReinitialize:true,
      initialValues:{
        firstname:userState?.firstname,
        lastname:userState?.lastname,
        email:userState?.email,
        mobile:userState?.mobile
      },
      validationSchema: profileSchema,
      onSubmit:(values)=>{
        dispatch(updatedAUser(values));
        setEdit(true)
      
      },
    });
  return (
    <>
      <BreadCrumb title="My Account"/>
      <Container class1='cart-wrapper home-wrapper-2 py-5'>
  <div className='row'>
  <div className='col-12'>
    <div className="d-flex justify-content-between align-items-center">
        <h3 className='my-3'>Update Account</h3>
        <AiFillEdit className='fs-3' onClick={()=>setEdit(false)} />
    </div>
      <form
        action=""
        onSubmit={formik.handleSubmit}
        className="d-flex flex-column gap-15"
      >
      <div className="mb-3">
    <label htmlFor="example1"
     className="form-control">First Name</label>
    <input type="text" 
    name='firstname'
    disabled={edit}
    className="form-control" 
    id="example1"
    value={formik.values.firstname}
    onChange={formik.handleChange("firstname")}
    onBlur={formik.handleBlur("firstname")}
    />
      <div className="error">
     {formik.touched.firstname && formik.errors.firstname}
                 </div>
  </div>
  <div className="mb-3">
    <label htmlFor="example2" className="form-control">Last Name</label>
    <input type="text" 
    name='lastname'
    disabled={edit}
    className="form-control" 
    id="example2" 
    value={formik.values.lastname}
    onChange={formik.handleChange("lastname")}
    onBlur={formik.handleBlur("lastname")}
    />
  </div>
  <div className="error">
   {formik.touched.lastname && formik.errors.lastname}
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email"
    disabled={edit} name='email' className="form-control" 
    id="exampleInputEmail1" 
    aria-describedby="emailHelp" placeholder="" 
    value={formik.values.email}
    onChange={formik.handleChange("email")}
    onBlur={formik.handleBlur("email")}
    />
     <div className="error">
     {formik.touched.email && formik.errors.email}
     </div>
    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputmobile">Mobile Number</label>
    <input type="mobile"
    disabled={edit} name='mobile' className="form-control" 
    id="exampleInputmobile" 
    aria-describedby="mobileHelp" placeholder="" 
    value={formik.values.mobile}
    onChange={formik.handleChange("mobile")}
    onBlur={formik.handleBlur("mobile")}
    />
    <div className="error">
     {formik.touched.mobile && formik.errors.mobile}
                </div>
    {/* <small id="mobileHelp" className="form-text text-muted">We'll never share your No. with anyone else.</small> */}
  </div>
 
 {

 edit===false && <button type="submit" 
  className="btn btn-primary">save</button>
 }
</form>
</div>
</div>

      </Container>
    </>
  )
}

export default MyAccount
