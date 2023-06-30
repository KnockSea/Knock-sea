// export default NsItem;
import React from "react";
import ocean from "./img/ocean.png";
import "./scss/NsItem.scss";
import { Link } from "react-router-dom";

const NsItem = ({ shipList }) => {
  const groupedShipList = [];
  let tempGroup = [];

  for (let i = 0; i < shipList.length; i++) {
    tempGroup.push(shipList[i]);

    if (tempGroup.length === 2 || i === shipList.length - 1) {
      groupedShipList.push(tempGroup);
      tempGroup = [];
    }
  }

  return (
    <div className="ship">
      <div className="title">
        <p className="t1">오늘의 배낚시 &gt; </p>
        <p className="t2">
          <Link to={"/bt"}>더보기</Link>
        </p>
      </div>
      <div className="shipboxs">
        {groupedShipList.map((group, groupIndex) => (
          <div className="group" key={groupIndex}>
            {group.map((imgUrl, index) => (
              <div className="image" key={index}>
                <img src={imgUrl.imgUrl || ocean} alt={`Image ${groupIndex}-${index + 1}`} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NsItem;
