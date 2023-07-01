import React, { useEffect, useState } from "react";
import "./MpScss/MpInquire.scss";
import { Link } from "react-router-dom";
import MpList from "./MpList";
import { getLoginUserInfo } from "../util/login-util";
import Stack from "@mui/material/Stack";
import Pagination from "react-js-pagination";
import { API_BASE_URL, INQUIRIES } from "../../config/host-config";

const MpInquire = () => {
    const [inquiries, setInquiries] = useState([]);
    const [token, setToken] = useState(getLoginUserInfo().token);
    const [totalItemCount, setTotalItemCount] = useState(0);
    const [page, setPage] = useState(1);
    const [fetchSuccess, setFetchSuccess] = useState(true);
  
    useEffect(() => {
      const fetchToken = async () => {
        const userToken = await getLoginUserInfo().token;
        setToken(userToken);
      };
  
      fetchToken();
    }, []);
  
    const handlePageChange = (page) => {
      setPage(page);
    };
  
    const fetchData = () => {
      fetch(
        `${API_BASE_URL}${INQUIRIES}/myInquiry?page=${page}&size=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setInquiries(data.inquiries);
            setTotalItemCount(data.pageInfo.totalCount);
            setFetchSuccess(true); // 데이터 패치 성공
          } else {
            setFetchSuccess(false); // 데이터 패치 실패
          }
        })
        .catch((error) => {
          console.error(error);
          setFetchSuccess(false); // 데이터 패치 실패
        });
    };
  
    useEffect(() => {
      fetchData();
    }, [page, token, inquiries.length]);
  
    return (
      <section className="MyPageMainBox">
        <div className="mainbox1">
          <h1>문의 현황</h1>
          {fetchSuccess ? (
            inquiries.length !== 0 ? (
              inquiries.map((inquiry) => (
                <div key={inquiry.inquiryId} className="inbox">
                  <div className="initembox">
                    <div className="innumbox">{inquiry.inquiryId}</div>
                    <div className="intitle">{inquiry.inquiryTitle}</div>
                    <div className="indate">{inquiry.inquiryDateTime}</div>
                  </div>
                  <button className="detail-btn">
                    <Link to={`/inquiryResult/${inquiry.inquiryId}`} className="indetailbtn">
                      상세보기
                    </Link>
                  </button>
                </div>
              ))
            ) : (
              <div>문의가 입력된 것이 없습니다.</div>
            )
          ) : (
            <div>문의 목록을 불러오는 중에 오류가 발생했습니다.</div>
          )}
          <div className="page">
            <Pagination
              activePage={page}
              itemsCountPerPage={10}
              totalItemsCount={totalItemCount}
              pageRangeDisplayed={5}
              prevPageText={"‹"}
              nextPageText={"›"}
              onChange={handlePageChange}
            />
          </div>
        </div>
        <MpList />
      </section>
    );
  };
  
  export default MpInquire;