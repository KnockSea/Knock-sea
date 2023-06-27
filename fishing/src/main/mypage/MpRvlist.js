import React from 'react'
import './MpScss/MpRvlist.scss'
import { Link } from 'react-router-dom'
import MpList from './MpList'
import { useState ,useEffect} from 'react'
import { getLoginUserInfo } from '../util/login-util'
import { API_BASE_URL, USER } from '../../config/host-config'

const MpRvlist = () => {


  const [userProfile, setUserProfile] = useState({
    userId: 0,
    userName: '',
    userPoint: 0,
    reserveDTO: [],
    profileImageUrl: ''
  });


  useEffect(() => {
    // const user = getLoginUserInfo();
    // setUserInfo(user);
    // console.log(userInfo);
    // 배 정보를 가져오는 함수
    const user = getLoginUserInfo();
    setUserInfo(user);
    // fetchShipInfo();
    userReservefetch();
  }, []);

  const userReservefetch = async() => {
    const res = await fetch(`${API_BASE_URL}${USER}user-mylist`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' +localStorage.getItem('ACCESS_TOKEN')}
    });
        if (res.status === 200) {
          const json = await res.json(); // JSON 데이터 파싱
          console.log("json",json);
          setUserProfile(json);
          console.log("userProfile",userProfile);
           /*
          // 서버에서 직렬화된 이미지가 응답된다.
          const profileBlob = await res.blob();
          // 해당 이미지를 imgUrl로 변경
          const imgUrl = window.URL.createObjectURL(profileBlob);
          setProfileUrl(imgUrl);
          */
        } else if(res.status===500){
            alert('예약내역이없습니다');
        }else {
            alert('서버와의 통신이 원활하지않습니다!')
        }
  }

  const [userInfo, setUserInfo] = useState({
    token: '', // Set default value for name
    userEmail: '', // Set default value for email
    userName : '',
    userGrade : '',
    userId : '',
    userPhone : ''
  });

  const today = new Date().toLocaleDateString();
  console.log("today : ",today);
  return (
    <section className='MyPageMainBox'>
    <div className='mainbox1'>

        <h1>내 예약 내역</h1>
        {userProfile.reserveDTO.length > 0 ? (
        userProfile.reserveDTO.map((reservation, index) => (
          <div className='rvlistbox' key={index}>
            <div className='rvliststatus'>예약확정</div>
            <div className='rvitembox'>
              <div className='potobox'><img className="my-profile"  title="마이페이지" src={reservation.imgUrl || require('../icons/01d.png')} style={{border:"1px solid darkgray"}}/></div>
              <div className='minibox'>
                <div className='rvlistdate'>{reservation.reserveDate} {reservation.timeStart} ~ {reservation.timeEnd}</div>
                <div className='rvlisttitle'>{reservation.reserveTitle}</div>
                <div className='rvlistcount'>예약 인원 : {reservation.userCount}명</div>
                <div className='rvlistsally'>{reservation.reservePrice}원</div>
              </div>
            </div>
            {/* {reservation.reserveDate === today && ( // 오늘 날짜와 예약일이 같은 경우에만 후기쓰기 버튼을 보여줌
                <div className='rvlistbtnbox'>
                  <button className='relist'>후기쓰기</button>
                </div>
              )} */}
            <div className='rvlistbtnbox'>
              <Link to={'/review'}>
                <button className='relist'>후기쓰기</button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div>예약 내역이 없습니다.</div>
      )}


  </div>
    {/* <ul className='list'>
        <li>업체정보</li>
        <li>리뷰게시판</li>
        <li>예약현황</li>
        <li className='my'>내정보</li>
        <li><Link to={'/myinfo'}>정보 수정하기</Link></li>
        <li>내 예약 내역</li>
        <li>문의현황</li>
    </ul> */}
    <MpList/>
</section>
  )
}

export default MpRvlist