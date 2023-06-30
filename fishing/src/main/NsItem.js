import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import "./scss/NsItem.scss";

const NsItem = ({ shipList, linkdetail }) => {
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
        <p className="t1">오늘의 배낚시 &gt; </p>
        <p className="t2">
          <Link to={"/bt"}>더보기</Link>
        </p>
      </div>
      <div className="shipboxs">
        <Slider {...carouselSettings}>
          {shipList.map((item) => {
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

export default NsItem;
