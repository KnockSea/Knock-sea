import React from "react";
import "./MpScss/MpRvlist.scss";
import { Link } from "react-router-dom";
import MpList from "./MpList";

const MpRvlist = () => {
  return (
    <section className="MyPageMainBox">
      <div className="mainbox1">
        <h1>내 예약 내역</h1>
        <div className="rvlistbox">
          <div className="rvliststatus">예약확정</div>
          <div className="rvitembox">
            <div className="potobox"></div>
            <div className="minibox">
              <div className="rvlistdate">2023.06.05 결제</div>
              <div className="rvlisttitle">[영종도]뉴정환호 낚시투어</div>
              <div className="rvlistsally">180000원</div>
            </div>
          </div>
          <div className="rvlistbtnbox">
            <button className="relist">후기쓰기</button>
          </div>
        </div>
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
      <MpList />
    </section>
  );
};

export default MpRvlist;
