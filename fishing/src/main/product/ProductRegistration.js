import React, { useState } from 'react';
import './scss/ProductRegistration.scss';
import { NativeSelect, FormControl, InputLabel } from '@mui/material';
import RegiCalendar from './RegiCalendar';
import RegiTime from './RegiTime.js';


function ProductRegistration() {
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [photo1, setPhoto1] = useState('');
  const [photo2, setPhoto2] = useState('');
  const [price, setPrice] = useState('');
  const [people, setPeople] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [detailExp, setDetailExp] = useState('');
  const [timeBoxes, setTimeBoxes] = useState([1]);
  const [step1, setStep1] = useState('');
  const [step2, setStep2] = useState('');
  const [step3, setStep3] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');

  const handlePhoto1Change = (event) => {
    const file = event.target.files[0];
    setPhoto1(file);
  };

  const handlePhoto2Change = (event) => {
    const file = event.target.files[0];
    setPhoto2(file);
  };

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const handleMinuteChange = (event) => {
    setSelectedMinute(event.target.value);
  };


  const addTimeBox = () => {
    setTimeBoxes([...timeBoxes, timeBoxes.length + 1]);
  };

 

  const handleOwnerCheck = (e) => {
    e.preventDefault();
    // 등록 처리 로직
    console.log(photo1, photo2);
  };


  return (
    
    <div className="container">
      <div className="product-regi-wrap">
        <div className="product-regi-header">
         <div className="head-title">
          <p>KNOCK_SEA 상품 등록</p>
          <img className="image-82-CzH" src="https://cdn-icons-png.flaticon.com/128/8955/8955326.png" id="SignUpImg" alt="SignUpImg" />
        </div>
        </div>
        <hr/>
        <div className="product-regi-body">
          <form onSubmit={handleOwnerCheck} encType="multipart/form-data">
            <ul>
              <li>
                <div className="regi-title">카테고리<span className="imp">*</span></div>
                <div className='category'>
                  <div className="category-select">선박</div>
                  <div className="category-select">낚시터</div>
                  <div className="category-select">클래스</div>
                </div>
              </li>
              <li>
                <div className="regi-title">메인 사진 추가<span className="imp">*</span></div>
                <div>
                  <div className="filebox">
                  <div className="filebox-upload">
                    <div>
                      <label htmlFor="photo1">사진 선택(1)</label>
                      <input
                        type="file"
                        onChange={(e) => setPhoto1(e.target.files[0])}
                        id="photo1"
                        className="form-control"
                        required
                        aria-required="true"
                        accept="image/*"
                        name="shipConfirmImage"
                      />
                      </div>
                      <span>{photo1 && <p>첨부된 사진 : {photo1.name}</p>}</span>
                    </div>
                    <div className="filebox-upload">
                    <div >
                      <label htmlFor="photo2">사진 선택(2)</label>
                      <input
                        type="file"
                        onChange={(e) => setPhoto2(e.target.files[0])}
                        id="photo2"
                        className="form-control"
                        required
                        aria-required="true"
                        accept="image/*"
                        name="shipConfirmImage"
                        />
                      </div>
                      <span>{photo2 && <p>첨부된 사진 : {photo2.name}</p>}</span>
                    </div>
                  </div>
                  
                </div>
              </li>
              <li>
                <div className="regi-title">제목<span className="imp">*</span></div>
                <div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    size="30"
                    className="form-control"
                    required
                    aria-required="true"
                    placeholder="ex) 입문자도 한 시간만에 낚시 마스터!"
                  />
                </div>
              </li>
              <li>
                <div className="regi-title">장소<span className="imp">*</span></div>
                <div>
                  <input
                    type="text"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    size="30"
                    className="form-control"
                    required
                    aria-required="true"
                    placeholder="ex) 서울특별시 강남구 역삼로 17길 24"
                  />
                </div>
              </li>
              <li>
                <div className="regi-title">가격<span className="imp">*</span></div>
                <div>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control"
                    maxLength="6"
                    required
                    aria-required="true"
                    placeholder="숫자만 입력"
                  />
                  <span id="nameChk"></span>
                </div>
              </li>
              <li>
                <div className="regi-title">인원<span className="imp" >*</span></div>
                <div>
                  <input
                    type="text"
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                    className="form-control"
                    maxLength="6"
                    required
                    aria-required="true"
                    placeholder="숫자만 입력(최대인원)"
                  />
                  <span id="nameChk"></span>
                </div>
              </li>
              <li>
                <div className="regi-title" style={{alignContent:'baseLine'}}>날짜선택<span className="imp">*</span></div>
                <div className='calendar'>
                <section className='calendar-box'>
                  <RegiCalendar className='datePicker'/>
                </section>
                </div>
              </li>
             
              <div>
             
              <li>
                <div className="regi-title">운영일/운영 시간<span className="imp">*</span></div>
                <div className='regi-time-wrap'>
                {timeBoxes.map((boxId) => (
                    <div className="time-box"  key={boxId} style={{marginBottom:'15px'}}>
                   <RegiTime />  
                  </div>
                   ))}
                </div>
              </li>
              </div>
              <li className='plus-btn'>
                <button onClick={addTimeBox}>+</button>
              </li>
              <li>
                <div className="regi-title">세부 설명<span className="imp">*</span></div>
                <div>
                  <input
                    type="text"
                    value={detailExp}
                    onChange={(e) => setDetailExp(e.target.value)}
                    className="form-control"
                    required
                    aria-required="true"
                    placeholder="ex) 장비대여(+10,000원), 미끼 지참 필수, 신분증 지참"
                  />
                  <span id="addressChk"></span>
                </div>
              </li>
              <li className='difficulty'>
                <div className="regi-title">난이도<br/><span className="imp" style={{ fontSize: '11px' }}>*클래스만 해당!</span></div>
                <div className='category'>
                  <input
                    id="class-step1"
                    value={step1}
                    name="platform"
                    type="radio"
                    onChange={(e) => setStep1(e.target.value)}
                  />
                  <label htmlFor="step1">초급자 가능</label>
                  <input
                    id="class-step2"
                    value={step2}
                    name="platform"
                    type="radio"
                    onChange={(e) => setStep2(e.target.value)}
                  />  
                  <label htmlFor="step2">중급자 이상</label>
                  <input
                    id="class-step3"
                    value={step3}
                    name="platform"
                    type="radio"
                    onChange={(e) => setStep3(e.target.value)}
                  />
                  <label htmlFor="step3">상급자</label>
                </div>
              </li>
            
            </ul>
            <div className="product-regi-footer">
              <button type="submit" className="btn">
                취소
              </button>
              <button type="submit" className="btn">
                다음
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default ProductRegistration
