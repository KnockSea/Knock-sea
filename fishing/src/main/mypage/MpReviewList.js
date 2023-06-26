import React, { useEffect, useState } from 'react';
import { getLoginUserInfo } from '../util/login-util';

function MpReviewList() {

      const [reviews, setReviews] = useState([]);
      const [token, setToken] = useState(getLoginUserInfo().token);
      const [page, setPage] = useState(1);
      const [size, setSize] = useState(3);
      const fetchData = () => {
        fetch(`http://localhost:8012/api/v1/reviews/myReview?page=${page}&size=${size}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data) {
            setReviews(data.reviews);
          } else {
            // 처리할 에러에 대한 로직 추가
          }
        })
        .catch(error => {
          console.error(error);
        });
      };
      
      useEffect(() => {
        fetchData();
      }, [page, size, reviews.length]);
      
   
     
      return (
    
        <>

     {reviews && reviews.length > 0 && reviews.map(review => (
    <div className='MpReFormItem'>
        <div className='numbox'></div>
        <div className='mprebox1'>{review.profileImg}</div>
        <div className='mprebox2'>
                <div className='mpreAutohr'>
                    <div>{review.userName}</div>
                    <div>{review.title}</div>
                </div>
                <div className='mpstar'>{review.reviewRating}</div>
            <div>{review.reviewContent}</div>
        </div>
        </div> 
    ))}   
        </>
      )

}

export default MpReviewList