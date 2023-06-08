import React, { useState, useEffect } from 'react';
import  img1 from './img/ns1.png'
import  img2 from './img/ns2.png'
import  img3 from './img/ns3.png'

import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';



const NsBanner = () => {

  // const $location = useLocation();

  // if($location.pathname === '/asd'){
  //   return null;
  // }


  const images = [img1, img2, img3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // 다음 이미지로 이동
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // 이전 이미지로 이동
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    // 5초마다 이미지 변경
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className='banner'>
      <button onClick={prevSlide} className='b1'><i class="bi bi-chevron-compact-left"></i></button>
      <img src={images[currentIndex]} />
      <button onClick={nextSlide} className='b2'><i class="bi bi-chevron-right"></i></button>
    </div>
  );
};

export default NsBanner;