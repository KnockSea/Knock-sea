import React, { useState, useEffect } from 'react';
import  img1 from './img/ns1.png'
import  img2 from './img/ns2.png'
import  img3 from './img/ns3.png'

import sea1 from './img/nbs1.jpg'
import sea2 from './img/nbs3.jpg'
import sea3 from './img/nbs2.jpg'
import sea4 from './img/nbs4.jpg'



import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';



const NsBanner = () => {

  // const $location = useLocation();

  // if($location.pathname === '/asd'){
  //   return null;
  // }


  const images = [sea1, sea2, sea3, sea4];
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
    }, 6000);

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