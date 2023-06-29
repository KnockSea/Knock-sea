import React, { useEffect, useState } from "react";
import "./RvScss/RvBtDetail.scss";
import dt1 from "../img/dtRv.png";
import boat from "../img/boat.jpg";
import { API_BASE_URL, PRODUCTS } from "../../config/host-config";
import { useLocation, useParams } from "react-router-dom";
import { Calendar } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { getLoginUserInfo } from "../util/login-util";
import { useNavigate } from 'react-router-dom';

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import RvDetailTap from "./RvDetailTap";
import BtModal from "./BtModal";

const RvBtDetail = () => {
  const { productId } = useParams();
  const [token, setToken] = useState(getLoginUserInfo().token);
  const [selectedCity, setSelectedCity] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  const cities = [
    { name: "옵션선택안함", code: "B1" },
    { name: "초보자옵션1 (1인당 15000원)", code: "A1" },
  ];


  // const location = useLocation();
  // console.log(location)
  console.log(productId);
  // const productId = location.state.productId;
  // useEffect(()=>{

  // },[])
  const [modal, setModal] = useState("false");
  const [sDetail, setSdetail] = useState({});

  const handleRegiIsloign = (e) => {
    if (!token) {
            alert("로그인이 필요한 서비스입니다!😏");
            navigate('/login');
        return;
          } else {
            setModal(true);
            e.preventDefault();
            }};

            
  useEffect(() => {
    fetch(`${API_BASE_URL}${PRODUCTS}/${productId}`)
      .then((response) => response.json())
      .then((sDetail) => {
        setSdetail(sDetail);
      });
  }, []);

  console.log("sdatail", sDetail);
  console.log("xxx", sDetail.title);
  return (
    <div className="allview">
      <div className="imgbox">
        {/* <img src={sDetail.imgUrl && sDetail.imgUrl[1]} />
        <img src={sDetail.imgUrl && sDetail.imgUrl[2]} /> */}
        {sDetail.imgUrl &&
          sDetail.imgUrl.map((url, index) => <img key={index} src={url} />)}
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
                  <Link to={"/host"}>
                    <div className="box profile-img">
                      <img src={sDetail.userImgUrl} />
                    </div>
                    <span className="box profile-page">{sDetail.userName}</span>
                  </Link>
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
                  <button
                    className="box btn"
                    onClick={handleRegiIsloign}
                  >
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
