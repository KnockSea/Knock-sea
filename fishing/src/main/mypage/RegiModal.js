import React, { useEffect, useState } from 'react';
import { getLoginUserInfo } from "../util/login-util";
import { useNavigate } from 'react-router-dom';
import "./MpScss/RegiModal.scss";

    
function RegiModal({closeModal}) {
  
  const [token, setToken] = useState(getLoginUserInfo().token);

  const navigate = useNavigate();

  const handleRegiProduct=()=>{
    navigate("/product");
  }
  
  const handleRegiClass=()=>{
    navigate("/edu");
  }

    return (
        <div className="modal-overlay" >
          <div className="modal-box">
            <button onClick={closeModal} className='close-btn'>X</button>
            <h1 className='regi-modal-title'>
              Knock-Sea는 <span>Owner/Teacher</span> 분들의 열정을 응원합니다!</h1>
            
          
            <div className='result'>   
              <div className='btn-wrap'> 
                <button className='custom-button' onClick={handleRegiProduct}>선박/낚시터 등록</button>   
                </div> 
                <div className='btn-wrap'> 
                <button className='custom-button' onClick={handleRegiClass}>클래스 등록</button>
              </div>
            </div>
          </div>
        </div>
      );

    }
  export default RegiModal;