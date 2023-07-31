import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux"
import {getUserWishlist} from "../features/user/userSlice"
import { useEffect } from "react";
import { addtoWishlists } from "../features/product/productSlice";
const Wishlist = () => {

  const dispatch= useDispatch();
  useEffect(()=>{
    getUserWishlistFromDb();
  },[]);

  const getUserWishlistFromDb=()=>{
    dispatch(getUserWishlist());
  };
  const removeUserWishlistFromDb=(id)=>{
    dispatch(addtoWishlists(id));
    setTimeout(()=>{
      dispatch(getUserWishlist());

    },300)
  };
  const wishlistState=useSelector((state)=>state?.auth?.wishlist?.wishlist)
  console.log(wishlistState);
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {/* {
            wishlistState?.length === 0 && <div className="text-center">No Data</div>
          } */}
          {
           wishlistState?.map((item, index)=>{
              return(
                <div className="col-3" key={index}>
                <div className="wishlist-card position-relative">
                  <img onClick={()=>{removeUserWishlistFromDb(item?._id)}}
                    src="images/cross.svg"
                    alt="cross"
                    className="position-absolute cross img-fluid"
                  />
                  <div className="wishlist-card-image bg-white">
                    <img
                      src=   "images/watch.jpg" 
                      className="img-fluid w-100"
                      alt="watch"
                    />
                  </div>
                  <div className="py-3 px-3">
                    <h5 className="title">
                     {item?.title}
                    </h5>
                    <h6 className="price">Rs  {item?.price}</h6>
                  </div>
                </div>
              </div>
              )
            })
          }
         
          
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
