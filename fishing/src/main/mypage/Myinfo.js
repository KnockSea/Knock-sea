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
import { useNavigate } from "react-router-dom";




function Myinfo () {

  const [userInfo, setUserInfo] = useState({
    token: '', // Set default value for name
    userEmail: '', // Set default value for email
    userName : '',
    userGrade : '',
    userId : '',
    userPhone : ''
  });

  const [userAddress, setuserAddress] = useState('');
  const [userFullAddress, setuserFullAddress] = useState('');
  const [popup, setPopup] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  console.log(userInfo);
  const [username ,setusername] = useState('');
  const [userphone,setuserphone] = useState('');
  const [useremail,setuseremail] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);



    // console.log(userInfo);
    const handleAddressSearch = () => {
        new window.daum.Postcode({
          onComplete: function(data) {
            // 주소 검색 완료 시 실행되는 콜백 함수
            console.log(data); // 선택된 주소 데이터를 확인하거나 필요한 처리를 수행합니다.
            // 주소 데이터를 원하는 방식으로 처리하고 상태에 저장할 수 있습니다.
          }
        }).open();

      };
    

      const redirection = useNavigate();
      

       //주소 얻어오는 함수
      const getAddress = (userAddress) => {
        setuserAddress(userAddress);
        console.log('getAddr:', userAddress);
      };

      //이름 얻어오는 함수
      const usernameHandler = e =>{
        console.log(e.target.value);
        setusername(e.target.value);
      }

      //번호 얻어오는 함수
      const userphoneHandler = e =>{
        console.log(e.target.value);
        setuserphone(e.target.value);
      }

      //이메일 값 얻어오는 함수
      const userEmailHandler = e =>{
        console.log(e.target.value);
        setuseremail(e.target.value);
      }
      //사진 파일값 읽어오는 함수
      const handleFileChange = (e) => {
         //첨부된 파일 정보
        const file = e.target.files[0];
        console.log(file);
        setSelectedFile(file);
      };
      

      //서버에 패치요청보내는함수
      //회원정보수정
  const fetchSignUpPost = async () => {

    const user = {
      userEmail: useremail,
      userPhone: userphone,
      userAddress: userAddress,
      userFullAddress: userFullAddress,
      userName: username,
    };

    //JSON을 Blob타입으로 변경후 FormData에 넣기
    const userJsonBlob = new Blob(
      [JSON.stringify(user)],
      {type : 'application/json'}
      );

  //이미지 파일과 회원정보 json을 하나로 묶어야 함
  const userFormData = new FormData();
  userFormData.append('user',userJsonBlob);
  userFormData.append('profileImage', selectedFile);
   //요청 헤더 설정

  const res = await fetch('http://localhost:8012/api/v1/user/modify',{
      method : 'PUT',
      headers: {
        'Authorization': 'Bearer ' + userInfo.token,
      },
      body :  userFormData
    });

    if(res.status===200){
      alert('회원정보수정에 성공했습니다')
      //window.location.href = '/login';
      localStorage.clear();
      redirection('/');
    }else if(res.status==500){
      const errorResponse = await res.json(); // Parse error response as JSON
      alert('이메일이 중복되었습니다!');
    }else{
      alert('서버와의 접속이 원활하지않습니다');
    }
};


      //버튼누르면 수정요청 보내는 함수
      const modifyHandler = () =>{
        const confirm = window.confirm('정말 수정하시겠습니까? (정보수정후에 재 로그인하셔야합니다)');
        if(confirm){
          fetchSignUpPost();
          console.log(userInfo.token);
        }
        return ;
      }

     
  useEffect(() => {
    const user = getLoginUserInfo();
    setUserInfo(user);
    setuserAddress(userInfo.userAddress);
    setuseremail(userInfo.userEmail);
    setusername(userInfo.userName);
    setuserFullAddress(userInfo.userFullAddress);
    setuserphone(userInfo.userPhone);
  }, [getLoginUserInfo,setUserInfo,setuseremail,setusername,setuserFullAddress,setuserphone]);


  return (
    <>
    <section className='MyPageBox'>
    <div className='box1'>

            <h1>정보 수정하기</h1>
            <div className='userbox'>
            <div className='name'>
                <div className='title'>이름</div>
              <div className='inputbox'>  
              <input placeholder="이름" onChange={usernameHandler} value={username} />
              </div>
            </div>

            <div className='email'>
            <div className='title'>이메일</div>
            <input
                placeholder="이메일"
                onChange={userEmailHandler} value={useremail}/> 
                <button className='btn1'><Link to={'/mypassword'}>비밀번호 변경</Link></button> 
            </div>
            <div className='phoneNum'>
            <div className='title'>전화번호</div>
            <input placeholder="전화번호" onChange={userphoneHandler} value={userphone} />

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
                          style={{marginLeft:'10px', fontSize:'15px'}}>
                            {userAddress}
{/* //                           style={{marginLeft:'10px", fontSize:"15px'}}
//                           onChange={(e) => setuserAddress(e.target.value)}
//                             {userAddress}
     */}
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
            <input
              type="file"
              accept="image/*"
              multiple={false}
              onChange={handleFileChange}
            />
            </div>
             
            </div>

                  <div className='updatebtn1'>
                    <button className='updatebtn11' onClick={modifyHandler}>수정하기</button>
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