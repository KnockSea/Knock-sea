import React from "react";
import { useEffect } from 'react';
import { useState } from 'react';
import { API_BASE_URL, PRODUCTS } from '../../config/host-config'


const MpReFormItem = ({shipId}) => {

  const [shipReview, setShipReview] = useState([]);



  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}${PRODUCTS}/host-review?id=${shipId}&type=SHIP`);
  
      if (res.status === 200) {
        const data = await res.json();
        setShipReview(data);
      }
    } catch (error) {
      console.log('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  });

  return (
    <div className="MpReFormItem">
      <div className="mprebox1">이미지</div>
      <div className="mprebox2">
        <div className="mpreAutohr">
          <div>윤*식</div>
          <div>Dbsd***{shipReview.title}</div>
        </div>
        <div className="mpstar">별점구간</div>
        <div>리뷰입니다 하하하하하하하하하하하</div>
      </div>
    </div>
  );
};

export default MpReFormItem;
