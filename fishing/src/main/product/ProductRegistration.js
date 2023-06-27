import React, { useState } from 'react';
import './scss/ProductRegistration.scss';
import Post from '../account/Post';
import "react-date-range/dist/styles.css"; 
import 'react-date-range/dist/theme/default.css'; 
import Calendar from './RegiCalendar';
import TimeConverter from './Time';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../util/login-util';
import { getLoginUserInfo } from '../util/login-util';
import { addDays, format, parseISO } from "date-fns";


function ProductRegistration() {

  const [token, setToken] = useState(getLoginUserInfo().token);
  const [productLabelType, setProductCategory] = useState('');
  const [productTitle, setTitle] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [productLocationInfo, setuserAddress] = useState('주소 검색 클릭');
  const [productFullAddress, setuserFullAddress] = useState('');
  const [productPrice, setPrice] = useState('');
  const [timeMaxUser, setMaxUser] = useState('');
  const [timeDate, setRanges] = useState([]);
  const [timeBoxes, setTimeBoxes] = useState([1]);
  const [timeStarts, setStartTimes] = useState([]);
  const [timeEnds, setEndTimes] = useState([]);
  const [productService, setService] = useState('');
  const [eduLevel, setEduLevel] = useState('');
  const [popup, setPopup] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const navigate = useNavigate();
  // const [token, setToken] = useState(getLoginUserInfo().token);
  const [productImages, setImages] = useState([]);

 // 이미지 배열
  const handleImage = e => {
    setImages([...e.target.files]);
  };

  // 주소 값 받아옴
  const getAddressCom = (userAddress) => {
     setuserAddress(userAddress)
  };
  
 // 날짜 값 받아옴
 const handleGetDateRange = (td) => {
  console.log("fnfnfn:", td);
  const { startDate, endDate } = td.selection;
  console.log("두개두개 :", startDate, endDate);
  const dates = [];

  let currentDate = parseISO(startDate);
  const finalDate = parseISO(endDate);

  console.log(currentDate);

  while (currentDate <= finalDate) {
    dates.push(format(currentDate, "yyyy-MM-dd"));
    currentDate = addDays(currentDate, 1);
  }

  // this.setState({ timeDate: dates });
  
  setRanges(dates);

};

  // 시간값 props & 베열생성
  function handleTimeChange(timeString) {
    const [timeStart, timeEnd] = timeString.split(' - ');
    setStartTimes([...timeStarts, timeStart]);
    setEndTimes([...timeEnds, timeEnd]);
    console.log('Received time:', timeStarts, timeEnds);
  }

  // 시간 박스 생성
  const addTimeBox = () => {
    setTimeBoxes([...timeBoxes, timeBoxes.length + 1]);
  };

   // 취소버튼
   const handleCancel = () => {
    navigate('/my'); // '/my' 경로로 이동
  };

    // productDTO 
     const productDTO = {
      productLabelType: productLabelType,
      productTitle: productTitle,
      productInfo: productInfo,
      productLocationInfo: productLocationInfo,
      productFullAddress: productFullAddress,
      productPrice: productPrice,
      timeMaxUser: timeMaxUser,
      timeDate: timeDate,
      timeStart: timeStarts,
      timeEnd: timeEnds,
      productService: productService
    };
  
    const userJsonBlob = new Blob(
      [JSON.stringify(productDTO)],
      { type: 'application/json' }
    );

    // 서버에 보낼 FormData 객체 생성
    const formData = new FormData();
    formData.append('productDTO', userJsonBlob);
    productImages.forEach((image) => {
      formData.append(`productImages`, image);
    });
 
    console.log("===================== formData 값 =====================");
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    console.log(productDTO);
    for (let pair of formData.entries()) {
      console.log('키: ' + JSON.stringify(pair[0]),'밸류: ' + JSON.stringify(pair[1]));
    }

      const handleProductRegi = async (e) => {
        e.preventDefault();
    
        try {
          const res = await fetch('http://localhost:8012/api/v1/products', {
          method: 'POST',
          headers: {'Authorization': 'Bearer ' + token},
          body: formData
          });
          
            if (res.status === 200) {
              alert('등록 성공');
            } else {
              alert(res.status);
            }
          } catch (error) {
            console.error('데이터 전송 실패!');
          }
  };

  return (
    <div className="container">
      <div className="product-regi-wrap">
        <div className="product-regi-header">
         <div className="head-title">
          <p>KNOCK_SEA 선박/낚시터 상품 등록</p>
          <img className="image-82-CzH" src="https://cdn-icons-png.flaticon.com/128/9113/9113209.png" id="SignUpImg" alt="SignUpImg" />
        </div>
        </div>
        <hr/>
        <div className="product-regi-body">
          <form onSubmit={handleProductRegi} encType="multipart/form-data">
            <ul>
              <li>
                <div className="regi-title">카테고리 선택<span className="imp">*</span></div>
                <select
                    value={productLabelType}
                    onChange={(e) => {
     setProductCategory(e.target.value);
                    }}
                    required
                    aria-required="true"
                    className="category-custom-select"
                  >
                    <option value="">카테고리 선택</option>
                    <option value="SHIP">선박</option>
                    <option value="SPOT">낚시터</option>
                  </select>
              </li>
              <li>
                <div className="regi-title">메인 사진 추가<span className="imp">*</span></div>
                <div>
                  <div className="filebox">
                  <div className="filebox-upload">
                    <div>
                      <label htmlFor="photo1">사진 선택</label>
                      <input
                        type="file"
                        onChange={handleImage}
                        id="photo1"
                        className="form-control"
                        required
                        aria-required="true"
                        accept="image/*"
                        name="shipConfirmImage"
                        multiple
                      />
                      </div>
                      <span>{productImages[0] && <p>첨부된 사진 : {productImages[0].name}</p>}</span>
                    </div>
                  </div>
                  
                </div>
              </li>
              <li>
                <div className="regi-title">제목<span className="imp">*</span></div>
                <div>
                  <input
                    type="text"
                    value={productTitle}
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
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{productLocationInfo}</span>
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
                    value={productFullAddress}
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
                    value={productPrice}
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
                    value={timeMaxUser}
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
                    value={productService}
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