import React, { useState } from 'react';
import MpList from './MpList';

const MpIqInput = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    const data = {
      inquiryDetails: content
    };

    fetch('/api/v1/inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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

  return (
    <section className='MyPageMainBox'>
      <div className='mainbox1'>
        <h1>문의하기</h1>
      
        <div className='myquerybigbox'>
          <div className='titlebox '>
            <div className='clbox'>
              <div className='cltitle'>제목</div>
            </div>
            <div className='cltextbox'>
              <input value={title} onChange={handleTitleChange} />
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

export default MpIqInput;