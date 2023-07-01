import React, { useState ,useEffect} from 'react';
import './scss/OwnerCheck.scss';
import OwnerCheckHeader from './OwnerCheckHeader';
import { getLoginUserInfo, setLoginUserInfo } from '../util/login-util';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, VALIDATION } from '../../config/host-config';
import { Link } from 'react-router-dom';

function OwnerCheckShip(props) {

  const [shipConfirmImage, setShipConfirmImage] = useState([2]);
  const [shipNumber, setShipNumber] = useState('');
  const [shipLicenseNumber, setShipLicenseNumber] = useState('');
  const [selectedImageNames, setSelectedImageNames] = useState(['', '']);
  // cosnt [validationtype, setvalidationtype] = useState('SHIP');

 
  const navi = useNavigate();
  const [userInfo, setUserInfo] = useState({
    token: '', 
    userEmail: '', 
    userName : '',
    userGrade : '',
    userId : '',
    userPhone : ''
  });

  const handleOwnerCheck = (e) => {
    e.preventDefault();
    console.log(shipConfirmImage);
    const payload = {
      validationType: 'SHIP',
      validationShipRegi: shipNumber,
      validationShipLicense: shipLicenseNumber
    };

    const userJsonBlob = new Blob(
      [JSON.stringify(payload)],
      {type : 'application/json'}
      );

    const formData = new FormData();
    formData.append('validation',userJsonBlob);
  
    for (let i = 0; i <shipConfirmImage.length; i++) {
      formData.append('validationImage',shipConfirmImage[i]);
    }

    fetch(`${API_BASE_URL}${VALIDATION}/insert`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      },
      body: formData
    }).then(async (res) => {
    if(res.status===200){
      alert('선박검증요청에 성공했습니다');
      navi('/');
      //window.location.href = '/login';
    }else if(res.status===500){
      const error = await res.text();
      alert('이미 검증에 등록된 정보가있습니다');
    }else{
      alert('서버와의 접속이 원활하지않습니다');
    }
    })
  };

 const handleShipConfirmImage1Change = (event) => {
    const file = event.target.files[0];
    setShipConfirmImage((prevImages) => [file, prevImages[1]]);
    setSelectedImageNames([file.name, selectedImageNames[1]]); 
  };

  const handleShipConfirmImage2Change = (event) => {
    const file = event.target.files[0];
    setShipConfirmImage((prevImages) => [prevImages[0], file]);
    setSelectedImageNames([selectedImageNames[0], file.name]); 
  };


  useEffect(() => {
    const user = getLoginUserInfo();
    setLoginUserInfo(user);

  }, []);


  return (
        <div className="owner-check-body">
          <form onSubmit={handleOwnerCheck} encType="multipart/form-data">
            <ul>
            <div className="owner-check-header">
                <div className="head-title">
                  <p>KNOCK_SEA 업체 검증</p>
                  <img className="image-82-CzH" src="https://cdn-icons-png.flaticon.com/128/3061/3061579.png" id="SignUpImg" alt="SignUpImg" />
                </div>
                <div className="owner-check-body">
                  <hr/>
                  <ul>
                    <li>
                      <div>카테고리<span className="imp">*</span></div>
                      <div className='category'>
                        <Link to="/ship" style={{backgroundColor:"#123282"}} className="category-select ship">선박</Link>
                        <Link to="/fishing"  className="category-select fishing">낚시터</Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
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
                    <span>선택된 사진 : {selectedImageNames[0]}</span>
                  </div>
                </div>

              </li>
              <li>
                <div>선박등록증 번호<span className="imp">*</span></div>
                <div>
                  <input
                    type="text"
                    value={shipNumber}
                    onChange={(e) => setShipNumber(e.target.value)}
                    className="form-control"
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
                    <span>선택된 사진 : {selectedImageNames[1]}</span>
                  </div>
                  </div>
                </div>
              </li>
              <li>
                <div>면허증 번호<span className="imp">*</span></div>
                <div>
                  <input
                    type="text"
                    value={shipLicenseNumber}
                    onChange={(e) => setShipLicenseNumber(e.target.value)}
                    className="form-control"
                    required
                    aria-required="true"
                    placeholder="'-' 없이 면허증 번호를 동일하게 기입해주세요."
                  />
                </div>
              </li>
            </ul>
            <div className="owner-check-footer">
              <button type="submit" className="btn">
                취소
              </button>
              <button type="submit" className="btn">
                완료
              </button>
            </div>
          </form>
          
        </div>
  );    
}

export default OwnerCheckShip
