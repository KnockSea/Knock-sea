import React, { useEffect, useState } from "react";
import "./RvScss/RvFsDetail.scss";
import dt1 from "../img/dtRv.png";
import fs from "../img/fs.jpg";
import ClassModal from "../class/ClassModal";

import { API_BASE_URL, PRODUCTS } from "../../config/host-config";
import { useLocation, useParams } from "react-router-dom";
import { Calendar } from "react-bootstrap-icons";
import { Link } from "react-router-dom";


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

  useEffect(() => {
    fetch(`${API_BASE_URL}${PRODUCTS}/${productId}`)
      .then((response) => response.json())
      .then((FsDetail) => {
        setFsdetail(FsDetail);
      });
  }, []);

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
