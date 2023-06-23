import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MpScss/MpInquiryD.scss';
import { getLoginUserInfo } from '../util/login-util';

function MpInquiryD() {
  const { inquiryId } = useParams(); // inquiryId 값 가져오기

  const [content, setContent] = useState('');
  const [token, setToken] = useState(getLoginUserInfo().token);
  const [answerDetail, setAnswerDetail] = useState('');

  const handleContentChange = (event) => {
    setContent(event.target.value);
    console.log(inquiryId);
  };

  const handleSubmit = async () => {
    const data = {
      answerDetails: content,
      inquiryId: inquiryId, // inquiryId 값 전달
    };

    try {
      const response = await fetch(`http://localhost:8012/api/v1/answers/makeAnswer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // 답변 등록이 성공한 경우
        // 추가적인 로직을 작성하거나 페이지를 다시 로드하는 등의 동작을 수행할 수 있습니다.
      } else {
        // 답변 등록이 실패한 경우
        console.log('Failed to submit answer');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAnswerDetail = async () => {
      
      const response = await fetch(`http://localhost:8012/api/v1/answers/${inquiryId}`);
      if (response.ok) {
        const data = await response.json();
        
        setAnswerDetail(data.answerDetails);
      } else {
        console.log('Failed to fetch answer detail');
      }
      
    };

    fetchAnswerDetail();
  }, [inquiryId]);

  return (
    <section>
      <h1>문의 상세게시판</h1>
      <div className='inquiryTitle'>{}</div>
      <div className='inquiryDetails'>문의 내용</div>
      <li>
        <div className='answerDetail'>{answerDetail}</div>
      </li>
       { getLoginUserInfo().userGrade !== 'ADMIN' &&(
        <>
      <div className='form-wrapper'>
      <form className='insert-form'>
        <input
          type='text'
          placeholder='답변 입력 후 엔터를 누르세요!'
          value={content}
          onChange={handleContentChange}
        />
      </form>
    </div>
    <button className='insert-btn' onClick={handleSubmit}>
      등록하기
      </button>
      </>            
      )}
    </section>
  );
}

export default MpInquiryD;