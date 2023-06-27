import React, { useEffect, useState } from 'react'
import { NsHeader } from '../NsHeader'
import RvMain from './RvMain'
import { API_BASE_URL, PRODUCTS } from '../../config/host-config';

function RvTemplate() {
  const [Fsproduct , setFsproduct] = useState(null);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);  
  const [type, setType] = useState("SHIP");

  console.log('안녕 나는 rvtemplate이야', Fsproduct);

  // 배 상품 정보를 전체 가져오는 함수
  const fetchFsProduct = async ({p,s,t}) => {
    console.log('안녕 나는 rvtemplate fetch야');
    
    fetch(`${API_BASE_URL}${PRODUCTS}/product-list?page=${p}&size=${s}&type=${t}`)
        .then(response => response.json())
        .then(res => {
          setFsproduct(res);            
    });   
  };

  useEffect(() => {
    fetchFsProduct({ p: page, s: size, t: type });
  }, []);

  return (
    Fsproduct &&
    <div>
        <NsHeader />
        <RvMain
        // fetchFsProduct={fetchFsProduct}
        FsProduct={Fsproduct}
        />
    </div>

  )
}

export default RvTemplate