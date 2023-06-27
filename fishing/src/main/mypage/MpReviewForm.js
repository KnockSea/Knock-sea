import React, { useState, useEffect } from "react";
import MpList from "./MpList";
import RatingSection from "./RatingSection";
import { getLoginUserInfo } from "../util/login-util";
import { Link } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const MpReviewForm = () => {
  const [reviewContent, setReviewContent] = useState("");
  const [reviewType, serReviewType] = useState("");
  const [token, setToken] = useState("");
  const [ratingIndex, setRatingIndex] = useState(1); 


  const handleContentChange = (reviewContent) => 
    {
      setReviewContent(reviewContent.target.value);
    };

  const handleSubmit = () => {
    const formdata = {
      reviewContent: reviewContent,
      reviewRating: ratingIndex,
      reviewType : reviewType,
    };

    console.log(formdata);

    fetch("http://localhost:8012/api/v1/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization : "Bearer " + token,
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .then((result) => {
        // 서버 응답을 처리하는 로직 작성
        console.log(result);
      })
      .catch((error) => {
        // 에러 처리 로직 작성
        console.error(error);
      });
  };

  // 토큰을 얻어오는 함수 (예시: 로그인 후 토큰 저장)
  const fetchToken = () => {
    const token = getLoginUserInfo().token;
    setToken(token);
  };

  // 컴포넌트가 마운트될 때 토큰을 얻어오도록 useEffect를 사용하여 호출
  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <section className="MyPageMainBox">
      <div className="mainbox1">
        <h1>후기쓰기</h1>

        <div className="myquerybigbox">
          <div className="titlebox ">
            <div className="clbox">
              <div value={reviewType}>{reviewType.name}</div>
              <div className="cltitle">별점</div>
            </div>
            <div>
            <RatingSection
                ratingIndex={ratingIndex}
                setRatingIndex={setRatingIndex}
              />
              
              </div>
          </div>

          <div className="titlebox qtbox2">
            <div className="clbox exx1">
              <div className="cltitle">내용</div>
            </div>
            <div className="cltextbox qttext">
              <textarea value={reviewContent} onChange={handleContentChange} />
            </div>
          </div>
      <br />
          <Link to="/inquire" className="qtUpdatebtn" onClick={handleSubmit}>
            작성완료 </Link>
        </div>
      </div>

      <MpList />
    </section>
  );
};

export default MpReviewForm;
