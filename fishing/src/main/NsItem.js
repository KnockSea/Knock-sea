import React, { useEffect, useState } from 'react';
import ex from './img/ex.jpg';
import './scss/NsItem.scss';
import { Link } from 'react-router-dom';
import { API_BASE_URL, PRODUCTS } from '../config/host-config';


const NsItem = () => {
  const [product, setProduct] = useState();

  useEffect(() => {
    fetch(`${API_BASE_URL}${PRODUCTS}/main/ship`)
      .then(response => response.json())
      .then(shipimgs => {
        setProduct(shipimgs);
      })
      .catch(error => {
        console.error('Error fetching ship images:', error);
      });
  }, []);

  // shipInfo 객체에서 필요한 값을 추출
  const imageUrlList = product?.imgUrl || []; // 배 이미지 URL 리스트

  // 최신 순으로 정렬된 이미지 URL 리스트
  const sortedImageUrlList = imageUrlList.sort((a, b) => b.createdAt - a.createdAt);

  console.log('NSitem !! ! ! ! ! ! product:', product); // product 변수 콘솔 출력

  // 최신 순으로 정렬된 이미지 URL 리스트
  const sortedImageUrlList = imageUrlList.sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="ship">
      <div className="title">
        <p className="t1">오늘의 배낚시 &gt; </p>
        <p className="t2">
          <Link to={'/bt'}>더보기</Link>
        </p>
      </div>
      <div className="shipboxs">
        {sortedImageUrlList.slice(0, 3).map((imgUrl, index) => (
          <div key={index}>
            <img src={imgUrl || ex} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NsItem;
