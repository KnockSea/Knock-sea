import React, { useEffect, useState } from "react";
import { NsHeader } from "../NsHeader";
import RvFsMain from "./RvFsMain";
import { API_BASE_URL, PRODUCTS } from "../../config/host-config";

function RvFsTemplate() {
  const [Fsproduct, setFsproduct] = useState();
  const [Allproduct, setAllproduct] = useState();
  const [page, setPage] = useState();
  const [size, setSize] = useState();
  const [type, setType] = useState("SPOT");
  // 낚시터 상품 정보 전체를 가져오는 함수
  const fetchFsProduct = async ({ p, s, t }) => {
    try {
      fetch(
        `${API_BASE_URL}${PRODUCTS}/product-list?page=${p}&size=${s}&type=${t}`
      )
        .then((response) => response.json())
        .then((res) => {
          setFsproduct(res);
        });
    } catch (error) {
      console.error("Error fetching Fsproduct info:", error);
    }
  };

  useEffect(() => {
    // fetch(`${API_BASE_URL}${PRODUCTS}/product-list?page=${p}&size=${s}&type=${t}`)
    // .then(response => response.json())
    // .then(res => {
    //   setFsproduct(res);
    //   setPage(page);
    //   setSize(size);
    //   setType("SPOT");
    // });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}${PRODUCTS}/product-list`)
      .then((response) => response.json())
      .then((all) => {
        setAllproduct(all);
      });
    console.log("Fsproduct:", Allproduct);
  }, []);

  return (
    Fsproduct && (
      <div>
        <NsHeader />
        <RvFsMain fetchFsProduct={fetchFsProduct} FsProduct={Fsproduct} />
      </div>
    )
  );
}

export default RvFsTemplate;
