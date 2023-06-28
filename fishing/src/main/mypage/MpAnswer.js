import React, { useState, useEffect } from 'react';
import MpList from './MpList';
import { getLoginUserInfo } from '../util/login-util';
import { ANSWERS, API_BASE_URL } from '../../config/host-config';

function MpAnswer() {
    
      const [title, setTitle] = useState('');
      const [content, setContent] = useState('');
      const [token, setToken] = useState('');
    
      
      const handleTitleChange = (event) => {
        setTitle(event.target.value);
        // console.log(event.target.value);
        // console.log(token);
      };
    
      const handleContentChange = (event) => {
        setContent(event.target.value);
        // console.log(event.target.value); 
      };
    
      const handleSubmit = () => {
        const data = {
            answerDetails: content,
            inquiryId: id
        };
    
        fetch(`${API_BASE_URL}${ANSWERS}/makeAnswer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(result => {
            // 서버 응답을 처리하는 로직 작성
            console.log(result);
          })
          .catch(error => {
            // 에러 처리 로직 작성
            console.error(error);
          });
      };
    
      // 토큰을 얻어오는 함수 (예시: 로그인 후 토큰 저장)
      const fetchToken = () => {
    
        const token = getLoginUserInfo().token; 
        setToken(token);
      };
    
      // 컴포넌트가 마운트될 때 토큰을 얻어오도록 useEffect를 사용하여 호출
      useEffect(() => {
        fetchToken();
      }, []);
    
      return (
        <section className='MyPageMainBox'>
          <div className='mainbox1'>
            <h1>답변하기</h1>
          
            <div className='myquerybigbox'>
              <div className='titlebox '>
                <div className='clbox'>
                  <div className='cltitle'>제목</div>
                </div>
                <div className='cltextbox' value = {id}>
                </div>
              </div>
    
              <div className='titlebox qtbox2'>
                <div className='clbox exx1'>
                  <div className='cltitle'>내용</div>
                </div>
                <div className='cltextbox qttext'>
                  <textarea value={content} onChange={handleContentChange} />
                </div>
              </div>
    
              <button className='qtUpdatebtn' onClick={handleSubmit}>작성완료</button>
            </div>
          </div>
    
          <MpList />
        </section>
      );
    };

export default MpAnswer