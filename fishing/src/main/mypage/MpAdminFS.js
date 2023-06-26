import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';

const MpAdminFS = () => {


    const [validationList, setValidationList] = useState([]);
    const [validationType , setvalidationTtpe] = useState('SPOT');

    // API 요청
useEffect(() => {
    fetch(`http://localhost:8012/api/v1/validation/${validationType}`)
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
}, []);
    //검증요청 승인하는 함수
    const updateValidation = async (e, validationUserName, validationType) => {
        e.preventDefault();
        const confirm = window.confirm('정말 승인하시겠습니까?');
        console.log(validationList);
        if (confirm) {
            // console.log(validationUserName);
            // console.log(validationType);
            const validationModifyRequestDTO = {
                'userName' : validationUserName,
                'validationType' : validationType,
                'validationStatus' : 'YES'
            };
            
            const res = fetch('http://localhost:8012/api/v1/validation', {
                method: 'PUT', // 또는 'PATCH' 요청 메서드
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(validationModifyRequestDTO)
            });
            if((await res).status===200){
                console.log(res);
                alert('전송완료')
                setValidationList();
            }else{
                alert('서버와의 통신오류')
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
            <div><Link to='/admin'>배 검증요청</Link></div>
            <div className='ch2'><Link to='/adminFS'>낚시터 검증요청</Link></div>
            <div><Link to='/adminCS'>문의 현황</Link></div>
        </div>
    </div>
        <div className='mgcontentbox'>
            <div className='ctntitle'>KNOCK_SEA 관리자 화면 (낚시터)</div>

            {/* 본문내용 */}
            <div className='ctntext'>
                {validationList.length > 0 ? (validationList.map(validation => (<div key={validation.validationId}>
                {validation.userName ? (<div className='username'>{validation.userName}</div>) : (<div>등록유저이름없음</div>)}
                {validation.validationBusinessRegi ? (<div>{validation.validationBusinessRegi}</div>) : (<div>사업자등록증 없음</div>)}
                <div>
                    <button onClick={(e) => updateValidation(e, validation.userName, validation.validationType)}>승인</button>
                    <button>취소</button>
                </div>
                <div>{validation.validationStatus}</div>
                </div>))) : (<div>데이터 없음</div>)}
            </div>
        </div>
    </div>
</section>
  )
}

export default MpAdminFS