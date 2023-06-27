import React from "react";
import { Link } from "react-router-dom";
import "./MpScss/Mypassword.scss";
import MpList from "./MpList";
import { useEffect, useState } from "react";
import { getLoginUserInfo } from "../util/login-util";
const Mypassword = () => {
  const [userInfo, setUserInfo] = useState({
    token: "", // Set default value for name
    userEmail: "", // Set default value for email
    userName: "",
    userGrade: "",
    userId: "",
    userPhone: "",
  });

  useEffect(() => {
    const user = getLoginUserInfo();
    setUserInfo(user);
  }, []);

  const sendmodifypassword = async (e) => {
    e.preventDefault();
  };
  return (
    <section className="MyPageMainBox">
      <div className="mainbox1">
        <h1>비밀번호 변경</h1>
        <div className="itembox">
          <div className="pw a1">
            <div className="title">현재 비밀번호</div>
            <input />
          </div>

          <div className="newpw a1">
            <div className="title">새 비밀번호</div>
            <input />
          </div>

          <div className="rpw a1">
            <div className="title">비밀번호 확인</div>
            <input />
          </div>

          <button className="rb">돌아가기</button>
          <button className="update" onClick={sendmodifypassword}>
            수정하기
          </button>
        </div>
      </div>

      <MpList />
    </section>
  );
};

export default Mypassword;
