import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import { API_BASE_URL, VALIDATION } from '../../config/host-config';
import Pagination from "react-js-pagination";

const MpAdminFS = () => {

    const [totalItemCount, setTotalItemCount] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [validationList, setValidationList] = useState([]);
    const [validationType, setValidationType] = useState('SPOT');
    const [isApprovalComplete, setIsApprovalComplete] = useState(false);


    const handlePageChange = (page) => {
        setPage(page);
        // console.log(page);
      };

      console.log('data',validationList);
    // API 요청
    useEffect(() => {
        fetch(`${API_BASE_URL}${VALIDATION}/validationlist?page=${page}&size=${size}&type=${validationType}`)
        .then(response => response.json())
        .then(data => {
            const { validationListResponseDTO } = data;

            setValidationList(validationListResponseDTO);

            // Update the totalItemCount state variable if necessary
            setTotalItemCount(data.pageInfo.totalCount);
        })
        .catch(error => {
            // 에러 처리
            console.error('Error:', error);
        });
    }, [isApprovalComplete]);

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
                setIsApprovalComplete(true);
                // 승인 요청 후 다시 리스트 가져오기
                // fetch(`${API_BASE_URL}${VALIDATION}${validationType}`)
                //     .then(response => response.json())
                //     .then(data => {
                //         // 요청 결과 처리
                //         console.log(data);
                //         setValidationList(data);
                //         console.log('validationList : ',validationList);
                //     })
                //     .catch(error => {
                //         // 에러 처리
                //         console.error('Error:', error);
                //     });
              } else {
                
                alert('서버와의 통신오류', res.status);
              }
            }
      };

      //삭제하기
      const deleteValidation = async (e, validationId) => {
        e.preventDefault();
        console.log(validationId);
        const confirm = window.confirm('정말 삭제하시겠습니까?');
    if(confirm){
        try {
          const response = await fetch(`${API_BASE_URL}${VALIDATION}/${validationId}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            alert('검증요청 삭제 완료');
            setIsApprovalComplete(true);
            // 성공적으로 삭제되었을 때 수행할 작업 추가
          } else {
            alert('검증요청 삭제 실패');
            // 삭제 실패 시 수행할 작업 추가
          }
        } catch (error) {
            alert('검증요청 삭제 오류발생',error);
        }
    }else{
        return ;
    }
      };
    
  return (
    <section>
    <div className='MpAdminbox'>

        {/* 관리자목록박스  */}
        <div className='mgbox'>
            <div className='mgtitle'>
                <p>[관리자]</p>
            </div>
            <div className='mglist'>
                <div><Link to='/admin' className='mgcontent'>배 검증요청</Link></div>
                <div><Link to='/adminFS' className='mgcontent'>낚시터 검증요청</Link></div>
                <div><Link to='/adminCS' className='mgcontent'>문의 현황</Link></div>
            </div>
        </div>
            <div className='mgcontentbox'>
                <div className='ctntitle'>KNOCK_SEA 관리자 화면 (낚시터)</div>
                <div className='ctncontent-wrap'>
                {/* 본문내용 */}
                {validationList.length > 0 ? (
                validationList.map((validation, index) => (
                <>
                    <div key={index}>
                    {validation.validationId}
                    {validation.userName}
                    {validation.validationType}
                    {validation.validationBusinessRegi}
                    {validation.validationStatus}
                    </div>
                     <div>
                     <button onClick={(e) => updateValidation(e, validation.userName, validation.validationType,validation.userId)}>승인</button>
                     <button onClick={(e)=> deleteValidation(e,validation.validationId)}>취소</button>
                 </div>
                 </>
                ))
                ) : (
                <div>데이터 없음</div>
                )}

  {/*                    validationList.map((validation) => (
                    <div key={validation.validationId} className='ctncontent'>
                        {validation.userId ? (
                            <div className='username'>▪{validation.userId}번</div>
                            ) : (
                            <div>❗ 등록유저번호 없음 ❗</div>
                        )}
                        {validation.userName ? (
                            <div className='username name'> {validation.userName}</div>
                            ) : (
                            <div>❗ 등록유저이름 없음 ❗</div>
                        )}
                        {validation.validationBusnessRegi? (
                            <div className='username'>{validation.validationBusinessRegi}</div>
                            ) : (
                            <div>❗ 낚시터사업자번호 등록안됨 ❗</div>
                        )}
                        <div>
                            <button className='admin-confirm' onClick={(e) => updateValidation(e, validation.userName, validation.validationType,validation.userId)}>승인</button>
                            <button className='admin-confirm' onClick={(e)=> deleteValidation(e,validation.validationId)}>취소</button>
                        </div>
                        <div>{validation.validationStatus}</div>
                    </div>
                    ))
                ) : (<div className='ctncontent'>❎ 현재 요청데이터 없음</div>)}*/}
                </div> 

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

export default MpAdminFS