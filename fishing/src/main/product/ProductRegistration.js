import React, { useState } from 'react';
import './scss/ProductRegistration.scss';
import { NativeSelect, FormControl, InputLabel } from '@mui/material';
import RegiCalendar from './RegiCalendar';
import RegiTime from './RegiTime.js';
import Post from '../account/Post';

function ProductRegistration() {
  const [labelType, setLabelType] = useState('');
  const [title, setTitle] = useState('');
  const [userAddress, setuserAddress] = useState('');
  const [userFullAddress, setuserFullAddress] = useState('');
  const [photo1, setPhoto1] = useState('');
  const [photo2, setPhoto2] = useState('');
  const [price, setPrice] = useState('');
  const [maxUser, setMaxUser] = useState('');
  const [service, setService] = useState('');
  const [timeBoxes, setTimeBoxes] = useState([1]);
  const [step1, setStep1] = useState('');
  const [step2, setStep2] = useState('');
  const [step3, setStep3] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');

  const [popup, setPopup] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);

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

  const handleGetDateRange = (dateRange) => {
    setDateRange(dateRange);
  };

 
  // 주소 검색 팝업 
  const getAddress = (userAddress) => {
    setuserAddress(userAddress);
    console.log('getAddr:', userAddress);
  };


  // form 등록
  const handleProductRegi = (e) => {
    e.preventDefault();

    console.log(photo1, photo2);
    console.log(dateRange);
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
          <form onSubmit={handleProductRegi} encType="multipart/form-data">
            <ul>
              <li>
                <div className="regi-title">카테고리 선택<span className="imp">*</span></div>
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
                <div className='form-control' style={{display:"flex", justifyContent:"space-between"}}>
                   <span className='postSee'>{userAddress}</span>
                    <div
                      className="postSearch"
                      style={{width:"100px", height:"25px", lineHeight:"25px", marginLeft:"30px"}}
                      onClick={()=>{
                        setPopup(!popup)
                      }}
                      >
                        🔍︎ 주소 검색
                        {popup && 
                          <Post getAddress={getAddress}/>
                        } 
                      </div>
                </div>
                 
              </li>
              <li>
              <input
                    type="text"
                    name="userFullAddress"
                    className="form-control"
                    onChange={(e) => setuserFullAddress(e.target.value)}
                    required
                    aria-required="true"
                    placeholder="ex) '345번지' 혹은 '동-호수'"
                    style={{marginLeft : "200px"}}
                  />
              </li>
              <li>
                <div className="regi-title">가격(원)<span className="imp">*</span></div>
                <div>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control"
                    maxLength="6"
                    required
                    aria-required="true"
                    placeholder="숫자만 입력"
                  />
                </div>
              </li>
              <li>
                <div className="regi-title">인원(명)<span className="imp" >*</span></div>
                <div>
                  <input
                    type="number"
                    value={maxUser}
                    onChange={(e) => setMaxUser(e.target.value)}
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
                <div className="regi-title" >날짜선택<span className="imp">*</span></div>
                <div className='calendar'>
                <section className='calendar-box'>
                  <RegiCalendar className='datePicker' getDateRange={handleGetDateRange}  />
                </section>
                </div>
                <span>fnnfkfk{setDateRange}</span>
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
                    value={service}
                    onChange={(e) => setService(e.target.value)}
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
