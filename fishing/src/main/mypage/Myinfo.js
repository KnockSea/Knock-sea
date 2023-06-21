import React from 'react';
import './MpScss/Myinfo.scss'
import DaumPostcode from 'react-daum-postcode';
import { Link } from 'react-router-dom';
import Mypassword from './Mypassword';
import MpList from './MpList';
import { useEffect } from 'react'
import { useState } from 'react';
import { getLoginUserInfo } from '../util/login-util';
import Post from '../account/Post';



function Myinfo () {

  const [userInfo, setUserInfo] = useState({
    token: '', // Set default value for name
    userEmail: '', // Set default value for email
    userName : '',
    userGrade : '',
    userId : ''
  });

  const [userAddress, setuserAddress] = useState('');
  const [userFullAddress, setuserFullAddress] = useState('');
  const [popup, setPopup] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);



    console.log(userInfo);
    const handleAddressSearch = () => {
        new window.daum.Postcode({
          onComplete: function(data) {
            // 주소 검색 완료 시 실행되는 콜백 함수
            console.log(data); // 선택된 주소 데이터를 확인하거나 필요한 처리를 수행합니다.
            // 주소 데이터를 원하는 방식으로 처리하고 상태에 저장할 수 있습니다.
          }
        }).open();

      };
    
      const getAddress = (userAddress) => {
        setuserAddress(userAddress);
        console.log('getAddr:', userAddress);
      };

     
  useEffect(() => {
    const user = getLoginUserInfo();
    setUserInfo(user);
  }, []);


  return (
    <>
    <section className='MyPageBox'>
    <div className='box1'>

                <h1>정보 수정하기</h1>
            <div className='userbox'>
            <div className='name'>
                <div className='title'>이름</div>
              <div className='inputbox'>  <input
                placeholder="이름"
                value={userInfo.userName} // userInfo에서 이름값 가져오기
              /> </div>
                <button className='btn1'>변경하기</button> 
            </div>

            <div className='email'>
            <div className='title'>이메일</div>
                <div className='em'>abc@abcd.com</div>
                <button className='btn1'><Link to={'/mypassword'}>비밀번호 변경</Link></button> 

            </div>
            <div className='phoneNum'>
            <div className='title'>전화번호</div>
                <div className='ph'>010-1234-5678</div>
                <button className='btn1'>변경하기</button> 
            </div>

            <div className='addr'>
            <div className='title'>주소</div>
            <div className='post-form'>
              <div style={{display:"flex"}}>
                   
                    <div
                      className="postSearch"
                      style={{width:"100px", height:"25px", lineHeight:"25px", marginLeft:"10px"}}
                      onClick={()=>{
                        setPopup(!popup)
                      }}
                      >
                        🔍︎ 주소 검색
                        {popup && 
                          <Post getAddress={getAddress}/>
                        } 
                       
                      </div>
                      <span 
                          className='postSee' 
                          style={{marginLeft:"10px", fontSize:"15px"}}>
                            {userAddress}
                      </span>
                      </div>
                      <input
                          type="text"
                          name="userFullAddress"
                          className="post-form"
                          onChange={(e) => setuserFullAddress(e.target.value)}
                          required
                          aria-required="true"
                          placeholder="ex) '345번지' 혹은 '동-호수'"
                          style={{margin:"10px", width:"400px"}}
                        />
                </div>

            </div>


            <div className='profile'>
            <div className='title'>프로필 이미지</div>
            <input />
                <button className='btn1'>파일선택</button> 
            </div>
             
            </div>

                  <div className='updatebtn1'>
                    <button className='updatebtn11'>수정하기</button>
                  </div>

    </div>
    {/* <ul className='list'>
        <li>업체정보</li>
        <li>리뷰게시판</li>
        <li>예약현황</li>
        <li className='my'>내정보</li>
        <li><Link to={'/myinfo'}>정보 수정하기</Link></li>
        <li>내 예약 내역</li>
        <li>문의현황</li>
    </ul> */}
    <MpList/>
</section>
</>

  )
}

export default Myinfo