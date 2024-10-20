import React, { Fragment, useEffect, useState } from 'react'
import "./Product.css"
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProducts } from '../../actions/productAction'
import { useAlert } from "react-alert"
import { Loader } from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination"
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography"
import MetaData from '../layout/MetaData'
import { categories } from '../../constants/backendLink'
import NotFound from '../layout/Not Found/NotFound'

const Product = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000])
  const { products, loading, error, resultPerPage, productsCount, filteredProductsCount } = useSelector(state => state.products)
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0)

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice)
  }

  const { keyword } = useParams();
  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings])

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (error && products) {
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, products])


  return <Fragment>

    <MetaData title="PRODUCTS--ECOMMERCE" />
    <h2 className='productsHeading'>Products <span className='subCategory'> {category && `(${category})`} </span> </h2>

    <div className="productPage">
      <div className='filterBox'>
        <Typography>Price</Typography>
        <Slider
          size='small'
          value={price}
          onChange={priceHandler}
          valueLabelDisplay='auto'
          aria-labelledby='range-slider'
          min={0}
          max={25000}
        />
        <Typography>Categories</Typography>
        <ul className='categoryBox'>
          {categories.map((category => (
            <li
              className='category-link'
              key={category}
              onClick={() => setCategory(category)}
            >
              {category}
            </li>
          )))}
        </ul>
        <fieldset>
          <Typography className='legend'>Ratings Above</Typography>
          <Slider
            size='small'
            value={ratings}
            onChange={(e, newRating) => {
              setRatings(newRating);
            }}
            aria-labelledby='continuous-slider'
            min={0}
            max={5}
            valueLabelDisplay='auto'
          >

          </Slider>
        </fieldset>

      </div>

      {loading ? <Loader /> : (products ? <div className='products'>
        {products && products.map((product) =>
          <ProductCard key={product._id} product={product} />)}
      </div> : <NotFound title={`Error Occured: ${error}`} />)}


    </div>
    {filteredProductsCount > resultPerPage && (
      <div className='paginationBox'>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="1st"
          lastPageText="Last"
          itemClass='page-item'
          linkClass='page-link'
          activeClass='pageItemActive'
          activeLinkClass='pageLinkActive'
        />
      </div>
    )}

  </Fragment>
}

export default Product