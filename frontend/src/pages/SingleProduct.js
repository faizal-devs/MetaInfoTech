import React, { useState,useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { useNavigate } from "react-router-dom";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link ,useLocation, uscation} from "react-router-dom";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux"
import { getAProduct, getAllProducts } from "../features/product/productSlice";
import { addProdToCart, getUserCart } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { array } from "yup";
import { addRating } from "../features/product/productSlice";
const SingleProduct = () => {
  const [color, setColor] = useState(null);
  console.log(color);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);

console.log(quantity);
const location=useLocation();
const navigate=useNavigate();
const getProductsId=location.pathname.split("/")[2]
const dispatch= useDispatch();
const productState=useSelector((state)=>state?.product?.singleproduct);
const productsState=useSelector((state)=>state?.product?.product);
const userCartState =useSelector(state=>state?.auth?.cartProducts)

console.log(productsState);
   useEffect(()=>{
    dispatch(getAProduct(getProductsId));
    dispatch(getUserCart());
    dispatch(getAllProducts());
    
    
   },[]);

   useEffect(()=>{
    for(let index=0; index<userCartState?.length; index++){
      if(getProductsId=== userCartState[index]?.productId?._id){
      setAlreadyAdded(true);
      }
    
    }
   },[])

   const uploadCart=()=>{
    if(color===null){
    toast.error("please choose color")
    return false
    }else{
      dispatch(addProdToCart({productId:productState?._id, quantity, color, price:productState?.price}))
      navigate("/cart")
    }
    
   }

  const props = {
    width: 594,
    height: 600,
    zoomWidth: 600,

    img: 
    // productState?.image[0]?.url ?productState?.image[0]?.url :
     "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
  };

  const [orderedProduct, setorderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const [popularProduct, setPopularProduct]=useState([]);
  const closeModal = () => {};
  useEffect(()=>{
    let data=[]
    for(let index=0; index<productsState?.length; index++){
      const element=productsState[index];
    if(element.tags==='popular'){
      data.push(element)
    }
    setPopularProduct(data)
      }
      
  },[productsState])

  console.log(popularProduct);
  const [star, setStar]=useState(null)
  const [comment, setComment]=useState(null)
const addRatingToProduct=()=>{
  if(star===null){
    toast.error("please add star")
    return false
  }else if(comment===null){
    toast.error("please write Review About the Product")
    return false
  }else{
    dispatch(addRating({star:star,comment:comment,prodId:getProductsId}))
    setTimeout(()=>{
      dispatch(getAProduct(getProductsId));
    },200)
   
  }
  return false
}
  
  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title={productState?.title} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              <div>
                <img
                  src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">
                 {productState?.title}
                </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">rs {productState?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={productState?.totalrating}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">( 2 Reviews )</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type :</h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">{productState?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">{productState?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data">{productState?.tags}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availablity :</h3>
                  <p className="product-data">In Stock</p>
                </div>
                {/* <div className="d-flex gap-10 flex-column mt-2 mb-3"> */}
                  {/* <h3 className="product-heading">Size :</h3> */}
                  {/* <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XXL
                    </span>
                  </div> */}
                {/* </div> */}
                {
                  alreadyAdded===false && <>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">color :</h3>
                  <Color setColor={setColor} colorData={productState?.color} />
                </div></>
                }
                
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                 {
                
                 alreadyAdded ===false && <>
                  <h3 className="product-heading">Quantity:</h3>
                  <div className="">
                    <input
                      type="number"
                      name=""
                      min={1}
                      max={10}
                      className="form-control"
                      style={{ width: "70px" }}
                      id=""
                      onChange={(e)=>setQuantity(e.target.value)}
                      value={quantity}
                    />
                    
                  </div>
                  </>
                  
                  
                
                 }
                  <div className={alreadyAdded?"ms-0":"ms-5" +"d-flex align-items-center gap-30 ms-5"}>
                    <button
                      className="button border-0"
                      // data-bs-toggle="modal"
                      // data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={() => {alreadyAdded? navigate('/cart'): uploadCart()}}
                    >
                     {alreadyAdded ? "go to Cart" : "Add to Cart" }
                    </button>
                    {/* <button className="button signup">Buy It Now</button> */}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="">
                      <TbGitCompare className="fs-5 me-2" /> Add to Compare
                    </a>
                  </div>
                  <div>
                    <a href="">
                      <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                    </a>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Product Link:</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(
                        window.location.href
                      );
                    }}
                  >
                    Copy Product Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p 
              dangerouslySetInnerHTML={{__html: productState?.description}}
              >
            
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                      
                    />
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
      
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={(e)=>{
                        setStar(e)
                      }}
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                      onChange={(e)=>{
                        setComment(e.target.value)
                      }}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button onClick={addRatingToProduct}  className="button border-0" type="button">Submit Review</button>
                  </div>
              
              </div>
              <div className="reviews mt-4">
               {
                productsState && productsState?.rating?.map((item, index)=>{
                  return(
                    <div key={index} className="review">
                    <div className="d-flex gap-10 align-items-center">
                      <h6 className="mb-0">Navdeep</h6>
                      <ReactStars
                        count={5}
                        size={24}
                        value={item?.star}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <p className="mt-3">
                      {item?.comment}
                    </p>
                  </div>
                  )
                })
               }
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard data={popularProduct} />
        </div>
      </Container>

    
    </>
  );
};

export default SingleProduct;
