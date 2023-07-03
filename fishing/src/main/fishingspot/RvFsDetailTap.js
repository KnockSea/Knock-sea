import React, { useState } from 'react';
import { Link, Element ,scroller } from 'react-scroll';
import RvFsText from './RvFsText';


const RvFsDetailTap = ({ FsDetail}) => {

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
          낚시터 소개
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
          낚시터 후기
        </Link>
      </li>
      <li className={activeTab === '주의사항' ? 'active' : ''}>
        <Link
          activeClass='active'
          to='주의사항'
          spy={true}
          smooth={true}
          duration={100}
          onClick={() => handleTabClick('주의사항')}
          className='custom-link'
        >
          주의 사항
          {/* <RvFsText
           FsDetail={FsDetail}
            /> */}
        </Link>
      </li>

      
    </ul>
    <div className='rv-detail-wrap'>
      <Element name='소개'>
        <h2>🚩 낚시터 소개 🚩</h2>
        <p>{FsDetail.info}</p>
      </Element>
      <br/> <br/> <br/> <br/><br/> <br/> <br/> <br/><br/> <br/> <br/> <br/>
      <Element name='후기'>
        <h2>🚩 낚시터 후기 🚩</h2>
        {FsDetail.reviewList && FsDetail.reviewList.map((review, index) => (
          <p key={index}>{review.reviewContent}</p>
        ))}
      </Element>
      <br/> <br/> <br/> <br/><br/> <br/> <br/> <br/><br/> <br/> <br/> <br/>
      <Element name='주의사항'>
        <h2>🚩 주의 사항 🚩</h2>
            <RvFsText
            FsDetail={ FsDetail}
            />
      </Element>
    </div>
  </div>
  )
}

export default RvFsDetailTap