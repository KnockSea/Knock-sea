import React, { useEffect, useState } from "react";
import { NsHeader } from "../NsHeader";
import RvMain from "./RvMain";
import { API_BASE_URL, PRODUCTS } from "../../config/host-config";
import Pagination from "react-js-pagination";

function RvTemplate() {
  const [Fsproduct, setFsproduct] = useState(null);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const handlePageChange = (page) => {
    setPage(page);
    // console.log(page);
  };

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [type, setType] = useState("SHIP");

  // console.log("안녕 나는 rvtemplate이야", Fsproduct);

  // 배 상품 정보를 전체 가져오는 함수
  const fetchFsProduct = async ({ p, s, t }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}${PRODUCTS}/product-list?page=${p}&size=${s}&type=${t}`
      );
      const res = await response.json();
      setFsproduct(res);
      setTotalItemCount(res.pageInfo.totalCount);
    } catch (error) {
      console.error('Error fetching FS product:', error);
    }
  };

  useEffect(() => {
    fetchFsProduct({ p: page, s: size, t: type });
  }, [page]);
  // console.log('지도 지도 ', Fsproduct);

  return (
    Fsproduct && (
      <div>
        <NsHeader />
        <RvMain
          // fetchFsProduct={fetchFsProduct}
          FsProduct={Fsproduct}
        />
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
      
    )
  );
}

export default RvTemplate;
