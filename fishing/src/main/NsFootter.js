import React from 'react'
import './scss/NsFootter.scss';



const NsFootter = () => {
  return (
   <div className='footter'>
        <ul>
            <li>회사소개</li>
            <li>운영사이트</li>
            <li>이용약관</li>
            <li>개인정보처리방침</li>
            <li>Open API</li>
            <li>광고문의</li>
            <li>제휴문의</li>
            <li>고객센터</li>
        </ul>

    <div>
        <p>메뉴 정보 수정: menu@mybread.com</p>
        <p>FAX : 02- 123 - 4567</p>
        <p>Email: helpdesk@mybread.com</p>
        <p>고객상담</p>
    </div>
    <p>Copyrightⓒ Your bread My bread. All rights reserved.</p>
   </div>


  )
}

export default NsFootter