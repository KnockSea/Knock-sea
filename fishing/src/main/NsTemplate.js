import React, { useEffect, useState } from 'react';
import './scss/NsTemplate.scss';
import { NsHeader } from './NsHeader';
import NsMain from './NsMain';
import NsFootter from './NsFootter';
import { useLocation, useNavigate } from 'react-router-dom';

import { API_BASE_URL as BASE, SHIP, FISHINGSPOT, USER } from '../config/host-config';
import { getLoginUserInfo, setLoginUserInfo} from '../Util/login-util';




const NsTemplate = () => {

  // const redirection = useNavigate();

  // //로딩 상태값
  // // 로그인 인증토큰 얻어오기
  // const [token, setToken] = useState(getLoginUserInfo().token);
  // const [loading, setloading] = useState(true);


  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);

  // 요청 헤더 설정 
  // const requestHeader = {
  //   'content-type': 'application/json' ,
  // };

  // 서버에서 목록(json) 요청해서 받기
// const API_SHIP_URL = BASE + SHIP;                     //배
// const API_USER_URL = BASE + USER;                     //유저
// const API_FISHINGSPOT_URL = BASE + FISHINGSPOT;       // 낚시터

// SHIP 배열을 상태관리
// const [ships , setships] = useState([]);


// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch(API_SHIP_URL + '/getshipinfo', {
//         headers: requestHeader,
//       });
//       const data = await response.json();
//       console.log(data); // 응답 데이터 출력

//       // 받아온 데이터를 상태에 저장하거나 다른 작업 수행

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   fetchData();
// }, []);








  useEffect(() => {
    // 링크 변경 시 footer 숨김 처리
    setShowFooter(location.pathname === '/');
  }, [location]);

  return (
    <div>
        <NsHeader
        
        />

        <NsMain />
        {/* <NsItem /> */}

      {showFooter && (
          <NsFootter />
      )}
    </div>
  );
};

export default NsTemplate;