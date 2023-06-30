import React from "react";
import ocean from "./img/ocean.png";
import "./scss/NsFishingSpot.scss";
import ex1 from "./img/bg.jpg";
import { Link } from "react-router-dom";

const NsFishingSpot = ( { spotList } ) => {
  return (
    <div className="ship">
      <div className="title">
        <p className="t1">오늘의 배낚시 &gt; </p>
        <p className="t2">
          <Link to={"/bt"}>더보기</Link>
        </p>
      </div>
      <div className="shipboxs">
        {spotList.map(t => (
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

export default NsFishingSpot;
