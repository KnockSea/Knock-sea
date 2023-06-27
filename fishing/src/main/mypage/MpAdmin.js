import React from 'react'
import './MpScss/MpAdmin.scss'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { getLoginUserInfo, setLoginUserInfo } from '../util/login-util'

const MpAdmin = () => {

    const [validationList, setValidationList] = useState([]);
    const [validationType , setvalidationType] = useState('SHIP');
    const [userInfo, setUserInfo] = useState({
        token: '', // Set default value for name
        userEmail: '', // Set default value for email
        userName : '',
        userGrade : '',
        userId : '',
        userPhone : ''
      });

useEffect(() => {
    const user = getLoginUserInfo();
    console.log(userInfo);
    setUserInfo(user);
},[])

//검증요청 리스트 서버에서 받아오기
useEffect(() => {
    fetch(`http://localhost:8012/api/v1/validation/${validationType}`)
    .then(response => response.json())
    .then(data => {
        // 요청 결과 처리
        console.log(data);
        setValidationList(data);
    })
    .catch(error => {
        // 에러 처리
        console.error('Error:', error);
    });
}, []);

//검증요청 승인하는 함수
const updateValidation = async (e, validationUserName, validationType,validationuserId) => {
    e.preventDefault();
    console.log(validationUserName,validationType);
    const confirm = window.confirm('정말 승인하시겠습니까?');
    console.log(validationList);
    if (confirm) {
        if (confirm) {
            const validationModifyRequestDTO = {
              'userName': validationUserName,
              'userId' : validationuserId,
              'validationType': validationType,
              'validationStatus': 'YES'
            };
          
            fetch(`http://localhost:8012/api/v1/validation/`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
              },
              body: JSON.stringify(validationModifyRequestDTO)
            })
              .then((res) => {
                if (res.status === 200) {
                  alert('전송완료');
                  fetch(`http://localhost:8012/api/v1/validation/${validationType}`)
                    .then(response => response.json())
                    .then(data => {
                        // 요청 결과 처리
                        console.log(data);
                        setValidationList(data);
                    })
                    .catch(error => {
                        // 에러 처리
                        console.error('Error:', error);
                    });
                } else {
                  alert('서버와의 통신오류');
                }
              })
              .catch((error) => {
                console.error('Error:', error);
              });
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
            <div className='ctntitle'>KNOCK_SEA 관리자 화면 (배)</div>

            {/* 본문내용 */}
            <div className='ctntext'>
        {validationList.length > 0 ? (
            validationList.map((validation) => (
            <div key={validation.validationId}>
                {validation.userId ? (
                <div className='username'>{validation.userId}</div>
                ) : (
                <div>등록유저번호</div>
                )}
                {validation.userName ? (
                <div className='username'>{validation.userName}</div>
                ) : (
                <div>등록유저이름없음</div>
                )}
                {validation.validationShipRegi ? (
                <div className='spotregi'>{validation.validationBusinessRegi}</div>
                ) : (
                <div>사업장등록  번호없음</div>
                )}
                <div>
                <button onClick={(e) => updateValidation(e, validation.userName, validation.validationType,validation.userId)}>승인</button>
                <button>취소</button>
                </div>
                <div>{validation.validationStatus}</div>
            </div>
            ))
        ) : (
            <div>데이터 없음</div>
        )}
</div>
        </div>
    </div>
</section>
  )
}

export default MpAdmin