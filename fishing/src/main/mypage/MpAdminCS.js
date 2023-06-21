import React from 'react'
import { Link } from 'react-router-dom'
import './MpScss/MpAdminCS.scss'
const MpAdminCS = () => {
  return (
    <section>
    <div className='adminbox'>

        {/* 관리자목록박스  */}
    <div className='mgbox'>
        <div className='mgtitle'>
            <p>관리자</p>
        </div>
        <div className='mglist'>
            <div><Link to='/admin'>배 검증요청</Link></div>
            <div className='ch2'><Link to='/adminFS'>낚시터 검증요청</Link></div>
            <div><Link to='/adminCS'>문의 현황</Link></div>
        </div>
    </div>
        <div className='mgcontentbox'>
            <div className='ctntitle'>KNOCK_SEA 관리자 화면 (문의)</div>

            {/* 본문내용 */}
            <div className='ctntext'>
            <div className='ctntextbox11'>
                <div>asda@aaa.com</div>
                <div>환불언제되나요?</div>
                <div>답변대기</div>
                <div>2023-06-21</div>
                </div>
            </div>

        </div>
    </div>
</section>
  )
}

export default MpAdminCS