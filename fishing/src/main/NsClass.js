import React from 'react'
import ocean from "./img/ocean.png";
import './scss/NsClass.scss'
import c1 from './img/bn3.jpg'
import { Link } from "react-router-dom";

const NsClass = ({eduList}) => {
  
  return (
    <div className="ship">
      <div className="title">
        <p className="t1">오늘의 배낚시 &gt; </p>
        <p className="t2">
          <Link to={"/bt"}>더보기</Link>
        </p>
      </div>
      <div className="shipboxs">
        
        {eduList.map(t => (
          <div className="group">
            <div className="image">            
              <img src={t.imgUrl}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NsClass