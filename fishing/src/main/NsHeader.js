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
              <li><Link to={'/fs'}> 낚시터</Link></li>
              <li><Link to={'/class'}> 클래스</Link></li>
              <li>커뮤니티</li>
              {/* <li><Link to={'/my'}>마이페이지</Link></li> */}
            </ul>
        </div>
   
        <div className='hdright'>
          <div> <Link to={'/ownercheck'}>사장님 등록</Link></div>
          <Link to={'/my'}><img className="my-profile" title='마이페이지'
           src='https://pbs.twimg.com/profile_images/1302169656082407424/e2dpOHC2_400x400.jpg'/></Link>
          <div className='userLogin'>
            <Link to={'/login'}>Log-in</Link>
          </div>
        </div>
      </div>
   
    </header>

  )
}
