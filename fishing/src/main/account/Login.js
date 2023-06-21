import React, { useState } from 'react';
import './scss/Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import naverbtn from '../img/naverbtn1.png';
import kakaobtn from '../img/kakaobtn.png';
// import RegistCalendar from '../product/RegistCalendar';
import { setLoginUserInfo} from '../util/login-util';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirection = useNavigate();

  const fetchLogin = async() => {

     const res = await fetch('http://localhost:8012/api/v1/user/signin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        userEmail: email,
        userPassword: password
      })
    });

    if (res.status === 400) { // 가입이 안되어있거나, 비번틀린 경우
      const text = await res.text(); // 서버에서 온 문자열 읽기
      alert(text);
      return;
    }

    const userInfo = await res.json();

    setLoginUserInfo(userInfo);

    console.log('성공했닝?');
    console.log(userInfo);

    // 홈으로 리다이렉트
    redirection('/');
  };


  // 로그인 요청 핸들러
  const handleLogin = e => {
    e.preventDefault();

    // 서버에 로그인 요청 전송
    fetchLogin();

  };

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   // 로그인 서버 요청
  //   if (email && password) {
  //     const userData = {
  //       email,
  //       password
  //     };
  //     console.log(userData);

  //     // fetch를 사용하여 로그인 요청 보내기
  //     fetch('http://localhost:8012/api/v1/user/signin', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(userData)
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         // 로그인 성공 시 처리할 로직 작성
  //         console.log('로그인 성공:', data);
  //         alert('로그인에 성공했습니다!🤗🎀');
  //         // 로그인 성공 후 리다이렉트 등을 수행할 수 있습니다.
  //         redirection('/');
  //       })
  //       .catch(error => {
  //         // 로그인 실패 시 처리할 로직 작성
  //         console.error('로그인 실패:', error);
  //         alert('로그인에 실패했습니다😓 다시 시도해주세요!');
  //       });
  //   } else {
  //     alert('이메일과 비밀번호를 입력해주세요.');
  //   }
  // };

  return (
    <div className="container">
      <div className="sign-in-wrap">
        <div id="sign-in-header">
          <div className="header">로그인</div>
          <img className="login-img" src="https://cdn-icons-png.flaticon.com/128/6195/6195312.png" id="SignInImg" alt="login-img" />
          <div className="head2">
            <p><span>KNOCK_SEA</span>로 함께 DEEP-DIVE!</p>
          </div>
        </div>

        <div className="sign-in-body">
          <form onSubmit={handleLogin} id="signInForm" encType="multipart/form-data">
            <ul>
              <div className="signIn-input">
                <li>
                  <div>
                    <input
                      type="text"
                      name="account"
                      id="accound-id"
                      className="form-control"
                      maxLength="20"
                      required="required"
                      aria-required="true"
                      placeholder="이메일 입력"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span id="idChk"></span>
                  </div>
                </li>
                <li>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    size="17"
                    maxLength="20"
                    className="form-control"
                    max="20"
                    required="required"
                    aria-required="true"
                    placeholder="비밀번호 입력"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </li>
                <li className='login-etc'>
                  <div>
                    <input type="checkbox" id="auto-login" name="autoLogin" />
                    <label htmlFor="auto-login" className="auto-login">로그인 유지</label>
                  </div>
                  <div>
                    <Link to="/join" className="sign-up">🌊회원가입</Link>
                  </div>
                </li>
              </div>
              <div id="sign-btn">
                <li>
                  <div id="btn" className="sign-in-btn">
                    <button className="sign-btn">로그인</button>
                  </div>
                </li>
              </div>
              <div className="line_lr"> SNS 로그인 이용 </div>
              <div id="sign-btn">
                <li>
                  <div id="btn" className="sign-in-btn">
                    <Link><img className="kakao-btn" src={kakaobtn} alt="kakao-btn" /></Link>
                    <Link><img className="naver-btn" src={naverbtn} alt="naver-btn" /></Link>
                  </div>
                </li>
              </div>
            </ul>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Login;
