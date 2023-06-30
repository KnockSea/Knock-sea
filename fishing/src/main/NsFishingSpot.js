import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import "./scss/NsFishingSpot.scss";

const NsFishingSpot = ({ spotList, linkdetail }) => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="ship">
      <div className="title">
        <p className="t1">오늘의 낚시터 &gt; </p>
        <p className="t2">
          <Link to={"/bt"}>더보기</Link>
        </p>
      </div>
      <div className="shipboxs">
        <Slider {...carouselSettings}>
        {spotList.map((item) => {
            const productId = item.id;

            return (
              <div key={item.id} className="image">
                <Link to={`/detail/${productId}`}>
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

export default NsFishingSpot;
