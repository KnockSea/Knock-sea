import React, { useEffect, useState } from 'react';
import { getLoginUserInfo } from '../util/login-util';

function MpReviewList() {
  const [reviews, setReviews] = useState(null);
  const [token, setToken] = useState(getLoginUserInfo().token);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);
  const [isHearted, setIsHearted] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page, size]);

  const fetchData = () => {
    fetch(`http://localhost:8012/api/v1/reviews/myReview?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
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

  if (reviews === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {reviews && reviews.length > 0 ? (
        reviews.map(review => (
          <div className='MpReFormItem' key={review.id}>
            <div className='numbox'></div>
            <div className='mprebox1'>{review.image}</div>
            <div className='mprebox2'>
              <div className='mpreAutohr'>
                <div>{review.userName}</div>
                <div>{review.title}</div>
              </div>
              <div className='mpstar'>{review.reviewRating}</div>
              <div>{review.reviewContent}</div>
            </div>
          </div>
        ))
      ) : (
        <div>리뷰가 입력된 것이 없습니다.</div>
      )}
    </>
  );
}

export default MpReviewList;