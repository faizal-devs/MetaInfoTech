import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPloicy from "./pages/RefundPloicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermAndContions from "./pages/TermAndContions";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { openRoutes } from "./routing/openRoutes";
import { privateRoutes } from "./routing/privateRoutes";
import Orders from "./pages/orders";
import MyAccount from "./pages/MyAccount";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<OurStore />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="blog/:id" element={<SingleBlog />} />
            <Route path="cart" element={<privateRoutes><Cart /></privateRoutes>} />
            <Route path="orders" element={<privateRoutes><Orders/></privateRoutes>} />
            <Route path="my-account" element={<privateRoutes><MyAccount/></privateRoutes>} />
            <Route path="checkout" element={<privateRoutes><Checkout /></privateRoutes>} />
            <Route path="compare-product" element={<CompareProduct />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="login" element={ <Login /> }/>
            <Route path="forgot-password" element={<Forgotpassword />} />
            <Route path="signup" element={<openRoutes><Signup /> </openRoutes>} />
            <Route path="reset-password/:token" element={<Resetpassword />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPloicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="term-conditions" element={<TermAndContions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
