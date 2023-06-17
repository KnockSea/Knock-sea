import React from 'react'
import './MpScss/MpInquire.scss'
import { Link } from 'react-router-dom'
import MpList from './MpList'



const MpInquire = () => {
  return (
    <section className='MyPageMainBox'>
    <div className='mainbox1'>

                <h1>문의 현황</h1>
    <div className='inbox'>
            <div className='initembox'>
                <div className='innumbox'>1</div>
                <div className='intitle'>예약취소하고싶어요</div>
                <div className='indate'>2023.06.05 문의</div>
            </div>
            <div className='inbtnbox'>
                    <button className='indetailbtn'>상세보기</button>
            </div>
    </div>


  </div>
    {/* <ul className='list'>
        <li>업체정보</li>
        <li>리뷰게시판</li>
        <li>예약현황</li>
        <li className='my'>내정보</li>
        <li><Link to={'/myinfo'}>정보 수정하기</Link></li>
        <li>내 예약 내역</li>
        <li>문의현황</li>
    </ul> */}
  <MpList/>
</section>
  )
}

export default MpInquire