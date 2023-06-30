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
    const [fetchSuccess, setFetchSuccess] = useState(true); // 패치 성공 여부를 저장하는 상태 변수

    const handlePageChange = (page) => {
        setPage(page);
        console.log(page);
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
                    // console.log(data.pageInfo.totalCount);
                    setInquiries(data.inquiries);
                    setTotalItemCount(data.pageInfo.totalCount);
                    setFetchSuccess(false);
                } else {
                    // 처리할 에러에 대한 로직 추가
                }
            })
            .catch((error) => {
                console.error("이거 들어오는거임?", error);
            });
    };


    useEffect(() => {
        fetchData();
        setFetchSuccess(true);
    }, [page]);

    return (
        <section className="MyPageMainBox">
            <div className="mainbox1">
                <h1>문의 현황</h1>
                {inquiries.length !== 0 ? (
                    inquiries.map((inquiry) => (
                        <div key={inquiry.inquiryId} className="inbox">
                            <div className="initembox">
                                <div className="innumbox">
                                    {inquiry.inquiryId}
                                </div>
                                <div className="intitle">
                                    {inquiry.inquiryTitle}
                                </div>
                                <div className="indate">
                                    {inquiry.inquiryDateTime}
                                </div>
                            </div>
                            <button className="detail-btn">
                            <Link
                                   to={`/inquiryResult/${inquiry.inquiryId}`}
                                className="indetailbtn"
                            >
                                상세보기
                            </Link>
                            </button>
                            {/* 상세보기 화면 내가 쓴글이 보여야 한다 */}
                            {/* @@@@@@@@@@@@@@@@@@@@@@@@@ 유저 문의 상세보기 눌렀을때 나오는 폼 만들어주세요@@@@@@@@@@@@@@@@@@@@@ */}
                            {/* MpInquiryResult 임시 상세보기 만들었습니다@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
                        </div>
                    ))
                    ) : (
                        <div>문의가 입력된 것이 없습니다.</div>
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
