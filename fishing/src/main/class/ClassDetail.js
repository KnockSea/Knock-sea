import React, { useState, useEffect } from 'react';
import './scss/ClassDetail.scss';
import ClassModal from "./ClassModal";
import ClassDetailTap from "./ClassDetailTap";
import Calendar from '../Calendar';
import { Route, Routes,Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getLoginUserInfo } from "../util/login-util";
import { useNavigate } from 'react-router-dom';



function ClassDetail() {
    const [modal, setModal] = useState('false'); 
    const { eduId } = useParams();
    const [oneEdu, setOneEdu] = useState([]);
    const [token, setToken] = useState(getLoginUserInfo().token);
    const [userId, setUserId] = useState(getLoginUserInfo().userId);
    const [isHearted, setIsHearted] = useState(false);
    const [exists, setExists] = useState(false);
    const navigate = useNavigate();

    const handleRegiIsloign = (e) => {
      if (!token) {
              alert("로그인이 필요한 서비스입니다!😏");
              navigate('/login');
          return;
            } else {
              setModal(true);
              e.preventDefault();
              }};

    useEffect(() => {
      const fetchHeartExists = async () => {
        try {
          const heartType = 'EDU'; // 하트 타입

          const apiUrl = `http://localhost:8012/api/v1/hearts/exists?userId=${userId}&heartType=${heartType}`;

          const response = await fetch(apiUrl);
          const exists = await response.json();

          setExists(exists);
        } catch (error) {
          console.error('API 요청 실패:', error);
        }
      };

    fetchHeartExists();
  }, [userId]);

  const createHeart = async () => {
    try {
      const response = await fetch('http://localhost:8012/api/v1/hearts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          heartType: 'EDU',
          eduId: eduId,
          productId: null,
        }),
      });

      if (response.ok) {
        const updatedIsHearted = !isHearted;
        setIsHearted(updatedIsHearted);
        localStorage.setItem('isHearted', updatedIsHearted.toString());

                // 하트 생성 후 exists 값을 업데이트
                const updatedExists = !exists;
                setExists(updatedExists);
            } else {
                console.error('하트 생성 또는 삭제 실패');
            }
            } catch (error) {
            console.error('하트 생성 또는 삭제 실패:', error);
            }
        };

      const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      };

      const API_BASE_URL = `http://localhost:8012/api/v1/edu/${eduId}`;
     console.log("oneEdu : ",oneEdu);
    

    useEffect(() => {
        const loginUserInfo = getLoginUserInfo();
        setToken(loginUserInfo.token);
        setIsHearted(localStorage.getItem('isHearted') === 'true');

        fetch(API_BASE_URL, {
        method: 'GET',
        headers: requestHeader,
        })
        .then((res) => {
            if (res.status === 200) return res.json();
            else {
            alert('서버가 불안정합니다');
            }
        })
        .then((json) => {
            console.log(json);
            setOneEdu(json);
        });
    }, [eduId]);

  return (
    <div className="class-detail-container">
      <div className="class-detail-wrap">
        <div id="class-detail-header">
          <div className="detail-main-photo1">
            <img src={oneEdu.imageList && oneEdu.imageList[0]} className="photo1" alt="Photo1" />
          </div>
          <div className="photo detail-main-photo2">
            <img src={oneEdu.imageList && oneEdu.imageList[1]} className="photo2" alt="Photo2" />
          </div>
          <div className="photo detail-main-photo3">
            <img src={oneEdu.imageList && oneEdu.imageList[2]} className="photo3" alt="Photo3" />
          </div>
        </div>
        <div className="detail-content-wrap">
          <div className="detail-left-section">
            <span style={{ textAlign: 'left' }}>{oneEdu.eduTitle}</span>
            <ClassDetailTap eduInfo={oneEdu.eduInfo} reviewList={oneEdu.reviewList} />
          </div>    
          <div className="detail-right-section">
            <div className="detail-box detail-list-top">
              <div className="detail-section">
                <div className="detail-box detail-list-profile">
                  <div className="lists">
                    <Link to="/host">
                      <div className="box profile-img">
                        <img src={oneEdu.userProfileImage} alt="Profile" />
                      </div>
                      <span className="box profile-page">{oneEdu.userName}</span>
                    </Link>
                    <div>
                      <button
                        onClick={createHeart}
                        style={{
                          color: isHearted ? 'red' : 'black',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        {exists ? '❤️' : '🤍'}
                      </button>
                    </div>
                    <div className="condition">
                      <ul className="condition-box">
                        <li>{oneEdu.eduLevel} |</li>
                        <li>최대 {oneEdu.timeList && oneEdu.timeList[0].timeMaxUser}명 |</li>
                        <li>{oneEdu.eduPrice}원</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <button className="box btn" onClick={handleRegiIsloign}>
                      바로 예약하기
                    </button>
                    {modal === true ? <ClassModal closeModal={() => setModal(false)} oneEdu={oneEdu} /> : null}
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