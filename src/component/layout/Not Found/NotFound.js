import React from "react";
import Error from "@mui/icons-material/Error";
import "./NotFound.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = ({title, height='50vh'}) => {
  return (
    <div className="PageNotFound" style={{height: height}}>
      <Error />

      <Typography>{title} </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;