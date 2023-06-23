import React from 'react'
import './MpScss/MpMain.scss'
import { Link } from 'react-router-dom'
import MpList from './MpList'
import MpReFormItem from './MpReFormItem'

const MpMain = () => {

  return (
        <section className='MyPageMainBox'>
            <div className='mainbox1'>
                    
                    <div className='mychoicebox'>
                        <h1>마이페이지</h1>
                        <h1><Link to={'/mpbt'}>배</Link></h1>
                        <h1><Link to={'/mpfs'}>낚시터</Link></h1>
                        <h1><Link to={'/mpclass'}>클래스</Link></h1>
                    </div>
                   
                   
                    <div className='userinfobox'>
                        <div className='profilebox'>
                            <img />
                        </div>
                    
                        <div className='btbox'>
                        {/* <button className='isbtn'><Link to={'/myquery'}>글 등록하기</Link></button> */}
                        <button><Link to={'/myinfo'}>개인 정보 수정</Link></button>
                        </div>
                    </div>


                {/* <div className='rvbox'>
                        <h2>리뷰 게시판</h2>
                        <p>아직 작성된 리뷰가 없습니다</p>
                        <MpReFormItem/> */}
                {/* </div> */}

                <div className='rvbox2'>
                    <div>
                        <h2>예약 현황</h2>
                        <p>아직 작성된 글이 없습니다</p>
                    </div>
                    <button className='isbtn'><Link to={'/product'}>NEW 예약 등록</Link></button>
                </div>
            </div>
        
                <MpList />
        </section>
    )
}

export default MpMain