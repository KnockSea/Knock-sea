import React, { useEffect, useState } from 'react'
import './MpScss/MpUserDrop.scss'
import { Link, json } from 'react-router-dom'
import MpModal from './MpModal'
import MpList from './MpList'
import { getLoginUserInfo } from '../util/login-util'

const MpUserDrop = () => {

  const [userInfo, setUserInfo] = useState({
    token: '', // Set default value for name
    userEmail: '', // Set default value for email
    userName : '',
    userGrade : '',
    userId : '',
    userPhone : ''
  });


  const [userPassword,setUserPassword] = useState();
  
 // //비밀번호 저장하는 함수
  const inputuserpassword = e =>{
    setUserPassword(e.target.value);
    // console.log(userPassword);
  }


  useEffect(() => {
  const user = getLoginUserInfo();
   setUserInfo(user)
  }, []);
  return (

   <section className='MyPageMainBox'>
            <div className='mainbox1'>

                        <h1>회원탈퇴하기</h1>
          <div className='itembox'>

            <div className='pw a1'>
                <div className='title'>이메일</div>
                <input value={userInfo.userEmail}/>
            </div>

            <div className='newpw a1'>
            <div className='title' >비밀번호</div>
            <input onChange={inputuserpassword}/>
            </div>
            
    <div className='btnbox'>

            <button className='rb'><Link to={'/my'} className='lk'>돌아가기</Link></button>
          
          
            <button className='update'>
                  <MpModal user={{ email: userInfo.userEmail, password: userPassword }}/>
            </button>
    </div>

            </div>
          </div>
            {/* <ul className='list'>
                <li>업체정보</li>
                <li>리뷰게시판</li>
                <li>예약현황</li>
                <li className='my'>내정보</li>
                <li><Link to={'/myinfo'} className='lk'>정보 수정하기</Link></li>
                <li>내 예약 내역</li>
                <li>문의현황</li>
            </ul> */}
            <MpList/>
        </section>

  )
}

export default MpUserDrop