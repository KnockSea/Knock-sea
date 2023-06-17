import React, { useState,useEffect  } from 'react';
import './scss/Login.scss';
import { Route, Routes,Link } from 'react-router-dom';
import naverbtn from '../img/naverbtn1.png';
import kakaobtn from '../img/kakaobtn.png';

const handleLogin = (e) => {
    e.preventDefault();
  
      // 로그인 서버요청
     
    };
    
  // 렌더링 후 실행함수
 

function Login() {

    return(
    <div className="container">
        <div className="sign-in-wrap">
            <div id="sign-in-header">
                <div className="header">로그인</div>
                <img className="login-img" src="https://cdn-icons-png.flaticon.com/128/6195/6195312.png" id="SignInImg"/>
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
                                    <input type="text" name="account" id="accound-id" className="form-control"
                                        maxlength="15" required="required" aria-required="true"
                                        placeholder="이메일 입력"/>
                                    <span id="idChk"></span>
                                </div>
                            </li>
                            <li>
                                <input type="password" name="password" id="password" size="17" maxlength="20"
                                    className="form-control" max="20" required="required" aria-required="true"
                                    placeholder="비밀번호 입력"/>
                            </li>
                            <li className='login-etc'>
                                <div>
                                    <input type="checkbox" id="auto-login" name="autoLogin"/>
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
                                   <Link><img className="kakao-btn" src={kakaobtn}/></Link>
                                   <Link><img className="naver-btn" src={naverbtn} alt='naver btn' /></Link>
                                </div>
                                </li>
                            </div>
                            {/* <div className="line_lr"> 신규 이용자 </div>
                            <div id="sign-btn">
                                <li>
                                <div id="btn" className="sign-up-btn">
                                    <Link href="/*" className="sign-btn">회원가입</Link>
                                </div>
                                </li>
                            </div> */}
                     </ul>
                </form>
            </div>
        </div>
    </div>
    
    );
  }
  

  export default Login;