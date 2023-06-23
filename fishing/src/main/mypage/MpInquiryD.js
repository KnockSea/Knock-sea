import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './MpScss/MpInquiryD.scss';
import { getLoginUserInfo } from '../util/login-util';

function MpInquiryD() {
  const { inquiryId } = useParams(); // inquiryId 값 가져오기

  const [content, setContent] = useState('');
  const [token, setToken] = useState(getLoginUserInfo().token);

  const handleContentChange = (event) => {
    setContent(event.target.value);
    console.log(inquiryId);
  };

  const handleSubmit = () => {
    const data = {
      answerDetails: content,
      inquiryId: inquiryId, // inquiryId 값 전달
    };

    // 나머지 코드는 동일하게 유지
  };

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
    </session>
  );
}

export default MpInquiryD;