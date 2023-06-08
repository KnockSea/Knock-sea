import React from 'react'
import RvTemplate from './reservation/RvTemplate'
import './scss/NsHeader.scss'
import logoPath from './img/logo.png'
import { Link } from 'react-router-dom'

export const NsHeader = () => {
  return (
    <header>
      <div className='header1'>
        <div className='hdleft'>

       <Link to={'/'}><img src={logoPath}/></Link>
        <ul>
         
         <li><Link to={'/bt'} > 배낚시</Link></li>
          <li>낚시터</li>
          <li>클래스</li>
          <li>커뮤니티</li>
        </ul>
        </div>
   
        <div>
          {/* <div>사장님 등록</div> */}
          {/* <img src="#" alt="프로필" /> */}
          <button className='userLogin'>로그인</button>
        </div>
      </div>
   
    </header>

  )
}
