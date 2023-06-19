import React, { useState,useEffect  } from 'react';
import './scss/SignUpForm.scss';
import { Route, Routes } from 'react-router-dom';
import Post from './Post';
import ProfileUpload from './ProfileUpload';


function SignUpForm(){

  // 상태변수 관리들
  const [userValue, setUserValue] = useState({
    userEmail: false, 
    userPassword: false, 
    userAddress: "주소 검색을 클릭해주세요",
    userFullAddress: false,
    userName: false,
    userPhone: false
  });

  const [popup, setPopup] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const setAddress = (userAddress) => {
    setUserValue((prevState) => ({
      ...prevState,
      userAddress: userAddress
    }));
  };


  const [message, setMessage] = useState({
    userEmail: false, 
    userPassword: false,
    userPasswordChk: false,
    userFullAddress: false,
    userName: false,
    userPhone: false
  });

    // 검증 완료 체크에 대한 상태변수 관리
  const [correct, setCorrect] = useState({
      userEmail: false, 
      userPassword: false, 
      userPasswordChk: false,
      userName: false,
      userPhone: false
  });
  

// 검증데이터를 상태변수에 저장하는 함수
  const saveInputState=({
    key, inputVal, flag, msg})=>{
    inputVal !== 'pass' && setUserValue({
    ...userValue,
    [key]: inputVal
  });

  setMessage({
    ...message,
    [key] : msg
  });

  setCorrect({
    ...correct,
    [key]: flag
  });
}

  // 회원가입페이지 입력 검증
  // 이메일 입력
  const emailHandler = e => {

    const inputVal = e.target.value;
    const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    let msg;
    let flag;
    if(!inputVal) {
      msg = '이메일(ID로 사용)을 작성해주세요.';
      flag = false;
    } else if(!emailRegex.test(inputVal)){
      msg = '이메일 형식에 맞게 작성해주세요.';
      flag = false;
    } else{
      // 이메일 중복체크 로직작성
      msg = '🙆🏻‍♂️';
      flag = true;
    }
    saveInputState({  
      key: 'userEmail',
      inputVal,
      msg,
      flag
    });
  };

  // 패스워드 입력
  const passwordHandler = e => {

    // 패스워드가 변동되면 확인란 비우기
    document.getElementById('userPasswordChk').value ='';
    document.getElementById('check-span').textContent ='';

    setMessage({...message, userPasswordChk:''});
    setCorrect({...correct, userPasswordChk: false});

    const inputVal = e.target.value;
    const pwdRegex = /([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9]).{8,}/;
    let msg;
    let flag;
    if(!inputVal) {
      msg = '비밀번호를 작성해주세요.';
      flag = false;
    } else if(!pwdRegex.test(inputVal)) {
      msg = '특수문자 포함 8자 이상 작성해주세요.';
      flag = false;
    } else {
      msg = '🙆🏻‍♂️';
      flag = true;
    }
    
    saveInputState({
      key: 'userPassword',
      inputVal,
      msg,
      flag
    });
  };


  // 패스워드 재입력
  const passwordChkHandler = e => {
    const inputVal = e.target.value;
    let msg;
    let flag;
    if(!inputVal) {
      msg = '비밀번호를 작성해주세요.'
      flag = false;
    } else if(userValue.userPassword !== inputVal){
      msg = '비밀번호가 일치하지 않습니다.'
      flag = false;
    } else{
      msg = '🙆🏻‍♂️'
      flag = true;
    }
    
    saveInputState({
      key: 'userPasswordChk',
      inputVal: 'pass',
      msg,
      flag
    });
  };

  // 이름 입력창 체인지 이벤트 핸들러
  const nameHandler = e => {
    // console.log(e.target.value);
    const nameRegex = /^[가-힣]{2,10}$/;
    
    // 입력값 검증
    const inputVal = e.target.value;
    let msg; // 검증 메시지를 저장할 변수
    let flag; // 입력 검증 체크 변수

    if(!inputVal) {
      msg = '이름을 작성해주세요.'
      flag = false;
    } else if(!nameRegex.test(inputVal)){
      msg = '2~5글자의 실명을 작성해주세요.'
      flag = false;
    } else{
      msg = '🙆🏻‍♂️'
      flag = true;
    }

    saveInputState({  
      key: 'userName',
      inputVal,
      msg,
      flag
    });
  };

  const userPhoneHandler = e => {
    const phoneRegex = /^01[0-9]{8,9}$/;
    const inputVal =e.target.value;
    let msg;
    let flag;
    if(!inputVal) {
      msg = '핸드폰 번호를 작성해주세요.'
      flag = false;
    } else if(!phoneRegex.test(inputVal)){
      msg = '형식에 맞게 작성해주세요.'
      flag = false;
    } else{
      msg = '🙆🏻‍♂️'
      flag = true;
    }
    saveInputState({  
      key: 'userPhone',
      inputVal,
      msg,
      flag
    });
  };

  const userFullAddressHandler = e => {
    const nameRegex = /^[가-힣][0-9]{5}$/;
    const inputVal = e.target.value;
    let msg; 

    if(!inputVal) {
      msg = '상세주소를 작성해주세요.'
    } else{
      msg = '🙆🏻‍♂️'
    }

    saveInputState({  
      key: 'userFullAddress',
      inputVal,
      msg
    });
  };
      

    // 4개의 입력칸이 모두 검증에 통과했는지 여부 검사
    const isValid = () => {
      for(const key in correct) {
        const flag = correct[key];
        if(!flag) return false;
      } 
      return true;
    };

  const handleSignUp = (e) => {

    // 이미지 파일과 회원정보 JSON을 하나로 묶어야 함
    e.preventDefault();
  
      // 회원가입 서버 요청
      if(isValid()) {
        const userData = new FormData();
        userData.append('userEmail', userValue.userEmail);
        userData.append('userPassword', userValue.userPassword);
        userData.append('userAddress', userValue.userAddress);
        userData.append('userFullAddress', userValue.userFullAddress);
        userData.append('userName', userValue.userName);
        userData.append('userPhone', userValue.userPhone);
        userData.append('profileImage', profileImage);
    
        // fetch를 사용하여 회원가입 요청 보내기
        fetch('account/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })
          .then(response => response.json())
          .then(data => {
            // 회원가입 성공 시 처리할 로직 작성
            console.log('회원가입 성공:', data);
            alert('회원가입이 완료되었습니다.');
            // 회원가입 완료 후 리다이렉트 등을 수행할 수 있습니다.
          })
          .catch(error => {
            // 회원가입 실패 시 처리할 로직 작성
            console.error('회원가입 실패:', error);
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
          });
      } else {
        alert('입력란을 다시 확인해주세요!');
      }
    };
    


  
  

  return (
    <div className="container">
      <div className="sign-up-wrap">
        <div className="sign-up-header">
          <div className="header">회원 가입</div>
          <img className="image-82-CzH" src="https://cdn-icons-png.flaticon.com/128/5778/5778669.png" id="SignUpImg"/>
          <div className="head2">
            <p><span>KNOCK_SEA</span>의 회원이 되어보세요.</p>
          </div>
        </div>

        <div className="sign-up-body">
          <form onSubmit={handleSignUp} encType="multipart/form-data">
            <div className="profile">
             <ProfileUpload/>
            </div>

            <ul className='sign-up-input'>
              <li>
                <div>이메일</div>
                <div>
                  <input
                    type="text"
                    name="userEmail"
                    onChange={emailHandler}
                    className="form-control"
                    maxLength="15"
                    required
                    aria-required="true"
                    placeholder="계정으로 사용할 이메일 입력"
                  />
                  <span className="chkSpan" id="emailChk">{message.userEmail}</span>
                </div>
              </li>
              <li>
                <div>비밀번호</div>
                <div>
                  <input
                    type="password"
                    name="userPassword"
                    onChange={passwordHandler}
                    size="17"
                    maxLength="20"
                    className="form-control"
                    required
                    aria-required="true"
                    placeholder="8자 이상 영문과 특수문자 조합"
                  />
                  <span className="chkSpan" id="PWChk">{message.userPassword}</span>
                </div>
              </li>
              <li>
                <div>비밀번호 확인</div>
                <div>
                  <input
                    type="password"
                    name="userPasswordChk"
                    id="userPasswordChk"
                    onChange={passwordChkHandler}
                    size="17"
                    maxLength="20"
                    className="form-control"
                    required
                    aria-required="true"
                    placeholder="비밀번호 재입력"
                  />
                  <span className="chkSpan" id="check-span">{message.userPasswordChk}</span>
                </div>
              </li>
              <li>
                <div>이름</div>
                <div>
                  <input
                    type="text"
                    name="userName"
                    className="form-control"
                    maxLength="5"
                    required
                    aria-required="true"
                    placeholder="이름(실명)을 입력하세요"
                    onChange={nameHandler}
                  />
                  <span 
                  id="nameChk" 
                  className="chkSpan"
                  >
                    {message.userName}
                  </span>
                </div>
              </li>
              <li>
               <div>주소</div>
               <div className='form-control'>
               <span className='postSee'>{userValue.userAddress}</span>
                  <div
                    className="postSearch"
                    onClick={()=>{
                      setPopup(!popup)
                    }}
                    >
                      🔍︎ 주소 검색
                      {popup && 
                        <Post userAddress={userValue.userAddress} setAddress={setAddress}/>
                        } 
                      </div>
                </div>
              </li>
              <li>
                <div>상세 주소</div>
                <div>
                <input
                    type="text"
                    name="userFullAddress"
                    className="form-control"
                    onChange={userFullAddressHandler}
                    required
                    aria-required="true"
                    placeholder="ex) '345번지' 혹은 '동-호수'"
                  />
                  <span className="chkSpan" id="check-span">{message.userFullAddress}</span>
                  </div>        
              </li>
              
              <li>
                <div>휴대폰 번호</div>
                <div>
                  <input
                    type="tel"
                    name="userPhone"
                    onChange={userPhoneHandler}
                    className="form-control"
                    required
                    aria-required="true"
                    maxLength="15"
                    placeholder="'-' 없이 입력해 주세요"
                  />
                  <span className="chkSpan" id="phoneChk">{message.userPhone}</span>
                </div>
              </li>

            </ul>
            <div className="sign-up-btn">
              <button type="submit" className="btn">
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default SignUpForm;