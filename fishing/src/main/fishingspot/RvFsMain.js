import React, { useState, useEffect } from "react";
import "./RvScss/RvFsMain.scss";
import fs from "../img/fs.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Bullseye,
  Calendar2Check,
  EmojiSmile,
  PersonVcard,
  CheckCircleFill,
} from "react-bootstrap-icons";
import RvFsinnerHeader from "./RvFsinnerHeader";
import map from "../img/map.png";
import RvFsItem from "./RvFsItem";
import { Route, Routes } from "react-router-dom";
import RvFsDetail from "./RvFsDetail";
import RvFsMap from "./RvFsMap";
import Pagination from "react-js-pagination";

function RvFsMain({ fetchFsProduct, FsProduct }) {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [products, setProducts] = useState(FsProduct);
  const type = "SPOT";

  const handlePageChange = (page) => {
    setPage(page);
    // console.log(page);
  };

  // fetchFsProduct(page, size, type);
  // console.log("producct", products);
  // console.log("totalItemCount", products.pageInfo.totalCount);

  useEffect(() => {
    setProducts(FsProduct);
  }, [FsProduct]);

  return (
    <div>
      <div className="rvMain">
        <div className="rvContent1">
          <div className="cardBox1">
            <RvFsItem productDetail={FsProduct} />
          </div>
        </div>
        <div className="rvApibox1">
          <div>위치 확인하기</div>
          <div className="mapbox1">
            <RvFsMap productDetail={FsProduct} />
          </div>
        </div>
      </div>
      {/* 페이징 버튼 영역 */}
      
    </div>
  );
}

export default RvFsMain;
