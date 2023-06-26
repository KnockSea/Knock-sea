import React from "react";
import "./MpScss/MpAdmin.scss";
import { Link } from "react-router-dom";

const MpAdmin = () => {
  return (
    <section>
      <div className="adminbox">
        {/* 관리자목록박스  */}
        <div className="mgbox">
          <div className="mgtitle">
            <p>관리자</p>
          </div>
          <div className="mglist">
            <div>
              <Link to="/admin">배 검증요청</Link>
            </div>
            <div className="ch2">
              <Link to="/adminFS">낚시터 검증요청</Link>
            </div>
            <div>
              <Link to="/adminCS">문의 현황</Link>
            </div>
          </div>
        </div>
        <div className="mgcontentbox">
          <div className="ctntitle">KNOCK_SEA 관리자 화면 (배)</div>

          {/* 본문내용 */}
          <div className="ctntext">
            <div className="ctntextbox1">
              <div>dasdas</div>
              <div>선박등록이미지</div>
              <div>12-**-1213</div>
              <div>
                <button>승인</button>
                <button>취소</button>
              </div>
              <div>2023-06-21</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MpAdmin;
