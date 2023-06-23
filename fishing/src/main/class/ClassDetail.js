import React, { useState,useEffect  } from 'react';
import './scss/ClassDetail.scss';
// import './scss/reset.scss';
import Modal from "./ClassModal";
import ClassDetailTap from "./ClassDetailTap";
import { Route, Routes,Link } from 'react-router-dom';

const handleLogin = (e) => {
    e.preventDefault();
  
      // 회원가입 서버 요청
     
    };
    
  // 렌더링 후 실행함수
 console.log();

function ClassDetail() {
   
      const [filter, setFilter] = useState(''); 
      const [modal, setModal] = useState('false'); 


    //   const handleFilterChange = (event) => {
    //     setFilter(event.target.value);
    //   };

    return(
    <div className="class-detail-container">
        <div className="class-detail-wrap">
            <div id="class-detail-header">
                <div className="detail-main-photo1"></div>
                <div className="photo detail-main-photo2"></div>
                <div className="photo detail-main-photo3"></div>
            </div>
            <div className='detail-content-wrap'>
                <div className="detail-left-section">
                    <span>[경기도] 통발낚시터 클래스</span>
                    <ClassDetailTap/>
                    {/* <ul className='detail-tap'>
                        <li>클래스 소개</li>
                        <li>장소 소개</li>
                        <li>수강 후기</li>
                    </ul>
                    <div className='detail-content'>루루라라 사진이랑 글</div> */}
                </div>

                <div className="detail-right-section">
                    <div className='detail-box detail-list-top'>

                        <div className='detail-section'>
                            <div className="detail-box detail-list-profile">
                                <div className='lists'>
                                     <Link to={"/host"}> 
                                    <div className='box profile-img'>
                                        <img src='https://cdn-icons-png.flaticon.com/128/1752/1752787.png'/>
                                    </div>
                                    <span className='box profile-page'>뉴정환호
                                    </span>
                                    </Link>
                                    <div className='condition'>
                                        <ul className='condition-box'>
                                            <li>난이도 |</li>
                                            <li>소요시간 |</li>
                                            <li>수업인원</li>
                                        </ul>
                                    </div>
                                    </div>        
                                <div>
                                    <button className='box btn' onClick={ () => {setModal(true)}}>바로 예약하기</button>
                                    {modal === true ? <Modal closeModal={() => setModal(false)} /> : null}
                                </div>
                        </div>
                        </div>
                    </div>

                  

                </div>
            </div>    
        </div>
    </div>
    
    );
  }
  

  export default ClassDetail;