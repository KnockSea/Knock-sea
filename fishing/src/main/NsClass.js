import React from 'react'
import ocean from "./img/ocean.png";
import './scss/NsClass.scss'
import c1 from './img/bn3.jpg'
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const NsClass = ({eduList}) => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    autoplay: true, // 자동 전환 설정
    autoplaySpeed: 3000, // 전환 간격 (3초)
  };

  return (
    <div className="ship">
      <div className="title">
        <p className="t1">오늘의 클래스 &gt; </p>
        <p className="t2">
          <Link to={"/bt"}>더보기</Link>
        </p>
      </div>
      <div className="shipboxs"> {/* 캐러셀의 부모 요소 */}
        <Slider {...carouselSettings}>
        {eduList.map((item) => {
            const productId = item.id;

            return (
              <div key={item.id} className="image">
                <Link to={`/classdetail/${productId}`}>
                  <img src={item.imgUrl} alt={item.title} />
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default NsClass