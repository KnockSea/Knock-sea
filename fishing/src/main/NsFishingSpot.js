import React from "react";
import ocean from "./img/ocean.png";
import "./scss/NsFishingSpot.scss";
import ex1 from "./img/bg.jpg";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const NsFishingSpot = ( { spotList } ) => {
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
        <p className="t1">오늘의 낚시터 &gt; </p>
        <p className="t2">
          <Link to={"/bt"}>🔍더보기</Link>
        </p>
      </div>
      <div className="shipboxs"> {/* 캐러셀의 부모 요소 */}
        <Slider {...carouselSettings}>
          {spotList.map((item) => (
            <div key={item.id} className="image">
              <img src={item.imgUrl} alt={item.title} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NsFishingSpot;
