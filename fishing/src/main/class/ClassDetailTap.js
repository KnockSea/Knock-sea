import React, { useState,useEffect } from 'react';
import { Link, Element, scroller } from 'react-scroll';
import './scss/ClassDetailTap.scss';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Pagination from "react-js-pagination";


const ClassDetailTap = (props) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [activeTab, setActiveTab] = useState('소개');
  const [totalItemCount, setTotalItemCount] = useState(0);

  const handlePageChange = (page) => {
    setPage(page);
    // console.log(page);
  };
  // console.log("props : ",props.reviewList[0].reviewContent);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    scroller.scrollTo(tab, {
      duration: 200,
      smooth: 'easeInOutQuart',
      offset: -150, // 스크롤 위치의 오프셋 (필요에 따라 조정)
    });
  };

  return (
    <div>
      <ul className='detail-tap'>
        <li className={activeTab === '소개' ? 'active' : ''}>
          <Link
            activeClass='active'
            to='소개'
            spy={true}
            smooth={true}
            duration={100}
            onClick={() => handleTabClick('소개')}
          >
            클래스 소개
          </Link>
        </li>
        <li className={activeTab === '후기' ? 'active' : ''}>
          <Link
            activeClass='active'
            to='후기'
            spy={true}
            smooth={true}
            duration={100}
            onClick={() => handleTabClick('후기')}
            className='custom-link'
          >
            수강 후기
          </Link>
        </li>

        
      </ul>
      <div style={{textAlign:"left"}} className='detail-content-wrapped'>
        <Element name='소개'>
          <h2>✨ 클래스 소개</h2>
          <p>{props.eduInfo}</p>
        </Element>
        <br/> <br/>
        <Element name='후기'>
          <h2 className='review'>✨ 수강 후기</h2>
          {props.reviewList && props.reviewList.map((review, index) => (
            <div className='rvitembox'>
              <div className='potobox'>
                <img className="my-profile"  title="마이페이지" src={review.profileImg || require('../icons/01d.png')} style={{border:"1px solid darkgray"}}/>
              </div>
              <div className='minibox'>
                <div className='rvlisttitle'><span className='review-username'>{review.userName}</span> ( {review.reviewRating} )</div>
                <div className='rvlistcount'>{review.reviewContent}</div>
              </div>
            </div>
          ))}
            <div className="page">
                <Pagination
                  activePage={page}
                  itemsCountPerPage={10}
                  totalItemsCount={totalItemCount}
                  pageRangeDisplayed={5}
                  prevPageText={"‹"}
                  nextPageText={"›"}
                  onChange={handlePageChange}
                />     
            </div>
        </Element>
      </div>
    </div>
  );
};

export default ClassDetailTap;