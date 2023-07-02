import React, { useEffect, useState } from "react";
import "./RvScss/RvFsDetail.scss";
import dt1 from "../img/dtRv.png";
import fs from "../img/fs.jpg";
import no from "../img/nophoto.jpg";
import { API_BASE_URL, PRODUCTS, HEART } from "../../config/host-config";
import { useLocation, useParams } from "react-router-dom";
import { Calendar } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { getLoginUserInfo } from "../util/login-util";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import RvFsDetailTap from "./RvFsDetailTap";
import RvFsModal from "./RvFsModal";
import { useNavigate } from "react-router-dom";

const RvFsDetail = () => {
  const { productId } = useParams();
  const [modal, setModal] = useState(false);
  const [FsDetail, setFsdetail] = useState({});
  const [userId, setUserId] = useState(getLoginUserInfo().userId);
  const [exists, setExists] = useState(false);
  const [eduHeartCount, setEduHeartCount] = useState(0);
  const [token, setToken] = useState(getLoginUserInfo().token);
  const navigate = useNavigate();
  const [imageCount, setImageCount] = useState(0);

  const fetchEduHeartCount = () => {
    fetch(
      `${API_BASE_URL}${HEART}/spotHeart?productId=${productId}&heartType=${"SPOT"}`
    )
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
    const fetchHeartExists = async () => {
      try {
        const heartType = "SPOT"; // 하트 타입

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
          heartType: "SPOT",
          eduId: null,
          productId: productId,
        }),
      });

      if (response.ok) {
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

  // useEffect(() => {
  //   fetch(`${API_BASE_URL}${PRODUCTS}/${productId}`)
  //     .then((response) => response.json())
  //     .then((FsDetail) => {
  //       fetchEduHeartCount();
  //       setFsdetail(FsDetail);
  //     });
  // }, [productId, exists]);
  useEffect(() => {
    fetch(`${API_BASE_URL}${PRODUCTS}/${productId}`)
      .then((response) => response.json())
      .then((FsDetail) => {
        fetchEduHeartCount();
        setFsdetail(FsDetail);
        setImageCount(FsDetail.imgUrl.length);
      });
  }, [productId, exists]);
  const handleImageLoad = (e, index) => {
    const img = e.target;

    if (index === 0) {
      img.style.width = "100%";
      img.style.height = "100%";
    } else if (index === 1) {
      img.style.width = "100%";
      img.style.height = "100%";
    } else if (index === 2) {
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.disply = "flex";
      img.style.justifycontent = "space-between";
    }
  };

  const handleboxLoad = (e, index) => {
    const div = e.target.parentNode;
    if (index === 0) {
      div.style.width = "100%";
      div.style.height = "100%";
    } else if (index === 1) {
      div.style.width = "100%";
    } else if (index === 2) {
      div.style.width = "100%";
      div.style.overflow = "hidden";

      // div.style.display = "flex";
      // div.style.justifyContent = "space-between";
    }
  };

  // 기본 이미지 URL
  const defaultImageUrl = no;

  // 이미지 로드 실패 시 호출되는 핸들러
  const handleImageError = (e) => {
    e.target.src = defaultImageUrl;
  };

  return (
    <div className="allview">
      <div className="imgbox">
        {/* {FsDetail.imgUrl &&
    FsDetail.imgUrl.map((url, index) => (
      <div key={index} className="image-box" onLoad={(e) => handleboxLoad(e, index)}>
        <img
          src={url}
          onLoad={(e) => handleImageLoad(e, index)}
          onError={handleImageError}
          className="imgboxmian1"
        />
      </div>
    ))} */}
        {FsDetail.imgUrl &&
          FsDetail.imgUrl.map((url, index) => (
            <div
              key={index}
              className="image-box"
              onLoad={(e) => handleboxLoad(e, index)}
            >
              <img
                src={url}
                onLoad={(e) => handleImageLoad(e, index)}
                onError={handleImageError}
                className="imgboxmian1"
              />
            </div>
          ))}
        {imageCount === 1 && (
          <div className="image-box">
            <img src={no} alt="No Image" className="imgboxmian1" />
          </div>
        )}
      </div>

      <div className="allContentbox">
        <div className="left">
          <div id="class-detail-header"></div>
          <div className="detail-content-wrapz">
            <div className="detail-left-sectionz">
              <RvFsDetailTap FsDetail={FsDetail} />
            </div>
          </div>
        </div>

        <div className="right">
          <div className="detail-box detail-list-top">
            <div className="detail-section">
              <div className="detail-box detail-list-profile">
                <div className="lists">
                  <Link to={`/host/${FsDetail.productId}/${FsDetail.typeP}`}>
                    <div className="box profile-img">
                      <img src={FsDetail.userImgUrl} alt="Profile" />
                    </div>
                    <span className="box profile-page">
                      {FsDetail.userName}
                    </span>
                  </Link>
                  <div>
                    <button
                      onClick={createHeart}
                      style={{
                        color: "black",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontWeight: "bold", // 텍스트를 굵게 설정
                      }}
                    >
                      <strong>
                        '' <span>{eduHeartCount}</span>
                      </strong>
                    </button>
                  </div>
                  <div className="condition">
                    <ul className="condition-box">
                      <li>
                        최대{" "}
                        {FsDetail.timeList && FsDetail.timeList[0].timeMaxUser}{" "}
                        명 |
                      </li>
                      <li>{FsDetail.price}원</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <button className="box btn" onClick={handleRegiIsloign}>
                    바로 예약하기
                  </button>
                  {modal === true ? (
                    <RvFsModal
                      closeModal={() => setModal(false)}
                      FsDetail={FsDetail}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RvFsDetail;