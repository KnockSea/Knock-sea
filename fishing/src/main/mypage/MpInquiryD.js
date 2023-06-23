import React, { useState, useEffect } from 'react'
import './MpScss/MpInquiryD.scss'
import { getLoginUserInfo } from '../util/login-util';

function MpInquiryD() {

    const [content, setContent] = useState('');
    const [token, setToken] = useState(getLoginUserInfo().token);
    const handleContentChange = (event) => {
        setContent(event.target.value);
        // console.log(event.target.value);
      };

    const handleSubmit = () => {
        const data = {
            answerDetails: content,
            // inquiryId: id
          };

          fetch('http://localhost:8012/api/v1/answers/makeAnswer', {
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

// const fetchData = () => {
//     fetch(`http://localhost:8012/api/v1/answers/?inquiryId=${inquiryId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + token
//       }
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data) {

//         setInquiries(data.inquiries);
//       } else {
//         // 처리할 에러에 대한 로직 추가
//       }
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   };



  return (
    <session>

        <h1>문의 상세게시판</h1>
        
        <div className='inquiryTitle'>문의 제목</div>
        <div className='inquiryDetail'>문의 내용</div>

        <li>
            <div className='answerDetail'>답변</div>
        </li>
        <div className='form-wrapper'>
            
            <form className='insert-form'>
                <input type='text' placeholder='답변 입력 후 엔터를 누르세요!' value={content} onChange={handleContentChange} />
            </form>
        </div>
        <button className='insert-btn' onClick={handleSubmit}>
            등록하기
        </button>   

    </session>
  )
}

export default MpInquiryD