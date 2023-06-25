import React from 'react'
import { Link } from 'react-router-dom'
import MpList from './MpList'
import MpRvFormItem from './MpRvFormItem'
import MpReFormItem from './MpReFormItem'
import {getLoginUserInfo, isLogin } from '../util/login-util';
import { useEffect } from 'react';
import { useState } from 'react';
const MpBtInfo = () => {


    const [shipInfo, setShipInfo] = useState({
        shipId: 0,
        category: null,
        shipDescription: '',
        shipLikeCount: 0,
        shipName: '',
        userName: '',
        shipImageLocation: []
      });


      const [userInfo, setUserInfo] = useState({
        token: '', // Set default value for name
        userEmail: '', // Set default value for email
        userName : '',
        userGrade : '',
        userId : '',
        userPhone : ''
      });
    
    
    const fetchShipInfo = async () => {
        const res = await fetch('http://localhost:8012/api/v1/ship/getshipinfo', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' +localStorage.getItem('ACCESS_TOKEN')}
        });
        if (res.status === 200) {
            const json = await res.json(); // JSON 데이터 파싱
            console.log(json);
            setShipInfo(json);
    
           
        } else {
            alert('등록된 선박이없습니다!');
        }
      };
    
    
    
    useEffect(() => {
        // const user = getLoginUserInfo();
        // setUserInfo(user);
        // console.log(userInfo);
        // 배 정보를 가져오는 함수
        const user = getLoginUserInfo();
        setUserInfo(user);
        fetchShipInfo();
    
        // fetchShipInfo();
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
                            {userInfo.userGrade==='OWNER' &&(<Link to={'/mpbt'}><h1>🚩 낚시터</h1></Link>)}
                            {userInfo.userGrade==='OWNER' &&(<Link to={'/mpclass'}><h1>📚 클래스</h1></Link>)}
                        </div>
                    </div>
                   
                   
                    <div className='userinfobox'>
                        <div className='profilebox'>
                        {shipInfo && shipInfo[0] ? (<img className="my-profile" title="마이페이지" src={shipInfo.shipImageLocation[0]} />) : (<img className="my-profile" title="마이페이지" src={require('./../icons/unknown.png')} />)}

                        </div>
                        <div className='namebox'>
                        {shipInfo && shipInfo[0] ? (<div className="nickName">{shipInfo[0].shipName}</div>) : (<div className="nickName">등록된 배가없습니다!</div>)}
                        {shipInfo && shipInfo[0] ? (<div>{shipInfo.shipDescription}</div>):(<div>배 정보를 등록해주세요!</div>)}
                        </div>
                        <div className='btbox'>
                        {shipInfo && shipInfo[0] ?(<><button className='isbtn'><Link to={'/myquery'}>글 삭제하기</Link></button><button className='isbtn'><Link to={'/myquery'}>배 정보 수정하기</Link></button></>):(<button className='isbtn'><Link to={'/myquery'}>글 등록하기</Link></button>)}
                        {/* <button> */}
                            {/* <Link to={'/myinfo'}>배 업체 정보 수정</Link> */}
                            {/* 작성 폼 불러와서 수정 진행 Link 걸어야 함 */}
                        {/* </button> */}
                        </div>
                    </div>


                <div className='rvbox'>
                        <h2>리뷰 게시판</h2>
                        <p>아직 작성된 리뷰가 없습니다</p>
                  {/* 서버와 연결하면 값 가져올때 있다면 로딩해줘야함 */}
                        {/* <MpReFormItem/> */}

                </div>

                <div className='rvbox2'>
                    <h2>예약 현황</h2>
                    <p>아직 작성된 글이 없습니다</p>
                    {/* 서버와 연결하면 값 가져올때 있다면 로딩해줘야함 */}

                    {/* <MpRvFormItem/> */}

                </div>
            </div>
        
                <MpList />
        </section>




  )
}

export default MpBtInfo