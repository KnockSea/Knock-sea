import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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

    <div className='adminbox'>

        {/* 관리자목록박스  */}
    <div className='mgbox'>
        <div className='mgtitle'>
            <p>관리자</p>
        </div>
        <div className='mglist'>
            <div><Link to='/admin'>배 검증요청</Link></div>
            <div className='ch2'><Link to='/adminFS'>낚시터 검증요청</Link></div>
            <div><Link to='/adminCS'>문의 현황</Link></div>
        </div>
    </div>
        <div className='mgcontentbox'>
            <div className='ctntitle'>KNOCK_SEA 관리자 화면 (답변하기)</div>

            {/* 본문내용 */}
            <div className='ctntext'>
                <div className='ctntextbox1'>
                  <div className='answertext'>
                    {/* 작성자가 문의한 글 보여주는곳 */}
                    {}
                  </div>
                    <div className='adminreplyinput'>

                  <textarea /> 
                  {/* textarea 답변작성 */}
                </div>
                </div>
              
            </div>
                <button><Link to='/adminCS'>답변완료</Link></button>
        </div>
    </div>
</section>
    // <section>
    //   <h1>문의 상세게시판</h1>
    //   <div className='inquiryTitle'>{}</div>
    //   <div className='inquiryDetails'>문의 내용</div>
    //   <li>
    //     <div className='answerDetail'>{answerDetail}</div>
    //   </li>
    //    { getLoginUserInfo().userGrade !== 'ADMIN' &&(
    //     <>
    //   <div className='form-wrapper'>
    //   <form className='insert-form'>
    //     <input
    //       type='text'
    //       placeholder='답변 입력 후 엔터를 누르세요!'
    //       value={content}
    //       onChange={handleContentChange}
    //     />
    //   </form>
    // </div>
    // <button className='insert-btn' onClick={handleSubmit}>
    //   등록하기
    //   </button>
    //   </>            
    //   )}
    // </section>
  );
}

export default MpInquiryD;