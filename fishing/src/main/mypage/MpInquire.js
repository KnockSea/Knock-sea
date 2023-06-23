import React, { useEffect, useState } from 'react';
import './MpScss/MpInquire.scss';
import { Link } from 'react-router-dom';
import MpList from './MpList';
import { getLoginUserInfo } from '../util/login-util';
import Stack from '@mui/material/Stack';

const MpInquire = () => {
  const [inquiries, setInquiries] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [token, setToken] = useState(getLoginUserInfo().token);

  const fetchData = () => {
    fetch(`http://localhost:8012/api/v1/inquiries/myInquiry?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data) {

        setInquiries(data.inquiries);
      } else {
        // 처리할 에러에 대한 로직 추가
      }
    })
    .catch(error => {
      console.error(error);
    });
  };
  
  useEffect(() => {
    fetchData();
  }, [page, size, inquiries]);
  

  return (
    <section className='MyPageMainBox'>
      <div className='mainbox1'>
        <h1>문의 현황</h1>
       
        {inquiries.length > 0 && inquiries.map(inquiry => (
          <div key={inquiry.inquiryId} className='inbox'>
            <div className='initembox'>
              <div className='innumbox'>{inquiry.inquiryId}</div>
              <div className='intitle'>{inquiry.inquiryTitle}</div>
              <div className='indate'>{inquiry.inquiryDateTime}</div>
            </div>
            <div className='inbtnbox'>
              <button className='indetailbtn'>상세보기</button>
            </div>
          </div>
        ))}   
        
      </div>
   
      <MpList/>
    </section>
  );
};

export default MpInquire;