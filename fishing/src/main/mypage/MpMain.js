import React from 'react'
import './MpScss/MpMain.scss'
import { Link } from 'react-router-dom'
import MpList from './MpList'
import MpReFormItem from './MpReFormItem'
import MpReviewList from './MpReviewList';
import { useLocation } from "react-router-dom";
import {getLoginUserInfo, isLogin } from '../util/login-util';
import { useEffect } from 'react';
import { useState } from 'react';
import { API_BASE_URL, USER } from '../../config/host-config'


const MpMain = () => {

    const [userProfile, setUserProfile] = useState({
        userId: 0,
        userName: '',
        userPoint: 0,
        reserveDTO: [],
        profileImageUrl: ''
      });


      const [userInfo, setUserInfo] = useState({
        token: '', // Set default value for name
        userEmail: '', // Set default value for email
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
                            {userInfo.userGrade==='OWNER' &&(<Link to={'/mpclass'}><h1>📚 클래스</h1></Link>)}
                        </div>
                    </div>
                    <div className='userinfobox'>
                        <div className='userinfoWrap'>
                            <div className='profilebox'>
                                <img className="my-profile" title="마이페이지" src={userProfile.profileImageUrl || require('./../img/class.jpg')}/>
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
                        <div className='btbox'>
                        {/* <button className='isbtn'><Link to={'/myquery'}>글 등록하기</Link></button> */}
                        <button><Link to={'/myinfo'}>개인 정보 수정</Link></button>
                        </div>
                    </div>



                <div className='rvbox'>
                       <MpReFormItem/>
                </div>

                <div className='rvbox'>
                    <MpReviewList />
                </div>
                )}
                {userInfo.userGrade==='OWNER' &&(<div className='rvbox2'>
                    <div className='inner-rvbox2'>
                        <div>
                            <h2>예약 현황</h2>
                            <p>아직 작성된 글이 없습니다</p>
                        </div>
                        <div>
                        <button className='isbtn'><Link to={'/product'}>NEW 예약 등록</Link></button>
                        </div>
                    </div>
                </div>)}
            </div>
        
                <MpList style={{position:"fixed"}} />
        </section>
    )
}

export default MpMain