import React, { useEffect, useState } from 'react';
import { getLoginUserInfo } from '../util/login-util';
import { API_BASE_URL, REVIEW } from '../../config/host-config';
import Pagination from "react-js-pagination";

function ReviewList() {
    const [reviews, setReviews] = useState([]);
  const [token, setToken] = useState(getLoginUserInfo().token);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalItemCount, setTotalItemCount] = useState(0);

  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };

  useEffect(() => {
    fetchData();
  }, [reviews && reviews.length, page, size]);

  const fetchData = () => {
    fetch(`${API_BASE_URL}${REVIEW}?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setReviews(data.reviews);
          setTotalItemCount(data.pageInfo.totalCount);
          console.log("data", data);
          console.log(data.reviews);
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
            <div className='mprebox1'><img src={review.image} alt='이미지' style={{ width: '100px', height: '100px' }} /></div>
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
                          <div className="page">
                         <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={totalItemCount}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />     
            </div>
    </>
  );
}

export default ReviewList