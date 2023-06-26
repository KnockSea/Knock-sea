import React from 'react'
import './MpScss/MpAdmin.scss'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'


const MpAdmin = () => {

    const [validationList, setValidationList] = useState([]);
    const [validationType , setvalidationType] = useState('SHIP');

    //배 검증요청 리스트수정 json형식
    const [validationData, setValidationData] = useState({
        userName: '',
        validationType: '',
        validationStatus: ''
      });

//검증요청 리스트 서버에서 받아오기
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
}, [validationList]);

//검증요청 승인하는 함수
const updateValidation = (e) =>{
e.preventDefault();
// alert('승인요청 들어옴');
const confirm = window.confirm('정말 승인하시겠습니까?')
if(confirm){
    
    // alert('승인완료!');
}
}

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
                {validationList.length > 0 ? (validationList.map(validation => (<div key={validation.validationId}>
                {validation.userName ? (<div className='username'>{validation.userName}</div>) : (<div>등록유저이름없음</div>)}
                {validation.validationShipRegi ? (<div className='shipregiimg'>{validation.validationShipRegi}</div>) : (<div>선박등록이미지 없음</div>)}
                {validation.validationShipLicense ? (<div className='shipregistnum'>{validation.validationShipLicense}</div>) : (<div>선박면허증 없음</div>)}
                <div>
                    <button onClick={updateValidation}>승인</button>
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

export default MpAdmin