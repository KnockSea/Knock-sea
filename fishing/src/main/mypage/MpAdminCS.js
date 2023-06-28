import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MpScss/MpAdminCS.scss";
import MpInquiryD from './MpInquiryD'
import "./MpScss/Paging.css";
import Pagination from "react-js-pagination";
import { API_BASE_URL, INQUIRIES } from "../../config/host-config";

const MpAdminCS = () => {
  const [inquiries, setInquiries] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };

  useEffect(() => {
    fetchInquiries();
  }, [page, inquiries && inquiries.length]);

  const fetchInquiries = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${INQUIRIES}?page=${page}&size=10`);
      if (response.ok) {
        const data = await response.json();
        setInquiries(data.inquiries);
        setTotalItemCount(data.pageInfo.totalCount);
      } else {
        throw new Error("Failed to fetch inquiries");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="adminbox">
        <div className="mgbox">
          <div className="mgtitle">
            <p>관리자</p>
          </div>
          <div className="mglist">
            <div>
              <Link to="/admin">배 검증요청</Link>
            </div>
            <div className="ch2">
              <Link to="/adminFS">낚시터 검증요청</Link>
            </div>
            <div>
              <Link to="/adminCS">문의 현황</Link>
            </div>
          </div>
        </div>
        <div className="mgcontentbox">
          <div className="ctntitle">KNOCK_SEA 관리자 화면 (문의)</div>
          <div className="ctntext">
          {inquiries.length !==0 ? (
            inquiries.map((inquiry) => (
              <div className="ctntextbox11" key={inquiry.inquiryId}>
                <div>{inquiry.userName}</div>
                <div>{inquiry.inquiryTitle}</div>
                <div>{inquiry.inquiryDetails}</div>
                <div>{inquiry.inquiryDateTime}</div>
                {inquiry.answerDetails===null &&(
                <Link
                  to={{ pathname: `/adminreply/${inquiry.inquiryId}` }}
                >
                  답변하기
                </Link>
                )}
              </div>
            ))
            ) : (
              <div>문의가 입력된 것이 없습니다.</div>
          )}
          </div>
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
    </section>
  );
};

export default MpAdminCS;