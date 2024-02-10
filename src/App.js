import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/layout/Header/Header";
import Home from "./component/Home/Home";
import Footer from "./component/layout/Footer/Footer";
import ProductDetails from "./component/Prdouct/ProductDetails";
import Product from "./component/Prdouct/Product.js";
import Search from "./component/Prdouct/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions.js"; 
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js"; 
import OrderDetails from "./component/Order/OrderDetails.js"; 
import Dashboard from "./component/Admin/Dashboard.js"; 
import ProductList from "./component/Admin/ProductList.js"; 
import NewProduct from "./component/Admin/NewProduct"; 
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import NotFound from "./component/layout/Not Found/NotFound";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import backendLink from "./constants/backendLink";



function App() { 

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try{
      
      const config = {headers: { "Content-Type":"application/json","token":localStorage.getItem("token")}}
    const { data } = await axios.get(`${backendLink}/api/v1/stripeapikey`,config);
        setStripeApiKey(data.stripeApiKey);
      }
      catch(error){
        console.log("Error occured:- ",error.message)
  }
 
}

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu",(e)=> e.preventDefault() );  // for unable to right click on page

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/contact" Component={Contact} />
        <Route exact path="/about" Component={About} />
        <Route exact path="/product/:id" Component={ProductDetails} />
        <Route exact path="/products" Component={Product} />
        <Route path="/products/:keyword" Component={Product} />

        <Route exact path="/search" Component={Search} />
        <Route exact path="/login" Component={LoginSignUp} />
        <Route exact path="/account" Component={Profile} />
        <Route exact path="/me/update" Component={UpdateProfile} />
        <Route exact path="/password/update" Component={UpdatePassword} />
        <Route exact path="/password/forgot" Component={ForgotPassword} />
        <Route exact path="/password/reset/:token" Component={ResetPassword} />

        <Route exact path="/cart" Component={Cart} />
        <Route exact path="/shipping" Component={Shipping} />
        <Route exact path="/order/confirm" Component={ConfirmOrder} />
        {/* <Route exact path="/success" Component={OrderSuccess} /> */}

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/> }>
          <Route path="/success" element= {<OrderSuccess />} />
        </Route>


        {stripeApiKey && <Route
          element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute isAuthenticated={isAuthenticated}  />
            </Elements>
          }
        >
          <Route path="/process/payment" element={<Payment />} />
        </Route>}


        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/> }>
          <Route path="/orders" element= {<MyOrders />} />
        </Route>

        {/* <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/> }>
          <Route path="/order/:id" element= {<OrderDetails />} />
        </Route> */}
        <Route exact path="/order/:id" Component={OrderDetails} />
        {/* <Route exact path="/admin/dashboard" Component={Dashboard} /> */}
        <Route element={<ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}/> }>
          <Route  path="/admin/dashboard" element= {<Dashboard />} />
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}/> }>
          <Route  path="/admin/products" element= {<ProductList />} />
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}/> }>
          <Route  path="/admin/product/new" element= {<NewProduct />} />
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}/> }>
          <Route  path="/admin/product/:id" element= {<UpdateProduct />} />
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}/> }>
          <Route  path="/admin/orders" element= {<OrderList />} />
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}/> }>
          <Route  path="/admin/order/:id" element= {<ProcessOrder />} />
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}/> }>
          <Route  path="/admin/users/" element= {<UsersList />} />
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}/> }>
          <Route  path="/admin/user/:id" element= {<UpdateUser />} />
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}/> }>
          <Route  path="/admin/reviews" element= {<ProductReviews />} />
        </Route>

          <Route path ="*"  element= { <NotFound />} />
       
         
        


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
