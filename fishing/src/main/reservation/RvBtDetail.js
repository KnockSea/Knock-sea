import React, { useEffect, useState } from "react";
import "./RvScss/RvBtDetail.scss";
import dt1 from "../img/dtRv.png";
import boat from "../img/boat.jpg";
import { API_BASE_URL, PRODUCTS, HEART } from "../../config/host-config";
import { useLocation, useParams } from "react-router-dom";
import { Calendar } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { getLoginUserInfo } from "../util/login-util";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import RvDetailTap from "./RvDetailTap";
import BtModal from "./BtModal";
import { useNavigate } from "react-router-dom";
import no from "../img/nophoto.jpg";

const RvBtDetail = () => {
  const { productId } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [sDetail, setSdetail] = useState({});
  const [userId, setUserId] = useState(getLoginUserInfo().userId);
  const [isHearted, setIsHearted] = useState(false);
  const [exists, setExists] = useState(false);
  const [eduHeartCount, setEduHeartCount] = useState(0);
  const [token, setToken] = useState(getLoginUserInfo().token);
  const navigate = useNavigate();
  const [imageCount, setImageCount] = useState(0);

  const fetchEduHeartCount = () => {
    fetch(
      `${API_BASE_URL}${HEART}/shipHeart?productId=${productId}&heartType=${"SHIP"}`
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
        const heartType = "SHIP"; // 하트 타입

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
          heartType: "SHIP",
          eduId: null,
          productId: productId,
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

  // useEffect(() => {
  //   fetch(`${API_BASE_URL}${PRODUCTS}/${productId}`)
  //     .then((response) => response.json())
  //     .then((sDetail) => {
  //       fetchEduHeartCount();
  //       setSdetail(sDetail);
  //     });
  // }, [productId, exists]);

  useEffect(() => {
    fetch(`${API_BASE_URL}${PRODUCTS}/${productId}`)
      .then((response) => response.json())
      .then((sDetail) => {
        fetchEduHeartCount();
        setSdetail(sDetail);
        setImageCount(sDetail.imgUrl.length);
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
        {/* {sDetail.imgUrl &&
          sDetail.imgUrl.map((url, index) => <img key={index} src={url} />)} */}
        {sDetail.imgUrl &&
          sDetail.imgUrl.map((url, index) => (
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
              {/* <span>{FsDetail.eduTitle}</span> */}
              <RvDetailTap sDetail={sDetail} />
            </div>
          </div>
        </div>

        <div className="right">
          <div className="detail-box detail-list-top">
            <div className="detail-section">
              <div className="detail-box detail-list-profile">
                <div className="lists">
                  {/* <Link
                    to={`/host/${sDetail.productId}/${sDetail.typeP}/${sDetail.userId}`}
                  > */}
                    <div className="box profile-img">
                      <img src={sDetail.userImgUrl} />
                    </div>
                    <span className="box profile-page">{sDetail.userName}</span>
                  {/* </Link> */}
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
                    <strong>'❤️' <span>{eduHeartCount}</span></strong>
</button>
                  </div>
                  <div className="condition">
                    <ul className="condition-box">
                      {/* <li>{sDetail.Level} |</li> */}
                      <li>
                        최대{" "}
                        {sDetail.timeList && sDetail.timeList[0].timeMaxUser}명
                        |
                      </li>
                      <li>{sDetail.price}원</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <button className="box btn" onClick={handleRegiIsloign}>
                    바로 예약하기
                  </button>
                  {modal === true ? (
                    <BtModal
                      closeModal={() => setModal(false)}
                      sDetail={sDetail}
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

export default RvBtDetail;
