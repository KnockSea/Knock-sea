/* global kakao */
import React, { useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
const { kakao } = window;

const RvMap = ({ productDetail }) => {
  // console.log("map에서사용한다잉", productDetail)
  // console.log("map에서사용한다잉", productDetail.productDetail)
  // console.log("map에서사용한다잉", productDetail.productDetail[0].title)
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(35.41, 130.134),
      level: 13,
    };
    const map = new kakao.maps.Map(container, options);

    // 주소 검색 결과를 순회하며 좌표값을 가져와 마커를 생성합니다.
    productDetail.allAddress.forEach((address) => {
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

    const infowindow = new kakao.maps.InfoWindow({
              content: getProductTitle(address.productId),
              position: markerPosition,
            });


          kakao.maps.event.addListener(marker, "mouseover", function () {
            infowindow.open(map, marker);
          });


          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });
        }
      });
    });
  }, [productDetail]);

   // 상품 ID를 사용하여 상품 타이틀을 가져오는 함수
   const getProductTitle = (productId) => {
    const product = productDetail.productDetail.find(
      (item) => item.productId === productId
    );
    return product ? product.title : ""; // 상품이 존재하면 타이틀 반환, 그렇지 않으면 빈 문자열 반환
  };


  return (
    <div id="map" style={{ width: "800px", height: "600px" }}></div>
  );
};

export default RvMap;
