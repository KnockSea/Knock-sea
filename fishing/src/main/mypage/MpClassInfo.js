import React from 'react'
import { Link } from 'react-router-dom'
import MpList from './MpList'
import { useState,useEffect } from 'react'
import { getLoginUserInfo } from '../util/login-util'
const MpClassInfo = () => {


    const [userInfo, setUserInfo] = useState({
        token: '', // Set default value for name
        userEmail: '', // Set default value for email
        userName : '',
        userGrade : '',
        userId : '',
        userPhone : ''
      });




    useEffect(() => {
        const user = getLoginUserInfo();
        setUserInfo(user)
    }, []);


    

    return (
   <section className='MyPageMainBox'>
            <div className='mainbox1'>
                    
                    <div className='mychoicebox'>
                        <h1><Link to={'/my'}>마이페이지</Link></h1>

                        {userInfo.userGrade==='OWNER' &&(<h1><Link to={'/mpbt'}>배</Link></h1>)}
                        {userInfo.userGrade==='OWNER' &&(<h1><Link to={'/mpfs'}>낚시터</Link></h1>)}
                        <h1><Link to={'/mpclass'}>클래스</Link></h1>
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
                        <button className='isbtn'><Link to={'/myquery'}>글 등록하기</Link></button>
                        {/* <button> */}
                            {/* <Link to={'/myinfo'}>배 업체 정보 수정</Link> */}
                            {/* 작성 폼 불러와서 수정 진행 Link 걸어야 함 */}
                            {/* </button> */}
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
        
                <MpList />
        </section>
  )


}

export default MpClassInfo