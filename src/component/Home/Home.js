import React, { Fragment, useEffect } from "react";
// import { CgMouse } from "react-icons/all";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getProducts } from "../../actions/productAction";
import ProductCard from "./ProductCard.js";
import { Loader } from "../layout/Loader/Loader";
import NotFound from "../layout/Not Found/NotFound.js";

const Home = () => {
  const alert = useAlert(); 
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error); 
    }
    if (error && products) {
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert, products]); 

  useEffect(() => {
    dispatch(getProducts()); 
  }, [dispatch]); 

  

  return (
    <>
    {
    <Fragment>      
<MetaData title="ECOMMERCE" />
<div className="banner">
  <p>Welcome to Ecommerce</p>
  <h1>FIND AMAZING PRODUCTS BELOW</h1>

  <a href="#container">
    <button> 
      Scroll
    </button>
  </a>
</div>

<h2 className="homeHeading">Featured Products</h2>

<div className="container" id="container">
  {loading ? <Loader /> :  products ?  products.map((product,i)=> <ProductCard product={product} key={i} />) : <NotFound height="auto" title={`Error Occured: ${error}`} />}
</div>
    </Fragment>
    }
    </>
    
  );
};

export default Home;