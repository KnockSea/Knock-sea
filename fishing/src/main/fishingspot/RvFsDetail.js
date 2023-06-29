import React, { useEffect, useState } from "react";
import "./RvScss/RvFsDetail.scss";
import dt1 from "../img/dtRv.png";
import fs from "../img/fs.jpg";

import { API_BASE_URL, PRODUCTS } from "../../config/host-config";
import { useLocation, useParams } from "react-router-dom";
import { Calendar } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { getLoginUserInfo } from '../util/login-util';

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import RvFsDetailTap from "./RvFsDetailTap";
import RvFsModal from "./RvFsModal";



const RvFsDetail = () => {
  const { productId } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [FsDetail, setFsdetail] = useState({});
  const [userId, setUserId] = useState(getLoginUserInfo().userId);
  const [isHearted, setIsHearted] = useState(false);
  const [exists, setExists] = useState(false);
  const [eduHeartCount, setEduHeartCount] = useState(0);


 const fetchEduHeartCount = () => {
    fetch(`http://localhost:8012/api/v1/hearts/spotHeart?productId=${productId}&heartType=${'SPOT'}`)
      .then(response => response.json())
      .then(data => setEduHeartCount(data))
      .catch(error => console.error('Error fetching edu heart count:', error));
  };



  useEffect(() => {
    const fetchHeartExists = async () => {
      try {
        const heartType = 'SPOT'; // 하트 타입
  
        const apiUrl = `http://localhost:8012/api/v1/hearts/exists?userId=${userId}&heartType=${heartType}`;
  
        const response = await fetch(apiUrl);
        const exists = await response.json();
  
        setExists(exists);
      } catch (error) {
        console.error('API 요청 실패:', error);
      }
    };
  
    fetchHeartExists();
  }, [userId]);
  
  const createHeart = async () => {
    try {
      const response = await fetch('http://localhost:8012/api/v1/hearts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          heartType: 'SPOT',
          eduId: null,
          productId: productId,
        }),
      });
  
      if (response.ok) {
        const updatedIsHearted = !isHearted;
        setIsHearted(updatedIsHearted);
        localStorage.setItem('isHearted', updatedIsHearted.toString());
  
        // 하트 생성 후 exists 값을 업데이트
        const updatedExists = !exists;
        setExists(updatedExists);
        fetchEduHeartCount();
      } else {
        console.error('하트 생성 또는 삭제 실패');
      }
    } catch (error) {
      console.error('하트 생성 또는 삭제 실패:', error);
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}${PRODUCTS}/${productId}`)
      .then((response) => response.json())
      .then((FsDetail) => {
        fetchEduHeartCount();
        setFsdetail(FsDetail);
      });
  }, [productId, exists]);

  return (
    <div className="allview">
      <div className="imgbox">
        {/* <img src={FsDetail.imageList && FsDetail.imageList[1]} />
        <img src={FsDetail.imageList && FsDetail.imageList[2]} /> */}
          {FsDetail.imgUrl &&
          FsDetail.imgUrl.map((url, index) => <img key={index} src={url} />)}
      </div>

      <div className="allContentbox">
        <div className="left">
          <div id="class-detail-header"></div>
          <div className="detail-content-wrapz">
            <div className="detail-left-sectionz">
              {/* <span>{FsDetail.eduTitle}</span> */}
              <RvFsDetailTap FsDetail={FsDetail} />
            </div>
          </div>
        </div>

        <div className="right">
          <div className="detail-box detail-list-top">
            <div className="detail-section">
              <div className="detail-box detail-list-profile">
                <div className="lists">
                  <Link to={"/host"}>
                    <div className="box profile-img">
                      <img src={FsDetail.userImgUrl} />
                    </div>
                    <span className="box profile-page">
                      {FsDetail.userName}
                    </span>
                  </Link>
                  <div>
                  <button
                        onClick={createHeart}
                        style={{
                          color: exists ? 'red' : 'black',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        {exists ? '❤️' : '🤍'}
                        <h3>{eduHeartCount}</h3>
                      </button>
                    </div>
                  <div className="condition">
                    <ul className="condition-box">
                      {/* <li>{FsDetail.Level} |</li> */}
                      <li>
                        최대{" "}
                        {FsDetail.timeList && FsDetail.timeList[0].timeMaxUser}
                        명 |
                      </li>
                      <li>{FsDetail.price}원</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <button
                    className="box btn"
                    onClick={() => {
                      setModal(true);
                    }}
                  >
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