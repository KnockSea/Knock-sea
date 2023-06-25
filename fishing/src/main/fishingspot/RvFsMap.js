/* global kakao */
import React, { useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
const { kakao } = window;

const RvFsMap = ({ product }) => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(35.85133, 127.734086),
      level: 13,
    };
    const map = new kakao.maps.Map(container, options);

    // 주소 검색 결과를 순회하며 좌표값을 가져와 마커를 생성합니다.
    product.allAddress.forEach((address) => {
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address.productLocationInfo, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const markerPosition = new kakao.maps.LatLng(
            result[0].y,
            result[0].x
          );
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
        }
      });
    });
  }, [product]);

  return (
    <div id="map" style={{ width: "800px", height: "600px" }}></div>
  );
};

export default RvFsMap;
