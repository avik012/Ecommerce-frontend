import React from 'react'
import profilePng from "../../images/Profile.png"
import { Rating } from '@mui/material';

 const ReviewCard = ({review}) => {

    // const options = { 
    //     edit:false,
    //     color:"rgba(20,20,20,0.1)",
    //     activeColor:"tomato",
    //     size:window.innerWidth < 600 ?20:25,
    //     value: review.rating,
    //     isHalf: true,
    //   };
      const options = { 
        size:"small",
        value: review.rating,
        precision:0.5,
        readOnly:true
      };
// console.log('review', review)
  return (
    <div className='reviewCard'>
        <img src={profilePng} alt='User' />
        <p>{review.name}</p>
        <Rating {...options} />
        <span className="reviewCardComment" >{review.comment}</span>
    </div>
  )
}

export default ReviewCard;