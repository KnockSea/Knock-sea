import React from "react";
import bk from "../img/back.jpg";
import "./MpScss/MpDrop.scss";
import { Link } from "react-router-dom";

const MpDrop = () => {
  return (
    // <section>

    <div className="bg">
      {/* <img src={bk}/> */}
      <div className="textbox1">
        <h1>이용해주셔서 감사합니다</h1>
        <p>더 나은 서비스를 제공하는 Knock_Sea가 되겠습니다.</p>
        <button className="btnhome">
          <Link to={"/"} className="hbtn1">
            홈으로
          </Link>
        </button>
      </div>
    </div>
    // </section>
  );
};

export default MpDrop;
