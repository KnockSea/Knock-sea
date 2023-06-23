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
    
    const [myEdu,setmyEdu] = useState({
        userName: '',
        description: '',
        eduTitle: '',
        eduLevel: '',
        eduImageList: [],
    });


    useEffect(() => {
        const user = getLoginUserInfo();
        setUserInfo(user)
        // getEduDetail()
    }, []);

    const getEduDetail = async () => {
        const res = await fetch('http://localhost:8012/api/v1/edu/main/edu', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')}
        });

        if (res.status === 200) {
            const json = await res.json(); // JSON 데이터 파싱
            console.log(json);
            setmyEdu(json);
            console.log(myEdu);
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

    

    return (
   <section className='MyPageMainBox'>
            <div className='mainbox1'>
                    
                    <div className='mychoicebox'>
                        <h1><Link to={'/my'}>마이페이지</Link></h1>

                        {userInfo.userGrade==='OWNER' &&(<h1><Link to={'/mpbt'}>배</Link></h1>)}
                        {userInfo.userGrade==='OWNER' &&(<h1><Link to={'/mpfs'}>낚시터</Link></h1>)}
                        {userInfo.userGrade==='OWNER' &&(<h1><Link to={'/mpclass'}>클래스</Link></h1>)}
                    </div>
                   
                   
                    <div className='userinfobox'>
                        <div className='profilebox'>
                            {myEdu && myEdu[0]?(<img className="my-profile" title="마이페이지" src={myEdu.eduImageList[0]} />) : (<img className="my-profile" title="마이페이지" src={require('./../icons/unknown.png')} />)}
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