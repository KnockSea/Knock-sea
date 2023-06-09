import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./MpScss/MpInquiryD.scss";
import { getLoginUserInfo } from "../util/login-util";
import { API_BASE_URL, INQUIRIES, ANSWERS } from "../../config/host-config";


const MpInquiryD = () => {
    const { inquiryId } = useParams();
    const [answerDetails, setAnswerDetails] = useState("");
    const [answers, setAnswers] = useState([]);
    const [data, setData] = useState(null);
    const [inquiry, setInquiry] = useState([]);
    const [token, setToken] = useState(getLoginUserInfo().token);

    const handleSubmit = () => {
        const data = {
            answerDetails: answerDetails,
            inquiryId: inquiryId,
        };

        fetch(`${API_BASE_URL}${ANSWERS}/makeAnswer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                // 서버 응답을 처리하는 로직 작성
                // console.log(result);
            })
            .catch((error) => {
                // 에러 처리 로직 작성
                console.error(error);
            });
    };

    const handleAnswerChange = (e) => {
        setAnswerDetails(e.target.value);
    };

    const handleSubmitAnswer = (e) => {
        e.preventDefault();
        // TODO: Submit the answer
        // console.log(answerDetails);
        // console.log(inquiryId);
        // console.log(inquiry);
        // console.log(inquiry.inquiryDetails);
        // Reset the answer field
        setAnswerDetails("");
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
    }, []);

    return (
        <section>
            <div className="MpAdminbox">
                <div className="mgbox">
                    <div className="mgtitle">
                        <p>[관리자]</p>
                    </div>
                    <div className="mglist">
                        <div>
                            <Link to="/admin" className='mgcontent'>배 검증요청</Link>
                        </div>
                        <div>
                            <Link to="/adminFS" className='mgcontent'>낚시터 검증요청</Link>
                        </div>
                        <div>
                            <Link to="/adminCS" className='mgcontent'>문의 현황</Link>
                        </div>
                    </div>
                </div>
                <div className="mgcontentbox">
                    <div className="ctntitle">
                        KNOCK_SEA 관리자 화면 (답변하기)
                    </div>
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
                    <button onClick={handleSubmit} className="replybtn1">
                        <Link to="/adminCS">답변완료</Link>
                    </button>
                    {/* 답변완료를 누르면 관리자화면에서 답변한 게시글은 없어지거나  답변하기가 사라져야 하지않나? */}
                </div>
            </div>
        </section>
    );
};

export default MpInquiryD;