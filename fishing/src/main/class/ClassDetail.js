import React, { useState,useEffect  } from 'react';
import './scss/ClassDetail.scss';
// import './scss/reset.scss';
import Modal from "./ClassModal";
import ClassDetailTap from "./ClassDetailTap";
import { Route, Routes,Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const handleLogin = (e) => {
    e.preventDefault();
  
     
    };
    
  // 렌더링 후 실행함수
  

function ClassDetail() {
   
      const [filter, setFilter] = useState(''); 
      const [modal, setModal] = useState('false'); 
      const { eduId } = useParams();

      const [oneEdu, setOneEdu] = useState([]);

      const requestHeader = {
        'content-type': 'application/json'
      };
      const API_BASE_URL = `http://localhost:8012/api/v1/edu/${eduId}`;
  
    
      useEffect(()=>{
        fetch(API_BASE_URL, { 
            method: 'GET',
            headers: requestHeader
          })
            .then(res => {
              if (res.status === 200) return res.json();
             else {
                alert('서버가 불안정합니다');
              }
            })
            .then(json => {
              console.log(json); 
              setOneEdu(json); //렌더링 완료
            });
    
        }, []);


    return(
    <div className="class-detail-container">
        <div className="class-detail-wrap">
            <div id="class-detail-header">
                <div className="detail-main-photo1">
                {/* <img src={oneEdu.imageList && oneEdu.imageList[0]}/> */}
                </div>
                <div className="photo detail-main-photo2">
                <img src={oneEdu.imageList && oneEdu.imageList[1]}/>
                </div>
                <div className="photo detail-main-photo3">
                <img src={oneEdu.imageList && oneEdu.imageList[2]}/>
                </div>
            </div>
            <div className='detail-content-wrap'>
                <div className="detail-left-section">
                    <span>{oneEdu.eduTitle}</span>
                    <ClassDetailTap />
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
                                            <li>{oneEdu.eduLevel} |</li>
                                            <li>최대 {oneEdu.timeList && oneEdu.timeList[0].timeMaxUser}명</li>
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