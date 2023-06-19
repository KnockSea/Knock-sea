import React, { useState,useEffect  } from 'react';
import "../scss/Calendar.scss"
import "./scss/ClassModal.scss"
import Calendar from '../Calendar';

const handleLogin = (e) => {
    e.preventDefault();
  
      // 회원가입 서버 요청
     
    };
    
  // 렌더링 후 실행함수
 

function ClassModal({closeModal}) {
  const [value, onChange] = useState(new Date());

    return (
        <div className="modal-overlay">
          <div className="modal-box">
            <button onClick={closeModal} className='close-btn'>X</button>
            <h1>참여 일정을 선택해주세요😀</h1>
            <hr/>
            <div className='calendar'>
              <Calendar className='datePicker'/>
            </div>
            <div className='result'>
                  <ul>
                    <li>선택된 날짜 : </li>
                    <li>선택된 시간 : </li>
                    <li>인원
                      <div></div>
                      <div></div>
                      <div></div>
                    </li>
                  </ul>
                  <div className='total-price'>
                    <span>합계</span>
                    <span>결제 총계</span>
                  </div>

                <p>최종 예약 내역</p>
                <button>결제하기</button>
            </div>
          </div>
        </div>
      );
    }
  export default ClassModal;