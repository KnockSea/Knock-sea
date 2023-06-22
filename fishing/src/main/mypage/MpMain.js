import React from 'react'
import './MpScss/MpMain.scss'
import { Link } from 'react-router-dom'
import MpList from './MpList'
import { useLocation } from "react-router-dom";
import {getLoginUserInfo, isLogin } from '../util/login-util';
import { useEffect } from 'react';
import { useState } from 'react';


const MpMain = () => {

  const [profileUrl,setProfileUrl] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(isLogin()); 

  const [userInfo, setUserInfo] = useState({
    token: '', // Set default value for name
    userEmail: '', // Set default value for email
    userName : '',
    userGrade : '',
    userId : '',
    userPhone : ''
  });

  const resetStorage = () =>{
    const confirm =window.confirm('정말 로그아웃하시겠어요?');
    if(confirm){
      setIsLoggedIn(isLogin());
      localStorage.clear();
    }
    return ;
    
  }

  // 로그인 상태 변화를 감지하는 useEffect를 추가
  useEffect(() => {
    const user = getLoginUserInfo();
    setUserInfo(user);
    setIsLoggedIn(!isLogin());
    }, [isLogin()]);

    useEffect(() => {
    
      isLoggedIn &&
      (async() => {
          const res = await fetch('http://localhost:8012/api/v1/user/load-s3', {
              method: 'GET',
              headers: { 'Authorization': 'Bearer ' + getLoginUserInfo().token }
          });
      
          if (res.status === 200) {
              // 서버에서 s3 url이 응답된다
              const imgUrl = await res.text();
              setProfileUrl(imgUrl);
  
              
              // //서버에서 직렬화된 이미지가 응답된다.
              // const profileBlob = await res.blob();
              //  //해당 이미지를 imgUrl로 변경
              // const imgUrl = window.URL.createObjectURL(profileBlob);
              // setProfileUrl(imgUrl);
              
          } else {
              const err = await res.text();
              setProfileUrl(null);
          }
        })();
      }, []);
    
    

  return (
        <section className='MyPageMainBox'>
            <div className='mainbox1'>
                    
                    <div className='mychoicebox'>
                        <h1>마이페이지</h1>
                        <h1><Link to={'/mpbt'}>배</Link></h1>
                        <h1><Link to={'/mpfs'}>낚시터</Link></h1>
                        <h1><Link to={'/mpclass'}>클래스</Link></h1>
                    </div>
                   
                   
                    <div className='userinfobox'>
                        <div className='profilebox'>
                            <img src={profileUrl || require('./../img/fs.jpg')} style={{ width: '100%', height: 'auto' }} />
                        </div>
                    
                        <div className='btbox'>
                        {/* <button className='isbtn'><Link to={'/myquery'}>글 등록하기</Link></button> */}
                        <button><Link to={'/myinfo'}>개인 정보 수정</Link></button>
                        </div>
                    </div>


                {/* <div className='rvbox'>
                        <h2>리뷰 게시판</h2>
                        <p>아직 작성된 리뷰가 없습니다</p>
                </div> */}

                <div className='rvbox2'>
                    <div className='inner-rvbox2'>
                        <div>
                            <h2>예약 현황</h2>
                            <p>아직 작성된 글이 없습니다</p>
                        </div>
                        <div>
                        <button className='isbtn'><Link to={'/product'}>NEW 예약 등록</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        
                <MpList />
        </section>
    )
}

export default MpMain