import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import { getLoginUserInfo } from "../util/login-util";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, USER } from "../../config/host-config";

export default function MpModal({ user }) {
  //화면이동 함수
  const navi = useNavigate();

  const { email, password } = user;
  // console.log(email);
  // console.log(password);
  // console.log(getLoginUserInfo().token);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // //회원탈퇴하는 함수
  const deleteuser = async () => {
    const userDeleteRequest = {
      userEmail: email, // 사용자 이메일 입력
      userPassword: password, // 사용자 비밀번호 입력
    };

    try {
      const res = await fetch(`${API_BASE_URL}${USER}/userDelete`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDeleteRequest),
      });

      if (res.status === 200) {
        const json = await res.json();
        alert("회원을 삭제했습니다.");
        localStorage.clear();
        navi("/");
      } else if (res.status === 400) {
        alert("서버와의 통신오류가있습니다");
      } else {
        alert("비밀번호가 다릅니다");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        className="btn11"
        style={{ color: "#fff", border: "none", textAlign: "center" }}
        onClick={handleClickOpen}
      >
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
          <Button onClick={handleClose} style={{ color: "red" }} autoFocus>
            <Link
              to={"/drop"}
              style={{ textDecoration: "none" }}
              onClick={deleteuser}
            >
              {" "}
              탈퇴하기
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
