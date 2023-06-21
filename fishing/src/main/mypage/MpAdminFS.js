import React from 'react'
import { Link } from 'react-router-dom'

const MpAdminFS = () => {
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
            <div className='ctntitle'>KNOCK_SEA 관리자 화면 (낚시터)</div>

            {/* 본문내용 */}
            <div className='ctntext'>
                <div className='ctntextbox1'>
                <div>dasdas</div>
                <div>사업자등록증이미지</div>
                <div>12-**-1213</div>
                <div>75-454-44577-45</div>
                <div>대기</div>
                <div>2023-06-21</div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default MpAdminFS