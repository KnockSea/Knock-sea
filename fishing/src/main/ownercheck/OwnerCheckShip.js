import React, { useState ,useEffect} from 'react';
import './scss/OwnerCheck.scss';
import OwnerCheckHeader from './OwnerCheckHeader';
import { getLoginUserInfo, setLoginUserInfo } from '../util/login-util';
import { useNavigate } from 'react-router-dom';
function OwnerCheckShip() {

  const [shipConfirmImage, setShipConfirmImage] = useState([2]);
  const [name, setName] = useState('');
  // cosnt [validationtype, setvalidationtype] = useState('SHIP');

  //화면이동 함수
  const navi = useNavigate();


  const [userInfo, setUserInfo] = useState({
    token: '', // Set default value for name
    userEmail: '', // Set default value for email
    userName : '',
    userGrade : '',
    userId : '',
    userPhone : ''
  });



  const handleOwnerCheck = async (e) => {
    e.preventDefault();
    // 등록 처리 로직
    console.log(shipConfirmImage);
    const payload = {
      validationType: 'SHIP',
      validationShipRegi: name,
      validationShipLicense: name
    };

    //JSON을 Blob타입으로 변경후 FormData에 넣기
    const userJsonBlob = new Blob(
      [JSON.stringify(payload)],
      {type : 'application/json'}
      );
    const formData = new FormData();
    formData.append('validation',userJsonBlob);
  
    // Append each image file separately
    for (let i = 0; i <shipConfirmImage.length; i++) {
      formData.append('validationImage',shipConfirmImage[i]);
    }

    const res =await fetch('http://localhost:8012/api/v1/validation/insert', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      },
      body: formData
    });

    if(res.status===200){
      alert('선박검증요청에 성공했습니다');
      navi('/');
      //window.location.href = '/login';
    }else if(res.status==500){
      const errorResponse = await res.json(); // Parse error response as JSON
      alert('등록에 오류가발생했습니다');
    }else{
      alert('서버와의 접속이 원활하지않습니다');
    }
   
  };
  


 const handleShipConfirmImage1Change = (event) => {
    const file = event.target.files[0];
    setShipConfirmImage((prevImages) => [file, prevImages[1]]);
  };

  const handleShipConfirmImage2Change = (event) => {
    const file = event.target.files[0];
    setShipConfirmImage((prevImages) => [prevImages[0], file]);
  };




  //화면 랜더링되자마자 로그인한 유저 설정 
  useEffect(() => {
    const user = getLoginUserInfo();
    setLoginUserInfo(user);

  }, []);



  return (
    
        <div className="owner-check-body">
          <form onSubmit={handleOwnerCheck} encType="multipart/form-data">
            {/* <ul>
              <li>
                <div>카테고리</div>
                <div className='category'>
                  <div className="category-select ship">선박</div>
                  <div className="category-select fishing">낚시터</div>
                </div>
              </li>
              </ul> */}
              <ul>
              {/* <li>
                <div>배 이름<span className="imp">*</span></div>
                <div>
                  <input
                    type="shipName"
                    value={shipName}
                    onChange={(e) => setShipName(e.target.value)}
                    size="30"
                    className="form-control"
                    required
                    aria-required="true"
                    placeholder="선박 등록증과 동일한 배 이름을 작성해주세요."
                  />
                </div>
              </li> */}
              <OwnerCheckHeader />
              <li>
                <div>선박 등록증<span className="imp">*</span></div>
                <div>
                  <div className="filebox">
                    <label htmlFor="shipConfirmImage1">파일 선택하기</label>
                    <input
                      type="file"
                      onChange={handleShipConfirmImage1Change}
                      id="shipConfirmImage1"
                      className="form-control"
                      required
                      aria-required="true"
                      accept="image/*"
                      name="shipConfirmImage1"
                    />
                    <span>
                    {/* {shipConfirmImage.length > 0 && (
                      <p>Attached photo: {shipConfirmImage[0] || ''}</p>
                    )} */}
                  </span>
                  </div>
                </div>

              </li>
              <li>
                <div>선박등록증 번호<span className="imp">*</span></div>
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    maxLength="6"
                    required
                    aria-required="true"
                    placeholder="'-' 없이 선박 등록증 번호를 동일하게 입력해주세요."
                  />
                </div>
              </li>
              <li>
                <div>선박 면허증<span className="imp">*</span></div>
                <div>
                <div className="">
                    <div class="filebox">
                    <label htmlFor="shipConfirmImage2">파일 선택하기</label>
                    <input
                      type="file"
                      onChange={handleShipConfirmImage2Change}
                      id="shipConfirmImage2"
                      className="form-control"
                      required
                      aria-required="true"
                      accept="image/*"
                      name="shipConfirmImage2"
                    />
                    {/* {shipConfirmImage.length > 0 && (
                      <p>Attached photo: {shipConfirmImage[1] || ''}</p>
                    )} */}
                  </div>
                  </div>
                </div>
              </li>
              <li>
                <div>면허증 번호<span className="imp">*</span></div>
                <div>
                  <input
                    type="address"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    required
                    aria-required="true"
                    placeholder="'-' 없이 면허증 번호를 동일하게 기입해주세요."
                  />
                  <span id="addressChk"></span>
                </div>
              </li>
              {/* <li>
                <div>선박번호판<span className="imp">*</span></div>
                <div>
                  <input
                    type="tel"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    className="form-control"
                    required
                    aria-required="true"
                    maxLength="15"
                    placeholder="선박번호판을 입력해주세요."
                  />
                  <span id="PhoneChk"></span>
                </div>
              </li> */}
            </ul>
            <div className="owner-check-footer">
              <button type="submit" className="btn">
                취소
              </button>
              <button type="submit" className="btn" onClick={handleOwnerCheck}>
                다음
              </button>
            </div>
          </form>
          
        </div>
  );    
            
            }
export default OwnerCheckShip
