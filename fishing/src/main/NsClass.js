import React from 'react'
import ocean from "./img/ocean.png";
import './scss/NsClass.scss'
import c1 from './img/bn3.jpg'
import { Link } from "react-router-dom";

const NsClass = ({eduList}) => {
  console.log('edu')
  const groupedEduList = [];
  let tempGroup = [];

  for (let i = 0; i < eduList.length; i++) {
    tempGroup.push(eduList[i]);

    if (tempGroup.length === 2 || i === eduList.length - 1) {
      groupedEduList.push(tempGroup);
      tempGroup = [];
    }
  }

  return (
    <div className="ship">
      <div className="title">
        <p className="t1">오늘의 클래스 &gt; </p>
        <p className="t2">
          <Link to={"/class"}>더보기</Link>
        </p>
      </div>
      <div className="shipboxs">
        {groupedEduList.map((group, groupIndex) => (
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

export default NsClass