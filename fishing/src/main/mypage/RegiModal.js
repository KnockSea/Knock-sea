import React, { useEffect, useState } from 'react';
import { getLoginUserInfo } from "../util/login-util";
import { useNavigate } from 'react-router-dom';
import "./MpScss/RegiModal.scss";

    
function RegiModal({closeModal}) {
  
  const [token, setToken] = useState(getLoginUserInfo().token);
  const [userInfo, setUserInfo] = useState({
    token: '',
    userEmail: '',
    userName : '',
    userGrade : '',
    userId : '',
    userPhone : ''
  });
  const navigate = useNavigate();

  const handleRegiProduct=()=>{
    navigate("/product");
  }
  
  const handleRegiClass=()=>{
    navigate("/edu");
  }

    return (
      
        <div className="regi-modal-overlay" >
          <div className="regi-modal-box">
            <button onClick={closeModal} className='regi-close-btn'><img src='https://cdn-icons-png.flaticon.com/128/7778/7778647.png'/></button>

            <h1 className='regi-modal-title'>
              Knock-Sea는 <span>Owner/Teacher</span> 분들의 열정을 응원합니다!</h1>            

            <div className='regi-result'> 
            {userInfo.userGrade==='OWNER' &&(  
              <div className='regi-btn-wrap'> 
                <button className='regi-custom-button' onClick={handleRegiProduct}>선박/낚시터 등록</button>   
                </div> )}
                <div className='regi-btn-wrap'> 
                <button className='regi-custom-button' onClick={handleRegiClass}>클래스 등록</button>
              </div>
            </div>
          </div>
        </div>
      );

    }
  export default RegiModal;