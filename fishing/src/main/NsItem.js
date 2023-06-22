import React from 'react';
import ex from './img/ex.jpg';
import './scss/NsItem.scss';
import { Link } from 'react-router-dom';

const NsItem = ({ shipInfo }) => {
  // shipInfo 객체에서 필요한 값을 추출
  const imageUrlList = shipInfo?.shipImageLocation || []; // 배 이미지 URL 리스트

   // shipInfo 객체를 로그로 출력
   console.log('shipInfo:', shipInfo);


  return (
    <div className="ship">
      <div className="title">
        <p className="t1">오늘의 배낚시 &gt; </p>
        <p className="t2"><Link to={'/bt'}>더보기</Link></p>
      </div>
      <div className="shipboxs">
        {imageUrlList.slice(0, 3).map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl || ex} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NsItem;