import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import "./scss/NsItem.scss";

const NsItem = ({ shipList }) => {
  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
  };

  return (
    <div className="ship">
      <div className="title">
        <p className="t1">오늘의 배낚시 &gt; </p>
        <p className="t2">
          <Link to={"/bt"}>더보기</Link>
        </p>
      </div>
      <div className="shipboxs"> {/* 캐러셀의 부모 요소 */}
        <Slider {...carouselSettings}>
          {shipList.map((item) => (
            <div key={item.id} className="image">
              <img src={item.imgUrl} alt={item.title} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NsItem;
