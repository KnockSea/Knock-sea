import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import { API_BASE_URL, VALIDATION } from '../../config/host-config';
import Pagination from "react-js-pagination";

const MpAdmin = () => {

    const [totalItemCount, setTotalItemCount] = useState(0);
    const [validationList, setValidationList] = useState([]);
    const [validationType, setValidationType] = useState('SHIP');
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(6);
    const handlePageChange = (page) => {
        setPage(page);
        // console.log(page);
      };
    // API 요청
    useEffect(() => {
        fetch(`${API_BASE_URL}${VALIDATION}/validationlist?page=${page}&size=${size}&type=${validationType}`)
        .then(response => response.json())
        .then(data => {
            // 요청 결과 처리
            console.log(data);
            setValidationList(data);

            setTotalItemCount(validationList.pageInfo.totalCount);
            // console.log('validationList : ',validationList);
        })
        .catch(error => {
            // 에러 처리
            // console.error('Error:', error);
        });
    }, []);
    //검증요청 승인하는 함수
    const updateValidation = async (e, validationUserName, validationType,validationuserId) => {
        e.preventDefault();
        console.log(validationUserName,validationType);
        const confirm = window.confirm('정말 승인하시겠습니까?');
        console.log(validationList);
        if (confirm) {
            // console.log(validationUserName);
            // console.log(validationType);
            const validationModifyRequestDTO = {
                'userName' : validationUserName,
                'userId' : validationuserId,
                'validationType' : validationType,
                'validationStatus' : 'YES'
            };
            
            const res = await fetch(`${API_BASE_URL}${VALIDATION}`, {
                method: 'PUT', // 또는 'PATCH' 요청 메서드
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(validationModifyRequestDTO)
            });
            if (res.status === 200) {
                alert('전송완료');
                // 승인 요청 후 다시 리스트 가져오기
                fetch(`${API_BASE_URL}${VALIDATION}/${validationType}`)
                    .then(response => response.json())
                    .then(data => {
                        // 요청 결과 처리
                        console.log(data);
                        setValidationList(data);
                        console.log('validationList : ',validationList);
                    })
                    .catch(error => {
                        // 에러 처리
                        console.error('Error:', error);
                    });
              } else {
                alert('서버와의 통신오류');
              }
            }
      };

  return (
    <section>
    <div className='adminbox'>

        {/* 관리자목록박스  */}
        <div className='mgbox'>
            <div className='mgtitle'>
                <p>관리자</p>
            </div>
            <div className='mglist'>
                <div><Link to='/admin' className='mgcontent'>배 검증요청</Link></div>
                <div className='ch2'><Link to='/adminFS'  className='mgcontent'>낚시터 검증요청</Link></div>
                <div><Link to='/adminCS' className='mgcontent'>문의 현황</Link></div>
            </div>
        </div>
            <div className='mgcontentbox'>
                <div className='ctntitle'>KNOCK_SEA 관리자 화면 (낚시터)</div>

                {/* 본문내용 */}
                {validationList.length > 0 ? (
                    validationList.map((validation) => (
                    <div key={validation.validationId}>
                        {validation.userId ? (
                            <div className='username'>{validation.userId}</div>
                            ) : (
                            <div>등록유저번호없음</div>
                        )}
                        {validation.userName ? (
                            <div className='username'>{validation.userName}</div>
                            ) : (
                            <div>등록유저이름없음</div>
                        )}
                        {validation.validationBusinessRegi? (
                            <div className='username'>{validation.validationBusinessRegi}</div>
                            ) : (
                            <div>낚시터사업자번호등록안됌</div>
                        )}
                        <div>
                            <button onClick={(e) => updateValidation(e, validation.userName, validation.validationType,validation.userId)}>승인</button>
                            <button>취소</button>
                        </div>
                        <div>{validation.validationStatus}</div>
                    </div>
                    ))
                ) : (<div>데이터 없음</div>)}
                 <div className="page">
                <Pagination
                activePage={page}
                itemsCountPerPage={size}
                totalItemsCount={totalItemCount}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange}
                />     
            </div>      
            </div>
    </div>
    </section>
  )
}

export default MpAdmin