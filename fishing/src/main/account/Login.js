import React, { useState } from 'react';
import './scss/Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import naverbtn from '../img/naverbtn1.png';
import kakaobtn from '../img/kakaobtn.png';
// import RegistCalendar from '../product/RegistCalendar';
import { setLoginUserInfo, isLogin } from '../util/login-util';
import { API_BASE_URL, USER } from '../../config/host-config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirection = useNavigate();

  // if (isLogin()) {
    //   alert('이미 로그인 중입니다.');
    //   window.history.back();
    //   return;
    // }

  const fetchLogin = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}${USER}/signin`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          userEmail: email,
          userPassword: password
        })
      });
  
      if (res.status === 400) {
        const text = await res.text();
        alert('🤔 이메일 또는 비밀번호를 확인해주세요!');
        return;
      }
  
      const userInfo = await res.json();
      setLoginUserInfo(userInfo);
      alert('🐟🐠환영합니다!!!🦑🐡');
      redirection('/');
      
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다😓 다시 시도해주세요!');
    }
  };


  
  // 로그인 요청
  const handleLogin = e => {
    e.preventDefault();
  
    // 서버에 로그인 요청 전송
    fetchLogin();

   
  };

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
                      maxLength="30"
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
                    {/* <input type="checkbox" id="auto-login" name="autoLogin" />
                    <label htmlFor="auto-login" className="auto-login">로그인 유지</label> */}
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
