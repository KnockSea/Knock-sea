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
        shipLocation: '',
        shipName: '',
        userName: '',
        shipImageLocation: []
      });
    
    
    const fetchShipInfo = async () => {
        const res = await fetch('http://localhost:8012/api/v1/ship/getshipinfo', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + getLoginUserInfo().token}
        });
        if (res.status === 200) {
            const json = await res.json(); // JSON 데이터 파싱
            console.log(json);
            setShipInfo(json);
    
            /*
            // 서버에서 직렬화된 이미지가 응답된다.
            const profileBlob = await res.blob();
            // 해당 이미지를 imgUrl로 변경
            const imgUrl = window.URL.createObjectURL(profileBlob);
            setProfileUrl(imgUrl);
            */
        } else {
            alert('서버와의 통신이 원활하지않습니다');
        }
      };
    
    
    
    useEffect(() => {
        // const user = getLoginUserInfo();
        // setUserInfo(user);
        // console.log(userInfo);
        // 배 정보를 가져오는 함수
        fetchShipInfo();
    
        // fetchShipInfo();
      }, []);
    


    
  return (



   <section className='MyPageMainBox'>
            <div className='mainbox1'>
                    
                    <div className='mychoicebox'>
                        <h1><Link to={'/my'}>마이페이지</Link></h1>


                        <h1><Link to={'/mpbt'}>배</Link></h1>
                        <h1><Link to={'/mpfs'}>낚시터</Link></h1>
                        <h1><Link to={'/mpclass'}>클래스</Link></h1>
                    </div>
                   
                   
                    <div className='userinfobox'>
                        <div className='profilebox'>
                            <img className="my-profile" title="마이페이지" src={shipInfo.shipImageLocation[0] || require('./../img/class.jpg')}/>
                        </div>
                        <div className='namebox'>
                            <div className='nickName'>LOVETMORROW</div>
                            <div>업체정보를 입력하세요</div>
                        </div>
                        <div className='btbox'>
                        <button className='isbtn'><Link to={'/myquery'}>글 등록하기</Link></button>
                        <button>
                            {/* <Link to={'/myinfo'}>배 업체 정보 수정</Link> */}
                            {/* 작성 폼 불러와서 수정 진행 Link 걸어야 함 */}
                            </button>
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