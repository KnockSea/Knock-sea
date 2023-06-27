import React, { useState } from "react";
import MpList from "./MpList";
import "./MpScss/MpQueryText.scss";
import { getLoginUserInfo } from "../util/login-util";
import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL, FISHINGSPOT, SHIP } from "../../config/host-config";

const MpQueryText = () => {
  const [token, setToken] = useState(getLoginUserInfo().token);
  const [images, setImages] = useState([]);
  const [info, setInfo] = useState({
    category: "",
    shipName: "",
    shipDescription: "",
  });

  // 이미지 선택상자 하나로 받을때
  const handleImage = (e) => {
    // const img = Array.from(e.target.files);
    setImages([...e.target.files]);
    console.log("이미지 파일 목록 뜸?", images);
  };

  const handleTitle = (e) => {
    const newInfo = { ...info, shipName: e.target.value };
    setInfo(newInfo);
  };

  const handleContent = (e) => {
    const newInfo = { ...info, shipDescription: e.target.value };
    setInfo(newInfo);
    console.log(info.category);
  };

  const handleCategory = (e) => {
    const newInfo = { ...info, category: e.target.value };
    setInfo(newInfo);
    console.log(info.category);
  };

  //배/ 낚시터 정보 등록하기
  const shipRegiFetch = async () => {
    // e.preventdefault();

    if (info.category === "ship") {
      const userJsonBlob = new Blob([JSON.stringify(info)], {
        type: "application/json",
      });

      const formData = new FormData();
      formData.append("shipDTO", userJsonBlob);
      images.forEach((imgs) => {
        formData.append("shipImages", imgs);
      });

      for (let pair of formData.entries()) {
        console.log(
          "키: " + JSON.stringify(pair[0]),
          "밸류: " + JSON.stringify(pair[1].name)
        );
      }
      try {
        const res = await fetch(`${API_BASE_URL}${SHIP}/register`, {
          method: "POST",
          headers: { Authorization: "Bearer " + token },
          body: formData,
        });

        if (res.status === 200) {
          alert("등록 성공");
          window.location.href = "/my";
        } else {
          alert(res.text());
        }
      } catch (error) {
        console.error("등록 실패");
      }
    } else if (info.category === "fishing") {
      const data = {
        spotName: info.shipName,
        spotDescription: info.shipDescription,
      };

      // console.log(data);
      const userJsonBlob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });

      console.log(Blob);

      const formData = new FormData();
      formData.append("spot", userJsonBlob);
      images.forEach((imgs) => {
        formData.append("spotImage", imgs);
      });

      for (let pair of formData.entries()) {
        console.log(
          "키: " + JSON.stringify(pair[0]),
          "밸류: " + JSON.stringify(pair[1].name)
        );
      }
      try {
        const res = await fetch(
          `${API_BASE_URL}${FISHINGSPOT}/register`,
          {
            method: "POST",
            headers: { Authorization: "Bearer " + token },
            body: formData,
          }
        );

        if (res.status === 200) {
          alert("등록 성공");
          window.location.href = "/my";
        } else if (res.status === 400) {
          alert("등록실패");
        }
      } catch (error) {
        console.error("서버와의 통신오류발생");
      }
    }
  };
  return (
    <section className="MyPageMainBox">
      <div className="mainbox1">
        <h1>업체 내용 작성</h1>

        <div className="myquerybigbox">
          <div className="titlebox">
            <div className="clbox">
              <div className="cltitle">카테고리</div>
            </div>
            <div className="category">
              <input
                id="ship"
                type="radio"
                value="ship"
                checked={info.category === "ship"}
                onChange={handleCategory}
              />
              <label htmlFor="ship">배</label>
              <input
                id="fishing"
                type="radio"
                value="fishing"
                checked={info.category === "fishing"}
                onChange={handleCategory}
              />
              <label htmlFor="fishing">낚시터</label>
            </div>
          </div>
          {/* 제목 이름 작성 부분 */}
          <div className="titlebox ">
            <div className="clbox">
              <div className="cltitle">제목(이름)</div>
            </div>
            <div className="cltextbox">
              <input type="text" onChange={handleTitle} />
            </div>
          </div>
          {/* 제목 이름 작성 부분  끝 */}

          {/* 내용 작성 부분 */}
          <div className="titlebox qtbox2">
            <div className="clbox exx1">
              <div className="cltitle">내용</div>
            </div>
            <div className="cltextbox qttext">
              <textarea type="text" onChange={handleContent} />
            </div>
          </div>
          {/* 내용 작성 부분 끝 */}

          <div className="titlebox qtfilebox1">
            <div className="clbox">
              <div className="cltitle qt">첨부파일</div>
            </div>
            <div className="filebox">
              <label htmlFor="shipConfirmImage1">파일 선택하기</label>
              <div>
                <input
                  type="file"
                  onChange={handleImage}
                  id="shipConfirmImage1"
                  className="form-control"
                  accept="image/*"
                  multiple
                />
                <span style={{ color: "black" }}>
                  {images[0] && <p>첨부된 사진 : {images[0].name}</p>}
                </span>
              </div>
            </div>
          </div>
          <button className="qtUpdatebtn" onClick={shipRegiFetch}>
            글 등록하기
          </button>
        </div>
      </div>
      <MpList />
    </section>
  );
};

export default MpQueryText;
