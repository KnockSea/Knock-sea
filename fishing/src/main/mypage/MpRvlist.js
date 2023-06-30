import React from 'react'
import './MpScss/MpRvlist.scss'
import { Link, json } from 'react-router-dom'
import MpList from './MpList'
import { useState ,useEffect} from 'react'
import { getLoginUserInfo } from '../util/login-util'
import { API_BASE_URL, USER, RESERVATION } from '../../config/host-config'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const MpRvlist = () => {
  
  const [userProfile, setUserProfile] = useState({
    userId: 0,
    userName: '',
    userPoint: 0,
    reserveDTO: [],
    profileImageUrl: ''
  });
  
  const [dateStatus, setDateStatus] = useState(true);
  
  const [userInfo, setUserInfo] = useState({
    token: '', // Set default value for name
    userEmail: '', // Set default value for email
    userName : '',
    userGrade : '',
    userId : '',
    userPhone : ''
  });
  const [open, setOpen] = useState(false);
  const[test,setTest] = useState([]);
  const [token, setToken] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("닫기");
    setOpen(false);
  };



  const handleCancle = (reservation) =>{
    
     console.log("삭제");
     console.log("reservation : ",reservation);
     let formdata = '';
    if (reservation.type === 'EDU') {
        formdata = {
          userId: userProfile.userId,
          reservationId : reservation.reservationId,
          eduId : reservation.id,
          productId : '',
          productType : reservation.type
        };
    } else {
      formdata = {
        userId: userProfile.userId,
        reservationId : reservation.reservationId,
        eduId : '',
        productId : reservation.id,
        productType : reservation.type
      };
    }
      console.log("formdata : ",formdata);

      const requestHeader = {
        'content-type': 'application/json',
        Authorization : "Bearer " + userInfo.token
      };

     //삭제 패치 때리기
      fetch(`${API_BASE_URL}${RESERVATION}/remove`, {
        method: 'DELETE',
        headers: requestHeader,
        body: JSON.stringify(formdata),
      })
      .then(res => {        
        console.log(res.status);
        return res.json();
      })
      .then(json => {
        setUserProfile(json);
      });

     setOpen(false);
    //  window.location.reload();

    
  }

  useEffect(() => {
    const user = getLoginUserInfo();
    setUserInfo(user);
    // fetchShipInfo();
    userReservefetch();
  }, []);

  const userReservefetch = async() => {
    const res = await fetch(`${API_BASE_URL}${USER}/user-mylist`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' +localStorage.getItem('ACCESS_TOKEN')}
    });
        if (res.status === 200) {
          const json = await res.json(); // JSON 데이터 파싱
          console.log("json : ",json);
          setUserProfile(json);
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
        // console.log("userProfileOutside : ",userProfile);
  }


  

const dateStatusCheck=(checkDate)=>{
  const todayDate = new Date();
  // userProfile.reserveDTO.map((target, i) => {
  //   const formattedDateString = target.reserveDate.replace('년', '-').replace('월', '-').replace('일', '');
  //   const targetDate = new Date(formattedDateString);

  //   if (todayDate <= targetDate) {
  //     setDateStatus(false);
  //   } else {
  //     setDateStatus(true)
  //   }
  // });

    const formattedDateString = checkDate.replace('년', '-').replace('월', '-').replace('일', '');
    const targetDate = new Date(formattedDateString);

    if (todayDate <= targetDate) {
      return false;
    } else {
      return true;
    }
}


  return (
    <section className='MyPageMainBox'>
    <div className='mainbox1'>

        <h1>내 예약 내역</h1>
        {!!userProfile.reserveDTO ? (
        userProfile.reserveDTO.map((reservation, index) => (
          <div className='rvlistbox' key={index} >
            <div className='rvliststatus'>예약확정</div>
            {/* <button onClick={confirmDelete}>취소하기</button> */}
           
                  <div> 
                    {/* {dateStatusCheck (reservation.reserveDate) || ( */}
                      <Button variant="outlined" onClick={handleClickOpen}>
                        예약 취소하기
                      </Button>
                      {/* )} */}
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            정말 예약을 취소하시겠습니까?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>아니오</Button>
                          <Button onClick={() => handleCancle(reservation)} autoFocus>네</Button>
                        </DialogActions>
                      </Dialog>
                  </div>
            
            {/* <Link to={`/classdetail/${reservation.eduId}` }>   */}
            <div className='rvitembox'>
              <div className='potobox'><img className="my-profile"  title="마이페이지" src={reservation.imgUrl || require('../icons/01d.png')} style={{border:"1px solid darkgray"}}/></div>
              <div className='minibox'>
                <div className='rvlistdate' >{reservation.reserveDate} {reservation.timeStart} ~ {reservation.timeEnd}</div>
                <div className='rvlisttitle'>{reservation.reserveTitle}</div>
                <div className='rvlistcount'>예약 인원 : {reservation.userCount}명</div>
                <div className='rvlistsally'>{reservation.reservePrice}원</div>
              </div>
            </div>
            {/* </Link> */}
            {/* {reservation.reserveDate <= today && ( // 오늘 날짜와 예약일이 같은 경우에만 후기쓰기 버튼을 보여줌
                <div className='rvlistbtnbox'>
                  <button className='relist'>후기쓰기</button>
                </div>
              )} */}
            {/* {dateStatusCheck(reservation.reserveDate) && ( */}
              <div className='rvlistbtnbox'>
                <Link to={'/review'} state={{ reservationInfo : reservation}}>
                  <button className='relist'>후기쓰기</button>
                </Link>
              </div>
            {/* )} */}
            {dateStatusCheck (reservation.reserveDate) || (
              <div className='rvlistbtnbox'>
                  <button className='norelist'>후기 등록 기간이 아닙니다.</button>
              </div>
            )}
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