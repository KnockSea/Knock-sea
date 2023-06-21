import React, { useState, useEffect } from 'react';
import "../scss/Calendar.scss"
import "./scss/ClassModal.scss"
import Calendar from '../Calendar';

const handleLogin = (e) => {
    e.preventDefault();
  
      // 회원가입 서버 요청
    };
    
  // 렌더링 후 실행함수
 

function ClassModal({closeModal}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [count, setCount] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [classTimes, setClassTimes] = useState([]);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const formattedDate = selectedDate
  ? selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
  : '';

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  useEffect(() => {
    const fetchClassTimes = async () => {
      try {
        const response = await fetch('서버에서 값 가져오는 API 주소');
        const data = await response.json();
        setClassTimes(data.classTimes); 
      } catch (error) {
        console.log('서버에서 값을 가져오는데 실패했습니다.', error);
      }
    };

    fetchClassTimes(); // 컴포넌트가 마운트되었을 때 서버에서 값들을 가져옴
  }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

    return (
        <div className="modal-overlay">
          <div className="modal-box">
            <button onClick={closeModal} className='close-btn'>X</button>
            <h1 className='select-date'>참여 일정을 선택해주세요😀</h1>
            <hr style={{marginTop:'5px'}}/>
            <div className='calendar'>
              <Calendar className='datePicker' handleDateChange={handleDateChange} />
            </div>
               <div className='class-select-time'>
                <div className='selected-time' onClick={() => handleTimeChange('13:30')}>13:30</div>
                <div className='selected-time' onClick={() => handleTimeChange('15:30')}>15:30</div>
                <div className='selected-time' onClick={() => handleTimeChange('18:30')}>18:30</div>
                
                {classTimes.map((time, index) => (
                <div key={index} className='selected-time' onClick={() => handleTimeChange(time)}>
                {time}
               </div>
                ))}
                </div>
            <div className='result'>
                  <ul  className='result-ul'>
                    <li className='result-li'>
                      <span>선택 날짜</span>
                      <span>{formattedDate}</span>
                    </li>
                     <li className='result-li'>
                      <span>선택 시간</span>
                      <span>{selectedTime}</span>
                     </li>
                    <li className='result-li'>
                      <span>인원</span>
                      <label htmlFor="counter" className="NumberCounter">
                        <button type="button" className="NumberCounter__button" onClick={handleDecrease}>-</button> 
                        <input type="text" name="counter" className="NumberCounter__input" value={count} readOnly/> 
                        <button type="button" className="NumberCounter__button" onClick={handleIncrease}>+</button>
                      </label>
                    </li>
                  </ul>
                  <div className='total-price'>
                    <span>결제 총계 </span>
                    <span> {count*50000}원 </span>
                  </div>

                <p className='total-result'>{formattedDate} {selectedTime} / {count}명</p>
                <button className='class-pay-btn custom-button'
                 >결제하기</button>
            </div>
          </div>
        </div>
      );

    }
  export default ClassModal;