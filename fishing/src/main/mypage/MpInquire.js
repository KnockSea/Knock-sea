import React, { useEffect, useState } from 'react';
import './MpScss/MpInquire.scss';
import { Link } from 'react-router-dom';
import MpList from './MpList';
import { getLoginUserInfo } from '../util/login-util';

const MpInquire = () => {
  const [inquiries, setInquiries] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  // const [token, setToken] = useState('');

  useEffect(() => {
    fetchData();
  }, [page, size]);

  const fetchData = () => {
    // fetchToken();
    fetch('http://localhost:8012/api/v1/inquiries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data) {
        setInquiries(data.inquiries);
      } else {
        console.error('Invalid response data:', data);
      }
    })
    .catch(error => {
      console.error(error);
    });
  };


  // const fetchToken = () => {

  //   const token = getLoginUserInfo().token; 
  //   setToken(token);
  // };

  return (
    <section className='MyPageMainBox'>
      <div className='mainbox1'>
        <h1>문의 현황</h1>
       
          {inquiries.length > 0 && inquiries.map(inquiry => (
             <div className='inbox'>
            <div key={inquiry.id} className='initembox'>
              <div className='innumbox'>{inquiry.id}</div>
              <div className='intitle'>{inquiry.title}</div>
              <div className='indate'>{inquiry.date}</div>
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