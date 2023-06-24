import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './MpScss/MpInquiryD.scss';
import { getLoginUserInfo } from '../util/login-util';

function MpInquiryD() {


  // useEffect(() => {
  //   fetchInquiries();
  // }, []);

  // const fetchInquiries = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8012/api/v1/answers/${inquiryId}`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setInquiries(data.inquiries);
  //     } else {
  //       throw new Error('Failed to fetch inquiries');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



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

  );
}

export default MpInquiryD;