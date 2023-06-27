import React from 'react'
import ex from "./img/ex.jpg";
import './scss/NsFishingSpot.scss'
import ex1 from './img/bg.jpg'
import { Link } from "react-router-dom";

const NsFishingSpot = ({spotList}) => {
  return (
    <div className="ship">
      <div className="title">
        <p className="t1">오늘의 낚시터 &gt; </p>
        <p className="t2">
          <Link to={"/bt"}>더보기</Link>
        </p>
      </div>
      <div className="shipboxs">
        {spotList.slice(0, 3).map((imgUrl, index) => (
          <div key={index}>
            <img src={imgUrl.imgUrl || ex} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NsFishingSpot