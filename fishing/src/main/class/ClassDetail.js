import React, { useState, useEffect } from "react";
import "./scss/ClassDetail.scss";
import ClassModal from "./ClassModal";
import ClassDetailTap from "./ClassDetailTap";
import Calendar from "../Calendar";
import { Route, Routes, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getLoginUserInfo } from "../util/login-util";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, EDU, HEART } from "../../config/host-config";

function ClassDetail() {
  const [modal, setModal] = useState("false");

  const { eduId } = useParams();
  const [oneEdu, setOneEdu] = useState([]);
  const [token, setToken] = useState(getLoginUserInfo().token);
  const [userId, setUserId] = useState(getLoginUserInfo().userId);
  const [isHearted, setIsHearted] = useState(false);
  const [exists, setExists] = useState(false);
  const navigate = useNavigate();
  const [eduHeartCount, setEduHeartCount] = useState(0);

  const fetchEduHeartCount = () => {
    fetch(`${API_BASE_URL}${HEART}/eduHeart?eduId=${eduId}&heartType=${"EDU"}`)
      .then((response) => response.json())
      .then((data) => setEduHeartCount(data))
      .catch((error) =>
        console.error("Error fetching edu heart count:", error)
      );
  };

  const handleRegiIsloign = (e) => {
    if (!token) {
      alert("로그인이 필요한 서비스입니다!😏");
      navigate("/login");
      return;
    } else {
      setModal(true);
      e.preventDefault();
    }
  };

  useEffect(() => {

    // console.log('eduId',eduId);
    const fetchHeartExists = async () => {
      try {
        const heartType = "EDU"; // 하트 타입
        const apiUrl = `${API_BASE_URL}${HEART}/exists?userId=${userId}&heartType=${heartType}`;
        const response = await fetch(apiUrl);
        const exists = await response.json();

        setExists(exists);
      } catch (error) {
        console.error("API 요청 실패:", error);
      }
    };

    fetchHeartExists();
  }, [userId]);

  const createHeart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${HEART}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          heartType: "EDU",
          eduId: eduId,
          productId: null,
        }),
      });

      if (response.ok) {
        const updatedIsHearted = !isHearted;
        setIsHearted(updatedIsHearted);
        localStorage.setItem("isHearted", updatedIsHearted.toString());

        // 하트 생성 후 exists 값을 업데이트
        const updatedExists = !exists;
        setExists(updatedExists);
        fetchEduHeartCount();
      } else {
        console.error("하트 생성 또는 삭제 실패");
      }
    } catch (error) {
      console.error("하트 생성 또는 삭제 실패:", error);
    }
  };

  const requestHeader = {
    'content-type': 'application/json',
    Authorization: 'Bearer ' + token,
  };

  const fetchEduList = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${EDU}/${eduId}`, {
        method: 'GET',
        headers: requestHeader,
      });

      if (response.status === 200) {
        const json = await response.json();
        // console.log(json);
        setOneEdu(json);
        fetchEduHeartCount();
      } else {
        alert('서버가 불안정합니다');
        // console.log(response);
      }
    } catch (error) {
      console.error('Error fetching edu list:', error);
    }
  };

  useEffect(() => {
    fetchEduList();
    fetchEduHeartCount();
  }, [eduId, exists]);

  return (
    <div className="class-detail-container">
      <div className="class-detail-wrap">
        <div id="class-detail-header">
          <div className="detail-main-photo1">
            <img
              src={oneEdu.imageList && oneEdu.imageList[0]}
              className="photo1"
              alt="Photo1"
            />
          </div>
          <div className="photo detail-main-photo2">
            <img
              src={oneEdu.imageList && oneEdu.imageList[1]}
              className="photo2"
              alt="Photo2"
            />
          </div>
          <div className="photo detail-main-photo3">
            <img
              src={oneEdu.imageList && oneEdu.imageList[2]}
              className="photo3"
              alt="Photo3"
            />
          </div>
        </div>
        <div className="detail-content-wrap">
          <div className="detail-left-section">
            <span style={{ textAlign: 'left' }}>{oneEdu.eduTitle}</span>
            <ClassDetailTap eduInfo={oneEdu.eduInfo} reviewList={oneEdu.reviewList} />
          </div>
          <div className="detail-right-section">
            <div className="detail-box detail-list-top">
              <div className="detail-section">
                <div className="detail-box detail-list-profile">
                  <div className="lists">
                    <div className="box profile-img">
                      <img src={oneEdu.userProfileImage} alt="Profile" />
                    </div>
                    <span className="box profile-page">{oneEdu.userName}</span>
                    <div>
                      <button
                        onClick={createHeart}
                        style={{
                          color: "black",
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                      >
                        '❤️' <span>{eduHeartCount}</span>
                      </button>
                    </div>
                    <div className="condition">
                      <ul className="condition-box">
                        <li>{oneEdu.eduLevel} |</li>
                        <li>
                          {" "}
                          최대{" "}
                          {oneEdu.timeList && oneEdu.timeList[0].timeMaxUser}명
                          |
                        </li>
                        <li> {oneEdu.eduPrice}원</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <button className="box btn" onClick={handleRegiIsloign}>
                      바로 예약하기
                    </button>
                    {modal === true ? (
                      <ClassModal
                        closeModal={() => setModal(false)}
                        oneEdu={oneEdu}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassDetail;
