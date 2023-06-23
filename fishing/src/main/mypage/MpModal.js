import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';
import { getLoginUserInfo } from '../util/login-util';

export default function MpModal({ user }) {

  const { email, password } = user;
  console.log(email);
  console.log(password);
  console.log(getLoginUserInfo().token);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  // //회원탈퇴하는 함수
  const deleteuser = () => {

    (async () => {

      const userDeleteRequest = {
        userEmail: email, // Fill in the user email
        userPassword: password // Fill in the user password
      };

      const res = await fetch('http://localhost:8012/api/v1/user/userDelete', {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' +localStorage.getItem('ACCESS_TOKEN')},
        body: JSON.stringify(userDeleteRequest)
      });
  
      if (res.status === 200) {
        const json = await res.json(); // JSON 데이터 파싱
        alert(json);
        /*
        // 서버에서 직렬화된 이미지가 응답된다.
        const profileBlob = await res.blob();
        // 해당 이미지를 imgUrl로 변경
        const imgUrl = window.URL.createObjectURL(profileBlob);
        setProfileUrl(imgUrl);
        */
      } else {
      }
    })();
  };

  return (
    <div>
      <Button variant="outlined" className='btn11'
      style={{color:'#fff',
       border:'none',
       textAlign:'center'
    }}
      onClick={handleClickOpen}>
        탈퇴하기
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"정말 탈퇴하시겠습니까 ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           탈퇴 시 계정이 영구 삭제됩니다
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>돌아가기</Button>
          <Button onClick={handleClose} 
          style={{color:'red'}}
          autoFocus>
           <Link to={'/drop'} style={{textDecoration:'none'}} onClick={deleteuser}> 탈퇴하기</Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
