// export default NsItem;
import React from "react";
import ocean from "./img/ocean.png";
import "./scss/NsItem.scss";
import { Link } from "react-router-dom";

const NsItem = ({ shipList }) => {
  return (
    <div className="ship">
      <div className="title">
        <p className="t1">오늘의 배낚시 &gt; </p>
        <p className="t2">
          <Link to={"/bt"}>더보기</Link>
        </p>
      </div>
      <div className="shipboxs">       
        {shipList.map(t => (
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

export default NsItem;
