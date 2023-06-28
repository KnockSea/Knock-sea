import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./MpScss/MpInquiryResult.scss";
import { getLoginUserInfo } from "../util/login-util";
import { ANSWERS, API_BASE_URL, INQUIRIES } from "../../config/host-config";

const MpInquiryResult = () => {
    const { inquiryId } = useParams();
    const [inquiry, setInquiry] = useState([]);
    const [token, setToken] = useState(getLoginUserInfo().token);
    const [grade, setGrade] = useState(getLoginUserInfo().userGrade);
  
 

    const handleSubmitAnswer = (e) => {
        e.preventDefault();
        console.log(inquiryId);
        console.log(inquiry);
        console.log(inquiry.inquiryDetails);
    };

    const fetchInquiry = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}${INQUIRIES}/${inquiryId}`
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
    }, [inquiry && inquiry.length]);

    return (
        <section>
            <div className="adminbox">
                {grade ==='ADMIN' &&(
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
                )}
                <div className="mgcontentbox">
                    <div className="ctntitle">
                        KNOCK_SEA 유저 화면
                    </div>
                    <div className="ctntext">
                        <div className="ctntextbox1">
                        <div className="ctnminbox">
                            <div className="answertext">
                                {/* 작성자가 문의한 글 보여주는 곳 */}
                                {inquiry && inquiry.inquiryDetails}
                            </div>
                            <div className="adminreplyinput">
                                <div className="answer">
                                {inquiry && inquiry.answerDetails}
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {grade ==='ADMIN' ? (
                    <button onClick={handleSubmitAnswer}className="replybtn1">
                         <Link to="/adInquire">돌아가기</Link>
                    </button>
                    ) : (                    <button onClick={handleSubmitAnswer}className="replybtn1">
                    <Link to="/inquire">돌아가기</Link>
               </button>)}
                </div>
            </div>
        </section>
    );
};

export default MpInquiryResult;
