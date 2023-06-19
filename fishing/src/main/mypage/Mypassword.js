import React from 'react'
import { Link } from 'react-router-dom'
import './MpScss/Mypassword.scss'
import MpList from './MpList'
const Mypassword = () => {
  return (

           <section className='MyPageMainBox'>
            <div className='mainbox1'>

                        <h1>비밀번호 변경</h1>
          <div className='itembox'>

            <div className='pw a1'>
                <div className='title'>현재 비밀번호</div>
                <input/>
            </div>

            <div className='newpw a1'>
            <div className='title'>새 비밀번호</div>
            <input/>
            </div>
            
            <div className='rpw a1'>
            <div className='title'>비밀번호 확인</div>
            <input/>
            </div>

            <button className='rb'>돌아가기</button>
            <button className='update'>수정하기</button>

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

export default Mypassword