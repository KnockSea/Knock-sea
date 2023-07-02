import React from 'react';
import { Link, Route, Routes  } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { getLoginUserInfo } from '../util/login-util';
const MpList = () => {

  
  //비밀번호 값 담을 객체
  const [userPassword, setUserPassword] = useState();

  const [userInfo, setUserInfo] = useState({
    token: '', // Set default value for name
    userEmail: '', // Set default value for email
    userName : '',
    userGrade : '',
    userId : '',
    userPhone : ''
  });


  useEffect(() => {
    const user =getLoginUserInfo();
    setUserInfo(user);
  }, []);

  return (
    <ul className='list'>
      <li><Link to={'/my'}>내 정보</Link></li>
      {/* {userInfo.userGrade==='OWNER'&&(<li><Link to={'/host'}>업체정보</Link></li>)} */}
      {/* <li>리뷰게시판</li> */}
      {/* <li className='my'>예약현황</li> */}
      <li><Link to={'/myinfo'}>정보 수정하기</Link></li>
      {userInfo.userGrade !=='ADMIN'&&(<li><Link to={'/rvlist'}>내 예약 내역</Link></li>)}
      {userInfo.userGrade !=='ADMIN'&&(<li><Link to={'/iqinput'}>문의하기</Link></li>)}
      {userInfo.userGrade !=='ADMIN' ? (<li><Link to={'/inquire'}>문의현황</Link></li>)
      : (<li><Link to={'/adInquire'}>문의현황</Link></li>)}
      {userInfo.userGrade !=='ADMIN'&&(<li><Link to={'/userDrop'}>회원탈퇴하기</Link></li>)}
      {/* <li><Link to={'/reviewList'}>리뷰게시판</Link></li> */}
    </ul>


);
}

export default MpList;