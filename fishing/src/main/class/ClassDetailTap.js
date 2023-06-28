import React, { useState,useEffect } from 'react';
import { Link, Element, scroller } from 'react-scroll';
import './scss/ClassDetailTap.scss';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';


const ClassDetailTap = (props) => {
  const [activeTab, setActiveTab] = useState('소개');
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
      <div style={{textAlign:"left"}}>
        <Element name='소개'>
          <h2>클래스 소개</h2>
          <p>{props.eduInfo}</p>
        </Element>
        <br/> <br/> <br/> <br/><br/> <br/> <br/> <br/><br/> <br/> <br/> <br/>
        <Element name='후기'>
          <h2>수강 후기</h2>
          {props.reviewList && props.reviewList.map((review, index) => (
            // <p key={index}>{review.reviewContent}</p>
            <div className='rvitembox'>
              <div className='potobox'><img className="my-profile"  title="마이페이지" src={review.profileImg || require('../icons/01d.png')} style={{border:"1px solid darkgray"}}/></div>
              <div className='minibox'>
                <div className='rvlisttitle'>{review.userName} {review.reviewRating}</div>
                {/* <span className='rvstar'>
                    <Box
                      sx={{
                        '& > legend': { mt: 2 } }}
                    >
                      <Rating name="half-rating" 
                      value={review.reviewRating}
                      precision={0.5}
                      readOnly />
                  </Box>
                </span> */}
                <div className='rvlistcount'>{review.reviewContent}</div>
              </div>
            </div>
          ))}
        </Element>
      </div>
    </div>
  );
};

export default ClassDetailTap;