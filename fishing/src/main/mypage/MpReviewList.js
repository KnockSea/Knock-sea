import React, { useEffect, useState } from 'react';
import { getLoginUserInfo } from '../util/login-util';

function MpReviewList() {

      const [reviews, setReviews] = useState([]);
      const [token, setToken] = useState(getLoginUserInfo().token);
      const [page, setPage] = useState(1);
      const [size, setSize] = useState(10);

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
      }, [page, size]);
      
     
      return (
    
        <>
        {reviews.length > 0 && reviews.map(review => (
    <div className='MpReFormItem'>
        <div className='mprebox1'>이미지</div>
        <div className='mprebox2'>
                <div className='mpreAutohr'>
                    <div>{review.user}</div>
                    <div>Dbsd***</div>
                </div>
                <div className='mpstar'>별점구간</div>
            <div>리뷰입니다 하하하하하하하하하하하</div>
        </div>
        </div> 
    ))}   
        </>
    
      )

}

export default MpReviewList