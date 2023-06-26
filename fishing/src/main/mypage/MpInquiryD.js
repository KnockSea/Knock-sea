import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./MpScss/MpInquiryD.scss";
import { getLoginUserInfo } from "../util/login-util";

const MpInquiryD = () => {
  const { inquiryId } = useParams();
  const [answerDetails, setAnswerDetails] = useState("");
  const [answers, setAnswers] = useState([]);
  const [data, setData] = useState(null);
  const [inquiry, setInquiry] = useState([]);

  const handleAnswerChange = (e) => {
    setAnswerDetails(e.target.value);
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    // TODO: Submit the answer
    console.log(answerDetails);
    console.log(inquiryId);
    console.log(inquiry);
    console.log(inquiry?.inquiryDetails);
    // Reset the answer field
    setAnswerDetails("");
  };

  const fetchInquiry = async () => {
    try {
      const response = await fetch(
        `http://localhost:8012/api/v1/inquiries/${inquiryId}`
      );
      if (response.ok) {
        const inquire = await response.json();
        setInquiry(inquire);
      } else {
        throw new Error("Failed to fetch inquiry");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInquiry();
  }, []);

  return (
    <section>
      <div className="adminbox">
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
          <div className="ctntitle">KNOCK_SEA 관리자 화면 (답변하기)</div>

          <div className="ctntext">
            <div className="ctntextbox1">
              <div className="ctnminbox">
                <div className="answertext">
                  {/* 작성자가 문의한 글 보여주는 곳 */}
                  {inquiry && inquiry.inquiryDetails}
                </div>
                <div className="adminreplyinput">
                  <textarea
                    value={answerDetails}
                    onChange={handleAnswerChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <button onClick={handleSubmitAnswer} className="replybtn1">
            답변완료
          </button>
          {/* 답변완료를 누르면 관리자화면에서 답변한 게시글은 없어지거나  답변하기가 사라져야 하지않나? */}
        </div>
      </div>
    </section>
  );
};

export default MpInquiryD;
