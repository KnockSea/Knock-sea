import React, { useState, useEffect } from "react";
import MpList from "./MpList";
import { getLoginUserInfo } from "../util/login-util";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL, INQUIRIES } from "../../config/host-config";

const MpIqInput = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    if (title === "" || content === "") {
      alert("제목이나 내용이 비어있습니다!");
      return; // submit 이벤트를 중지합니다.
    }

    const data = {
      inquiryDetails: content,
      inquiryTitle: title,
    };

    fetch(`${API_BASE_URL}${INQUIRIES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        navigate("/inquire"); // fetch가 완료된 후 페이지 전환
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchToken = () => {
    const token = getLoginUserInfo().token;
    setToken(token);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <section className="MyPageMainBox">
      <div className="mainbox1">
        <h1>문의하기</h1>
        <div className="myquerybigbox">
          <div className="titlebox ">
            <div className="clbox">
              <div className="cltitle">제목</div>
            </div>
            <div className="cltextbox">
              <input value={title} onChange={handleTitleChange} />
            </div>
          </div>

          <div className="titlebox qtbox2">
            <div className="clbox exx1">
              <div className="cltitle">내용</div>
            </div>
            <div className="cltextbox qttext">
              <textarea value={content} onChange={handleContentChange} />
            </div>
          </div>

          <Link
            to={title && content ? "/inquire" : "#"}
            className="qtUpdatebtn"
            onClick={handleSubmit}
          >
            작성완료
          </Link>
        </div>
      </div>

      <MpList />
    </section>
  );
};

export default MpIqInput;