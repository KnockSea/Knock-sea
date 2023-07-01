import React, { useState ,useEffect} from 'react';
import './scss/OwnerCheck.scss';
import OwnerCheckHeader from './OwnerCheckHeader';
import { getLoginUserInfo } from '../util/login-util';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, VALIDATION } from '../../config/host-config';
import { Link } from 'react-router-dom';

function OwnerCheckFishing() {
  const [fishingNumber, setFishingNumber] = useState('');
  const [file, setFile] = useState(null);

  //화면이동 함수
  const navi = useNavigate();

  const handleOwnerConfirm = async (e) => {
    e.preventDefault();
    //  처리 로직
    console.log(file);

    const payload = {
      validationType: 'SPOT',
      validationBusinessRegi : fishingNumber,
    };

    //JSON을 Blob타입으로 변경후 FormData에 넣기
    const userJsonBlob = new Blob(
      [JSON.stringify(payload)],
      {type : 'application/json'}
      );


    const formData = new FormData();
    formData.append('validation',userJsonBlob);

    
      // Append each image file separately
    formData.append('validationImage',file);


    const res =await fetch(`${API_BASE_URL}${VALIDATION}/insert`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      },
      body: formData
    });


    if(res.status===200){
          alert('낚시터 검증요청에 성공했습니다')
          //window.location.href = '/login';
          navi('/');
        }else if(res.status==500){
          const errorResponse = await res.text(); // Parse error response as JSON
          alert('이미 검증에 등록된 정보가있습니다');
        }else{
          alert('서버와의 접속이 원활하지 않습니다');
        }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };


  const [userInfo, setUserInfo] = useState({
    token: '', // Set default value for name
    userEmail: '', // Set default value for email
    userName : '',
    userGrade : '',
    userId : '',
    userPhone : ''
  });


  //화면 랜더링되자마자 로그인한 유저 설정 
  useEffect(() => {
    const user = getLoginUserInfo();
    setUserInfo(user);

  }, []);

  return (
   
         <div className="owner-check-body">
          <form onSubmit={handleOwnerConfirm} encType="multipart/form-data">
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
                        <Link to="/ship" className="category-select ship">선박</Link>
                        <Link to="/fishing" style={{backgroundColor:"#123282"}}   className="category-select fishing">낚시터</Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <li>
                <div>사업자 등록증<span className="imp">*</span></div>
                <div>
                  <div className="">
                    <div className="filebox">
                      <label htmlFor="shipConfirm">파일 선택하기</label>
                      <input
                      type="file"
                      onChange={handleFileChange}
                      id="shipConfirm"
                      className="form-control"
                      required
                      aria-required="true"
                      accept="image/*"
                      name="shipConfirmImage"
                    />
                     <span>{file && <p>첨부된 사진: {file.name}</p>}</span>
                  </div>
                  </div>
                  
                </div>
              </li>
              <li>
                <div>사업자 등록증 번호<span className="imp">*</span></div>
                <div>
                  <input
                    type="text"
                    value={fishingNumber}
                    onChange={(e) => setFishingNumber(e.target.value)}
                    className="form-control"
                    maxLength="6"
                    required
                    aria-required="true"
                    placeholder="'-' 없이 사업자 등록증 번호와 동일하게 입력해주세요."
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

export default OwnerCheckFishing
