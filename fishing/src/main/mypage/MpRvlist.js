import React, { useState, useEffect } from 'react';
import './MpScss/MpRvlist.scss';
import { Link } from 'react-router-dom';
import { getLoginUserInfo } from '../util/login-util';
import { API_BASE_URL, USER, RESERVATION } from '../../config/host-config';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MpList from './MpList';

const MpRvlist = () => {
  const [userProfile, setUserProfile] = useState({
    userId: 0,
    userName: '',
    userPoint: 0,
    reserveDTO: [],
    profileImageUrl: '',
  });

  const [userInfo, setUserInfo] = useState({
    token: '',
    userEmail: '',
    userName: '',
    userGrade: '',
    userId: '',
    userPhone: '',
  });

  const [open, setOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const handleClickOpen = (reservation) => {
    setSelectedReservation(reservation);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = (reservation) => {
    // console.log('삭제');
    // console.log('reservation: ', reservation);

    const formdata =
      reservation.type === 'EDU'
        ? {
            userId: userProfile.userId,
            reservationId: reservation.reservationId,
            eduId: reservation.id,
            productId: '',
            productType: reservation.type,
          }
        : {
            userId: userProfile.userId,
            reservationId: reservation.reservationId,
            eduId: '',
            productId: reservation.id,
            productType: reservation.type,
          };

    const requestHeader = {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + userInfo.token,
    };

    // 예약을 취소하기 위해 DELETE 요청을 보냅니다.
    fetch(`${API_BASE_URL}${RESERVATION}/remove`, {
      method: 'DELETE',
      headers: requestHeader,
      body: JSON.stringify(formdata),
    })
      .then((res) => {
        // console.log(res.status);
        return res.json();
      })
      .then((json) => {
        setUserProfile(json);
      });

    setOpen(false);
  };

  useEffect(() => {
    const user = getLoginUserInfo();
    setUserInfo(user);
    userReserveFetch();
  }, []);

  const userReserveFetch = async () => {
    const res = await fetch(`${API_BASE_URL}${USER}/user-mylist`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') },
    });

    if (res.status === 200) {
      const json = await res.json();
      // console.log('json: ', json);
      setUserProfile(json);
    } else if (res.status === 500) {
      alert('예약 내역이 없습니다');
    } else {
      alert('서버와의 통신이 원활하지 않습니다!');
    }
  };

  const dateStatusCheck = (checkDate) => {
    const todayDate = new Date();
    const formattedDateString = checkDate.replace('년', '-').replace('월', '-').replace('일', '');
    const targetDate = new Date(formattedDateString);

    if (todayDate <= targetDate) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <section className='MyPageMainBox'>
      <div className='mainbox-Rvlist'>
        <h3>내 예약 내역</h3>
        {!!userProfile.reserveDTO ? (
          userProfile.reserveDTO.map((reservation, index) => (
            <div className='rvlistbox' key={index}>
              <div className='rvlistwrap'>
                <div className='rvliststatus'>예약확정</div>
                <div>
                  {dateStatusCheck(reservation.reserveDate) || (
                    <Button variant='outlined' onClick={() => handleClickOpen(reservation)}>
                      예약 취소
                    </Button>
                  )}
                  <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
                    <DialogTitle id='alert-dialog-title'></DialogTitle>
                    <DialogContent>
                      <DialogContentText id='alert-dialog-description'>정말 예약을 취소하시겠습니까?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>아니오</Button>
                      <Button onClick={() => handleCancel(selectedReservation)} autoFocus>
                        네
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
              <div className='rvitembox'>
                <div className='potobox'>
                  <img className='my-profile' title='마이페이지' src={reservation.imgUrl || require('../icons/01d.png')} style={{ border: '1px solid darkgray' }} />
                </div>
                <div className='minibox'>
                  <div className='rvlistdate'>
                    {reservation.reserveDate} {reservation.timeStart} ~ {reservation.timeEnd}
                  </div>
                  <div className='rvlisttitle'>{reservation.reserveTitle}</div>
                  <div className='rvlistcount'>예약 인원 : {reservation.userCount}명</div>
                  <div className='rvlistsally'>{reservation.reservePrice}원</div>
                </div>
              </div>
              <div className='rvlistbtnbox-wrap'>
                {dateStatusCheck(reservation.reserveDate) || (
                  <div className='rvlistbtnbox'>
                    <button className='norelist'>후기 등록 기간이 아닙니다.</button>
                  </div>
                )}
                {dateStatusCheck(reservation.reserveDate) && (
                  <div className='rvlistbtnbox'>
                    <Link to='/review' state={{ reservationInfo: reservation }}>
                      <button className='relist'>🖍 후기쓰기</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>예약 내역이 없습니다.</div>
        )}
      </div>
    <MpList />
    </section>
  );
};

export default MpRvlist;