import React, { useEffect, useState } from 'react'
import { NsHeader } from '../NsHeader'
import RvMain from './RvMain'
import { API_BASE_URL, PRODUCTS, SHIP } from '../../config/host-config';

function RvTemplate() {

  const [Fsproduct , setFsproduct] = useState();
  const [Allproduct , setAllproduct] = useState();

  const [page, setPage] = useState();
  const [size, setSize] = useState();
  const [type, setType] = useState("SHIP");


  // 배 상품 정보를 전체 가져오는 함수
  // const fetchFsProduct = async ({p,s,t}) => {
  //   try {

  //     fetch(`${API_BASE_URL}${PRODUCTS}/product-list?page=${p}&size=${s}&type=${t}`)
  //       .then(response => response.json())
  //       .then(res => {
  //         setFsproduct(res);
  //     });
  //   }catch (error) {
  //     console.error('Error fetching Fsproduct info:', error);
  //   }
  // };


  useEffect(() => {
    fetch(`${API_BASE_URL}${PRODUCTS}/product-list`)
    .then( response => response.json())
    .then(all => {
      setAllproduct(all);
    });
        console.log('Fsproduct:', Allproduct);

  },[]);



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