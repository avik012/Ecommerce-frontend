import React, { Fragment, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./MyOrders.css"
import { Loader } from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, myOrders } from '../../actions/orderAction';
import LaunchIcon from "@mui/icons-material/Launch";
import {Link,  } from "react-router-dom"

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  
  const {loading, error, orders} = useSelector((state)=>state.myOrders )
  const {user} = useSelector(state=>state.user)
  // console.log('myorder', orders)

  const columns =[
    {
      field:"id",
      headerName:"Order Id",
      minWidth:200,
      flex:0.7,
    },
    {
      field:"status",
      headerName:"Status",
      minWidth:100,
      flex:0.3,
      cellClassName: (params) => {
        console.log('params.row.status', params.row.status)
        return params.row.status=== "Delivered"
        ? "greenColor"
        : "redColor"
      },
    },
    {
      field:"itemQty",
      headerName:"Items Qty",
      type:'number',
      minWidth:150,
      flex:0.3,
    },
    {
      field:"amount",
      headerName:"Amount",
      type:'number',
      minWidth:200,
      flex:0.5,
    },
    {
      field:"actions",
      headerName:"Actions",
      type:'number',
      minWidth:150,
      flex:0.3,
      sortable:false,
      renderCell:(params)=>{
        // console.log(params, 'par')
        return (
          <Link to = {`/order/${params.id}`}>      
            <LaunchIcon />
          </Link>
        )
      }
    }
  ]

  const rows = [];

  orders && orders.forEach((item,index) => {
    rows.push({
      itemQty:item.orderItems.length,
      id:item._id,
      status:item.orderStatus,
      amount:item.totalPrice,
      // actions:item._id
    })
  });

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(myOrders());
  }, [dispatch,alert,error])
  
  
  return (
    <Fragment>
      <MetaData title={`${user && user.name} - Orders`} />
      <Typography id='myOrdersHeading' > {user && user.name}'s Orders </Typography>
      { loading ? ( <Loader />):(
        <div className='myOrdersPage' >
          <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          className='myOrdersTable'
          autoHeight
          />


        </div> 
      )}
    </Fragment>
    )
  
}

export default MyOrders