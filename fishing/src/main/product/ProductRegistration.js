import React, { useState } from 'react';
import './scss/ProductRegistration.scss';
import RegiTime from './RegiTime.js';
import Post from '../account/Post';
import "react-date-range/dist/styles.css"; 
import 'react-date-range/dist/theme/default.css'; 
import Calendar from './RegiCalendar';
import TimeConverter from './Time';
import { useNavigate } from 'react-router-dom';



function ProductRegistration() {
  const [productCategory, setProductCategory] = useState('');
  const [photo1, setPhoto1] = useState('');
  const [photo2, setPhoto2] = useState('');
  const [title, setTitle] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [userAddress, setuserAddress] = useState('주소 검색 클릭');
  const [userFullAddress, setuserFullAddress] = useState('');
  const [price, setPrice] = useState('');
  const [maxUser, setMaxUser] = useState('');
  const [ranges, setRanges] = useState(null);
  const [timeBoxes, setTimeBoxes] = useState([1]);
  const [startTimes, setStartTimes] = useState([]);
  const [endTimes, setEndTimes] = useState([]);
  const [regTimes, setRegTimes] = useState([]);
  const [service, setService] = useState('');
  const [eduLevel, setEduLevel] = useState('');
  const [popup, setPopup] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const navigate = useNavigate();


  // 이미지파일 2개 받기 
  const handlePhoto1Change = (event) => {
    const file = event.target.files[0];
    setPhoto1(file);
  };

  const handlePhoto2Change = (event) => {
    const file = event.target.files[0];
    setPhoto2(file);
  };

  // 주소 값 받아옴
  const getAddressCom = (userAddress) => {
     setuserAddress(userAddress)
  };
  
  // 날짜 값 받아옴
  const handleGetDateRange = (ranges) => {
    setRanges(ranges);
    // console.log("날짜 데이터 확인:", ranges);
 };

// 시간값 props & 베열생성
 function handleTimeChange(timeString) {
  const [startTime, endTime] = timeString.split(' - ');
  setStartTimes([...startTimes, startTime]);
  setEndTimes([...endTimes, endTime]);
  console.log('Received time:', startTimes, endTimes);
}

  // 시간 박스 생성
  const addTimeBox = () => {
    setTimeBoxes([...timeBoxes, timeBoxes.length + 1]);
  };


    // 서버에 보낼 FormData 객체 생성
    const formData = new FormData();
    formData.append('productCategory', productCategory);
    formData.append('photo1', photo1);
    formData.append('photo2', photo2);
    formData.append('title', title);
    formData.append('productInfo', productInfo);
    formData.append('address', userAddress);
    formData.append('fullAddress', userFullAddress);
    formData.append('price', price);
    formData.append('maxUser', maxUser);
    formData.append('dateRange', JSON.stringify(ranges));
    formData.append('startTimes',startTimes);
    formData.append('endTimes', endTimes);
    formData.append('service', service);
    formData.append('eduLevel', eduLevel);
    
  console.log("===================== formDate값 =====================");
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

 // 취소버튼
  const handleCancel = () => {
    navigate('/my'); // '/my' 경로로 이동
  };

  const handleProductRegi = async (e) => {
    e.preventDefault();
    alert("예약등록이 완료되었습니다!")
    navigate('/');
  };

   try {
  // fetch를 사용하여 서버로 데이터 전송
    const response = await fetch('서버 주소', {
     method: 'POST',
      body: formData,
    });

     // 응답 결과 확인
      if (response.ok) {
        // 성공적으로 데이터가 전송되었을 때 처리할 내용
        console.log('데이터 전송 성공!');
      } else {
        // 데이터 전송 실패 시 처리할 내용
        console.error('데이터 전송 실패!');
      }
    } catch (error) {
      // 에러 처리
      console.error('데이터 전송 중 오류 발생:', error);
    }
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
                <select
                    value={productCategory}
                    onChange={(e) => {
                      setProductCategory(e.target.value);
                      if (e.target.value === "EDU") {
                        setShowDifficulty(true); // 클래스 카테고리 선택 시 난이도 옵션 표시
                      } else {
                        setShowDifficulty(false); // 다른 카테고리 선택 시 난이도 옵션 숨김
                      }
                    }}
                    required
                    aria-required="true"
                    className="category-custom-select"
                  >
                    <option value="">카테고리 선택</option>
                    <option value="SHIP">선박</option>
                    <option value="SPOT">낚시터</option>
                    <option value="EDU">클래스</option>
                  </select>
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
                <div className="regi-title">
                  내용 <span className="imp">*</span>
                </div>
                <div>
                  <textarea
                    value={productInfo}
                    onChange={(e) => setProductInfo(e.target.value)}
                    className="form-control"
                    required
                    aria-required="true"
                    style={{height:"200px"}}
                    placeholder="해당 상품의 기재 내용을 상세히 작성해주세요."
                  />
                </div>
              </li>
              <li>
                <div className="regi-title">장소<span className="imp">*</span></div>
                <div className='form-control' style={{display:"flex", justifyContent:"space-between"}}>
                   <span className='postSee'  style={{width:"250px", textAlign:"left", fontSize:"16px",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{userAddress}</span>
                    <div
                      className="postSearch"
                      style={{
                        width:"100px", height:"25px", lineHeight:"25px", marginLeft:"30px"
                      }}
                      onClick={()=>{
                        setPopup(!popup)
                      }}
                      >
                        🔍︎ 주소 검색
                        {popup && 
                          <Post getAddress={getAddressCom}/>
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
                </div>
              </li>
              
              <li>
                <div className="regi-title" >날짜선택<span className="imp">*</span></div>
                <div className='calendar'>
                <section className='calendar-box'>
                  <Calendar className='datePicker' onRangeChange={handleGetDateRange}  />
                </section>
                </div>
              </li>
             <br/>
              <li>
                <div className="regi-title">운영 시간<span className="imp">*</span></div>
                <div className='regi-time-wrap'>
                  {timeBoxes.map((boxId) => (
                    <div className="time-box"  key={boxId} style={{margin:'15px'}}>
                    <TimeConverter onTimeChange={handleTimeChange}/>
                    </div>
                   ))}
                </div>
              </li>
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
                </div>
              </li>
              {showDifficulty && (
              <li className='difficulty'>
                <div className="regi-title">난이도<br/><span className="imp" style={{ fontSize: '11px' }}>*클래스만 해당!</span></div>
                <div className='category'>
                  <input
                    id="class-step1"
                    value="LOWER"
                    name="step"
                    type="radio"
                    checked={eduLevel === "초급자 가능"}
                    onChange={(e) => setEduLevel(e.target.value)}
                  />
                  <label htmlFor="class-step1">초급자 가능</label>
                  <input
                    id="class-step2"
                    value="MIDDLE"
                    name="step"
                    type="radio"
                    checked={eduLevel === "중급자 이상"}
                    onChange={(e) => setEduLevel(e.target.value)}
                  />  
                  <label htmlFor="class-step2">중급자 이상</label>
                  <input
                    id="class-step3"
                    value="UPPER"
                    name="step"
                    type="radio"
                    checked={eduLevel === "상급자"}
                    onChange={(e) => setEduLevel(e.target.value)}
                  />
                  <label htmlFor="class-step3">상급자</label>
                </div>
              </li>
            )}
            </ul>
            <div className="product-regi-footer">
              <button type="button" onClick={handleCancel} className="btn">
                취소
              </button>
            
                <button type="submit" className="btn">
                등록완료
                </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>

 );
  }


export default ProductRegistration