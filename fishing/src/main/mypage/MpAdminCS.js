import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MpScss/MpAdminCS.scss';
import MpInquiryD from './MpInquiryD';

const MpAdminCS = () => {
  const [inquiries, setInquiries] = useState([]);
  const [inquiry, setInquiry] = useState([inquiry]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch('http://localhost:8012/api/v1/inquiries');
      if (response.ok) {
        const data = await response.json();
        setInquiries(data.inquiries);
      } else {
        throw new Error('Failed to fetch inquiries');
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
        <div className='mglist'>
            <div><Link to='/admin'>배 검증요청</Link></div>
            <div className='ch2'><Link to='/adminFS'>낚시터 검증요청</Link></div>
            <div><Link to='/adminCS'>문의 현황</Link></div>
        </div>
    </div>
        <div className='mgcontentbox'>
            <div className='ctntitle'>KNOCK_SEA 관리자 화면 (문의)</div>

            {/* 본문내용 */}
            <div className='ctntext'>
            <div className='ctntextbox11'>
                <div>asda@aaa.com</div>
                <div>환불언제되나요?</div>
                <div>답변대기</div>
                <div>2023-06-21</div>
                <button className='adminCSbtn'>답변하기</button>
                </div>

            </div>
            <div>
              <Link to="/adminCS">문의 현황</Link>
            </div>
          </div>
        </div>
        <div className="mgcontentbox">
          <div className="ctntitle">KNOCK_SEA 관리자 화면 (문의)</div>
          <div className="ctntext">
            {inquiries.map((inquiry) => (
              <div className="ctntextbox11" key={inquiry.inquiryId}>
                <div>{inquiry.userName}</div>
                <div>{inquiry.inquiryTitle}</div>
                <div>{inquiry.inquiryDetails}</div>
                <div>{inquiry.inquiryDateTime}</div>
                <button>
                  <Link
                    to={{
                      pathname: `/adminreply/${inquiry.inquiryId}`,
                      state: { inquiry },
                    }}
                  >
                    답변하기
                  </Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MpAdminCS;