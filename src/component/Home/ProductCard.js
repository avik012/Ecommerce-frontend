import { Rating } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
// import { Rating } from "@material-ui/lab";
// import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  // const options = {
  //   value: product.ratings,
  //   readOnly: true,
  //   precision: 0.5,
  //   isHalf: true,
  //   activeColor:"orange"
  // };
  const options = {
    size:"small",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    
  };
  return (
     product._id && <Link className="productCard" to={`/product/${product._id}`}> 
      <img src={product.images[0]?.url} alt={product.name} />
      <div className="productDetails"> 
        <p>{product.name}</p>
        <div className="rating">
          <Rating {...options} />{" "} 
          <span className="productCardSpan">
            {" "}
            ({product.numOfReviews} Reviews)
          </span>
        </div>
        <span>{`₹${product.price}`}</span>

      </div>
    </Link>
  );
};

export default ProductCard;