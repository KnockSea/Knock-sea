import React from 'react'
import './MpScss/MpMain.scss'
import { Link } from 'react-router-dom'
import MpList from './MpList'

const MpMain = () => {
  return (
        <section className='MyPageMainBox'>
            <div className='mainbox1'>
                    
                    <div className='mychoicebox'>
                        <h1>마이페이지</h1>
                        <h1>배</h1>
                        <h1>낚시터</h1>
                        <h1>클래스</h1>
                    </div>
                   
                   
                    <div className='userinfobox'>
                        <div className='profilebox'>
                            <img />
                        </div>
                        <div className='namebox'>
                            <div className='nickName'>LOVETMORROW</div>
                            <div>업체정보를 입력하세요</div>
                        </div>
                        <div className='btbox'>
                        <button className='isbtn'>글 등록하기</button>
                        <button><Link to={'/myinfo'}>개인 정보 수정</Link></button>
                        </div>
                    </div>


                <div className='rvbox'>
                        <h2>리뷰 게시판</h2>
                        <p>아직 작성된 리뷰가 없습니다</p>
                </div>

                <div className='rvbox2'>
                    <h2>예약 현황</h2>
                    <p>아직 작성된 글이 없습니다</p>
                </div>
            </div>
            {/* <ul className='list'>
                <li>업체정보</li>
                <li>리뷰게시판</li>
                <li className='my'>예약현황</li>
                <li><Link to={'/myinfo'}>정보 수정하기</Link></li>
                <li><Link to={'/rvlist'}>내 예약 내역</Link></li>
                <li><Link to={'/inquire'}>문의현황</Link></li>
                <li><Link to={'/userDrop'}>회원탈퇴하기</Link></li>
            </ul> */}
                <MpList />
        </section>
    )
}

export default MpMain