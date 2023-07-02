import React from 'react'
import './MpScss/MpMain.scss'
import { Link } from 'react-router-dom'
import MpList from './MpList'
import MpReFormItem from './MpReFormItem'
import MpReviewList from './MpReviewList';
import RegiModal from './RegiModal';
import { useLocation } from "react-router-dom";
import {getLoginUserInfo, isLogin } from '../util/login-util';
import { useEffect } from 'react';
import { useState } from 'react';
import { API_BASE_URL, USER } from '../../config/host-config'
import MpRvlist from './MpRvlist'


const MpMain = () => {
    const [modal, setModal] = useState('false'); 
    const [userProfile, setUserProfile] = useState({
        userId: 0,
        userName: '',
        userPoint: 0,
        reserveDTO: [],
        profileImageUrl: ''
      });

      const [userInfo, setUserInfo] = useState({
        token: '',
        userEmail: '',
        userName : '',
        userGrade : '',
        userId : '',
        userPhone : ''
      });
    
    
    const fetchUserInfo = async () => {
        const res = await fetch(`${API_BASE_URL}${USER}/user-mylist`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')}
        });

        if (res.status === 200) {
            const json = await res.json(); // JSON 데이터 파싱
            console.log(json);
            setUserProfile(json);
            console.log(userProfile);

            /*
            // 서버에서 직렬화된 이미지가 응답된다.
            const profileBlob = await res.blob();
            // 해당 이미지를 imgUrl로 변경
            const imgUrl = window.URL.createObjectURL(profileBlob);
            setProfileUrl(imgUrl);
            */
        } else {
        }
      };

      


    useEffect(() => {
        // const user = getLoginUserInfo();
        // setUserInfo(user);
        // console.log(userInfo);
        // 배 정보를 가져오는 함수
        const user = getLoginUserInfo();
        setUserInfo(user);
        fetchUserInfo();
        // fetchShipInfo();
      }, []);

  return (
        <section className='MyPageMainBox'>
            <div className='mainbox1'>
                    
                    <div className='mychoicebox'>
                        <div className='mpTitle'>
                            <h1>마이페이지</h1>
                        </div>
                        <div className='ownerTap'>
                            {userInfo.userGrade==='OWNER' &&(<Link to={'/mpbt'}><h1>⛵ 배</h1></Link>)}

                            {userInfo.userGrade==='OWNER' &&(<Link to={'/mpbt'}><h1>🚩 낚시터</h1></Link>)}
                            {/* {userInfo.userGrade==='OWNER' &&(<Link to={'/mpclass'}><h1>📚 클래스</h1></Link>)} */}
                        </div>
                    </div>
                    <div className='userinfobox'>
                        <div className='userinfoWrap'>
                            <div className='profilebox'>
                                <img className="my-profile" title="마이페이지" src={userProfile.profileImageUrl || require('./../icons/defaultProfile.png')}/>
                            </div>
                            <div className='userWrap userMain'>
                                <p>이름</p>
                                <p>나의 등급</p>
                                <p>이메일</p>
                                <p>연락처</p>
                            </div>
                            <div className='userWrap userEtc'>
                                <div className='userName'>{userInfo.userName}</div>
                                <div>{userInfo.userGrade}</div>
                                <div>{userInfo.userEmail}</div>
                                <div>{userInfo.userPhone}</div>
                            </div>
                        </div>
                        <div className='btnboxMain'>
                        {/* <button className='isbtn'><Link to={'/myquery'}>글 등록하기</Link></button> */}
                        <button><Link to={'/myinfo'}>개인 정보 수정</Link></button>
                        </div>
                    </div>
                    
                {userInfo.userGrade==='OWNER'&&(
                <div className='rvbox'>
                    <h2>리뷰 현황</h2>
                    <MpReviewList />
                </div>
                )}
                {userInfo.userGrade==='COMMON'&&(
                <div className='rvbox'>
                    <h2>리뷰 현황</h2>
                    <MpReviewList />
                </div>
                )}
                <div className='rvbox2'>
                    <div className='inner-rvbox2 btbox'>
                        <div>
                            <h2>예약 현황</h2>
                            <p>아직 작성된 글이 없습니다</p>
                            {/* <MpRvlist/> */}
                        </div>
                        <div>
                        <button className='mp-isbtn'onClick={ () => {setModal(true)} }>등록하러 가기</button>
                            {modal === true ? <RegiModal closeModal={() => setModal(false)} /> : null}
                        </div>
                    </div>
                </div>
            </div>
        
                <MpList style={{position:"fixed"}} />
        </section>
    )
}

export default MpMain