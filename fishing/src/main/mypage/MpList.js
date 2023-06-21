import React from 'react';
import { Link } from 'react-router-dom';

const MpList = () => {
  return (
    <ul className='list'>
      <li><Link to={'/my'}>내 정보</Link></li>
      <li><Link to={'/host'}>업체정보</Link></li>
      <li>리뷰게시판</li>
      <li className='my'>예약현황</li>
      <li><Link to={'/myinfo'}>정보 수정하기</Link></li>
      <li><Link to={'/rvlist'}>내 예약 내역</Link></li>
      <li><Link to={'/iqinput'}>문의하기</Link></li>
      <li><Link to={'/inquire'}>문의현황</Link></li>
      <li><Link to={'/userDrop'}>회원탈퇴하기</Link></li>
      
    </ul>
  );
}

export default MpList;