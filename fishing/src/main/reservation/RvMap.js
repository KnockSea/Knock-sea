/* global kakao */
import React, { useEffect } from "react";
import { Map , MapMarker} from "react-kakao-maps-sdk";
const { kakao } = window;

const RvMap = () => {
//   useEffect(() => {
//     let container = document.getElementById("map");

//     let options = {
//       center: new window.kakao.maps.LatLng(35.85133, 127.734086),
//       level: 13,
//     };

//     let map = new window.kakao.maps.Map(container, options);

//     console.log("loading kakaomap");
//   }, []);

  return (
    <Map 
    center={{ lat: 33.5563, lng: 126.79581 }}   // 지도의 중심 좌표
    style={{ width: '800px', height: '600px' }} // 지도 크기
    level={3}                                   // 지도 확대 레벨
  >


    
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}> 안녕</MapMarker> // 마커 좌표
  </Map>);
};

export default RvMap;