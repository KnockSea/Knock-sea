import React from 'react'
import { Link } from 'react-router-dom'
import MpList from './MpList'
import { useState,useEffect } from 'react'
import { getLoginUserInfo } from '../util/login-util'
import { API_BASE_URL, EDU } from '../../config/host-config'
const MpClassInfo = () => {


    const [userInfo, setUserInfo] = useState({
        token: '', // Set default value for name
        userEmail: '', // Set default value for email
        userName : '',
        userGrade : '',
        userId : '',
        userPhone : ''
      });
    
    const [myEdu,setmyEdu] = useState({
        userName: '',
        Description: '',
        eduTitle: '',
        eduLevel: '',
        eduImageList: [],
    });

    const getMyEdu = async () => {
        const res = await fetch(`${API_BASE_URL}${EDU}/my-edu`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' +localStorage.getItem('ACCESS_TOKEN')}
        });
        if (res.status === 200) {
            const json = await res.json(); // JSON 데이터 파싱
            console.log(json);
            setmyEdu(json);
        } else {
            alert('등록된 클래스가 없습니다!!');
        }
    }


    useEffect(() => {
        const user = getLoginUserInfo();
        console.log(user);
        setUserInfo(user);
        getMyEdu();
      }, []);

    

    return (
   <section className='MyPageMainBox'>
        <div className='mainbox1'>
            <div className='mychoicebox'>
            <div className='mpTitle'>
                <h1>마이페이지</h1>
            </div>
            <div className='ownerTap'>
            {userInfo.userGrade==='OWNER' &&(<Link to={'/mpbt'}><h1>⛵ 배</h1></Link>)}
                {userInfo.userGrade==='OWNER' &&(<Link to={'/mpfs'}><h1>🚩 낚시터</h1></Link>)}
                {userInfo.userGrade==='OWNER' &&(<Link to={'/mpclass'}><h1>📚 클래스</h1></Link>)}
            </div>
            </div>
                   
            <div className='userinfobox'>
                <div className='userinfoWrap'>
                    <div className='profilebox'>
                        {myEdu && myEdu[0]?(<img className="my-profile" title="마이페이지" src={myEdu.eduImageList[0]} />) : (<img className="my-profile" title="마이페이지" src={require('./../icons/defaultProfile.png')} />)}
                    </div>
                    <div className='namebox'>
                        {myEdu && myEdu.eduTitle ? (<div className="nickName">{myEdu.eduTitle}</div>) : (<div className="nickName">등록된 클래스가없습니다!</div>)}
                        {myEdu && myEdu.Description ? (<div className="content">{myEdu.Description}</div>):(<div>클래스 정보를 등록해주세요!</div>)}
                    </div>
                </div>    
            </div>
                <div className='btbox'>
                    <button className='isbtn'><Link to={'/myquery'}>글 등록하기</Link></button>
                        {/* <button> */}
                        {/* <Link to={'/myinfo'}>배 업체 정보 수정</Link> */}
                        {/* 작성 폼 불러와서 수정 진행 Link 걸어야 함 */}
                        {/* </button> */}
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