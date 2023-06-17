import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';

export default function MpModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
           <Link to={'/drop'} style={{textDecoration:'none'}}> 탈퇴하기</Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
