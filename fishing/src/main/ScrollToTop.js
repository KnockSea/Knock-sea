import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 전환이 발생할 때 스크롤을 맨 위로 이동
  }, [location]);

  return null;
};

export default ScrollToTop;