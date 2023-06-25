import React from 'react';
import ex from './img/ex.jpg';
import './scss/NsItem.scss';
import { Link } from 'react-router-dom';

const NsItem = ({ product }) => {
  // shipInfo 객체에서 필요한 값을 추출
  const imageUrlList = product?.seaImage || []; // 배 이미지 URL 리스트

  // product 객체를 로그로 출력
  console.log(' NSitem !! ! ! ! ! ! product:', product);

  // 최신 순으로 정렬된 이미지 URL 리스트
  const sortedImageUrlList = imageUrlList.sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="ship">
      <div className="title">
        <p className="t1">오늘의 배낚시 &gt; </p>
        <p className="t2"><Link to={'/bt'}>더보기</Link></p>
      </div>
      <div className="shipboxs">
        {sortedImageUrlList.slice(0, 3).map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl || ex} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NsItem;
