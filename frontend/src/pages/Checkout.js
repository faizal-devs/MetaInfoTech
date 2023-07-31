import React from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { config } from "../utills/axiosConfig";
import { createAOrder } from "../features/user/userSlice";

const shippingSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  address: yup.string().required("address is required"),
  other: yup.string().required("field is required"),
  state: yup.string().required("state is Required"),
  city: yup.string().required("city is Required"),
  country: yup.string().required("country is Required"),
  pincode: yup.number().required("pincode is Required")
}); 

const Checkout = () => {
  const dispatch=useDispatch();
  const userCartState =useSelector(state=>state?.auth?.cartProducts)
  const [totalAmount, setTotalAmount]=useState(null);
   const [shippingInfo, setshippingInfo]=useState(null);
   const [paymentInfo, setPaymentInfo]=useState({razorpayPaymentId:"", razorpayOrderId:""})
   const [cartProductState, setcartProductState]=useState([]);
  console.log(paymentInfo,shippingInfo);
  
  useEffect(()=>{
    let sum=0;
    for(let index=0; index<userCartState?.length; index++){
      sum=sum+(Number(userCartState[index].quantity) * userCartState[index].price)
      setTotalAmount(sum)
      
    
    }
   },[userCartState])
   const formik =useFormik({
    initialValues:{
      firstname:"",
      lastname:"",
      address:"",
      other:"",
      state:"",
      city:"",
      country:"",
      pincode:"",
    },
    validationSchema: shippingSchema,
    onSubmit:(values)=>{
      
      setshippingInfo(values)
      setTimeout(()=>{
        checkoutHandler()
      },300);
      // alert(JSON.stringify(value))
    },

  }, 300);

  const loadScript=(src)=>{
  return new Promise((resolve)=>{
 const script = document.createElement("script")
 script.src=src;
 script.onload=()=>{
  resolve(true)
 }
 script.onerror=()=>{
  resolve(false)
 }
 document.body.appendChild(script)
  })
  }
  useEffect(()=>{
    let items=[];
    for(let index=0; index<userCartState?.length; index++){
    items.push({product:userCartState[index].productId._id,quantity:userCartState[index].quantity,color:userCartState[index].color._id, price:userCartState[index].price})
    }
    setcartProductState(items)
   },[])
   console.log(cartProductState);
  const checkoutHandler=async()=>{
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
  }
  const result = await axios.post("http://localhost:5000/api/user/checkout", {amount:totalAmount+5},config);
  console.log(result);
   if(!result){
    alert("something went wrong")
    return;
   }
   const { amount, id: order_id, currency } = result.data.order;
// console.log(amount);
   const options = {
       key: "rzp_test_6Ywg3xqmyPKcGh", // Enter the Key ID generated from the Dashboard
       amount: amount,
       currency: currency,
       name: "Meta InfoTech Solution.",
       description: "Test Transaction",
      //  image: { logo },
       order_id: order_id,
       handler: async function (response) {
           const data = {
               orderCreationId: order_id,
               razorpayPaymentId: response.razorpay_payment_id,
               razorpayOrderId: response.razorpay_order_id,
           };

           const result = await axios.post("http://localhost:5000/api/user/order/paymentVerification", data,config);

           setPaymentInfo({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
           })
           
           dispatch(createAOrder({totalPrice:totalAmount,totalPriceAfterDiscount:totalAmount,orderItems:cartProductState,paymentInfo,shippingInfo}))
       },
       prefill: {
           name: "faizal",
           email: "faizalshek@gmail.com",
           contact: "7389038545",
       },
       notes: {
           address: "Soumya Dey Corporate Office",
       },
       theme: {
           color: "#61dafb",
       },
   };

   const paymentObject = new window.Razorpay(options);
   paymentObject.open();
}
  
  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">My Ecom</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                Navdeep Dahiya (monud0232@gmail.com)
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select name="country"
                  value={formik.values.country}
                 onChange={formik.handleChange("country")}
                 onBlur={formik.handleBlur("country")}
                  className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="india">
                    India
                    </option>
                  </select>
                  <div className="error">
                  {formik.touched.country && formik.errors.country}
                 </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="FirstName"
                    value={formik.values.firstname}
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                    className="form-control"
                  />
                    <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                 </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formik.values.lastname}
                 onChange={formik.handleChange("lastname")}
                 onBlur={formik.handleBlur("lastname")}
                    className="form-control"
                  />
                   <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                 </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                    className="form-control"
                  />
                   <div className="error">
                  {formik.touched.address && formik.errors.address}
                 </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    name="other"
                    placeholder="Apartment 208, etc"
                    value={formik.values.other}
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                    className="form-control"
                  />
                   <div className="error">
                  {formik.touched.other && formik.errors.other}
                 </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    name= "city"
                    placeholder="City"
                    className="form-control"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                  />
                    <div className="error">
                  {formik.touched.city && formik.errors.city}
                 </div>
                </div>
                <div className="flex-grow-1">
                  <select name="state"
                  value={formik.values.state}
                   onChange={formik.handleChange("state")}
                   onBlur={formik.handleBlur("state")}
                  className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="MadhyaPradesh">
                     Madhya Pradesh
                    </option>
                  </select>
                  <div className="error">
                  {formik.touched.state && formik.errors.state}
                 </div>
                </div>
                <div className="w-100">
                  <input
                    type="number"
                    name="pincode"
                    placeholder="pincode"
                    className="form-control"
                    value={formik.values.pincode}
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                  />
                    <div className="error">
                  {formik.touched.pincode && formik.errors.pincode}
                 </div>
                </div>
               
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue to Shipping
                    </Link>
                    <button className="button" type="submit">Place Order</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {
                userCartState && userCartState?.map((item, index)=>{
                  return(
                    <div className="d-flex gap-10 mb-2 align-align-items-center">
                    <div className="w-75 d-flex gap-10">
                      <div className="w-25 position-relative">
                        <span
                          style={{ top: "-10px", right: "2px" }}
                          className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                        >
                          {item?.quantity}
                        </span>
                        <img className="img-fluid" src={watch} alt="product" />
                      </div>
                      <div>
                        <h5 className="total-price">{item?.productId?.title}</h5>
                        <p className="total-price">{item?.color?.title}</p>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="total">Rs {item?.price * item?.quantity}</h5>
                    </div>
                  </div>
                  )
                })
              }
           
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">Rs {totalAmount}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">Rs 5</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">$ {totalAmount?totalAmount+5:"0"}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
