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


  // //비밀번호 저장하는 함수
  // const inputuserpassword = e =>{
  //   setUserPassword(e.target.value);
  //   console.log(userPassword);
  // }



  // //회원탈퇴하는 함수
  // const deleteuser = () => {

  //   (async () => {

  //     const userDeleteRequest = {
  //       userEmail: userInfo.userEmail, // Fill in the user email
  //       userPassword: userPassword // Fill in the user password
  //     };

  //     const res = await fetch('http://localhost:8012/api/v1/user/userDelete', {
  //       method: 'DELETE',
  //       headers: { 'Authorization': 'Bearer ' + getLoginUserInfo().token},
  //       body: JSON.stringify(userDeleteRequest)
  //     });
  
  //     if (res.status === 200) {
  //       const json = await res.json(); // JSON 데이터 파싱
  //       alert(json);
  //       /*
  //       // 서버에서 직렬화된 이미지가 응답된다.
  //       const profileBlob = await res.blob();
  //       // 해당 이미지를 imgUrl로 변경
  //       const imgUrl = window.URL.createObjectURL(profileBlob);
  //       setProfileUrl(imgUrl);
  //       */
  //     } else {
  //     }
  //   })();
  // };

  useEffect(() => {
    // const user = getLoginUserInfo();
    // setUserInfo(user);
    // console.log(userInfo);
    // 배 정보를 가져오는 함수
    const user =getLoginUserInfo();
    setUserInfo(user);
    // fetchShipInfo();
  }, []);

  return (
    <ul className='list'>
      <li><Link to={'/my'}>내 정보</Link></li>
      {userInfo.userGrade==='OWNER'&&(<li><Link to={'/host'}>업체정보</Link></li>)}
      {/* <li>리뷰게시판</li> */}
      <li className='my'>예약현황</li>
      <li><Link to={'/myinfo'}>정보 수정하기</Link></li>
      {userInfo.userGrade !=='ADMIN'&&(<li><Link to={'/rvlist'}>내 예약 내역</Link></li>)}
      {userInfo.userGrade !=='ADMIN'&&(<li><Link to={'/iqinput'}>문의하기</Link></li>)}
      <li><Link to={'/inquire'}>문의현황</Link></li>
      {userInfo.userGrade !=='ADMIN'&&(<li><Link to={'/userDrop'}>회원탈퇴하기</Link></li>)}
    </ul>


);
}

export default MpList;