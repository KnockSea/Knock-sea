import React ,{ useEffect, useState} from 'react'
import { NsHeader } from '../NsHeader'
import RvFsMain from './RvFsMain'
import { API_BASE_URL, PRODUCTS } from '../../config/host-config';
import Pagination from "react-js-pagination";

function RvFsTemplate() {
  const [Fsproduct , setFsproduct] = useState(null);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [type, setType] = useState('SPOT');
  const [totalItemCount, setTotalItemCount] = useState(0);
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };

  // 낚시터 상품 정보 전체를 가져오는 함수
  const fetchFsProduct = async ({p,s,t}) => {
   

    console.log(Fsproduct);


    fetch(`${API_BASE_URL}${PRODUCTS}/product-list?page=${p}&size=${s}&type=${t}`)
        .then(response => response.json())
        .then(res => {
          setFsproduct(res);
          
    });           
  };  

  useEffect(() => {
    fetchFsProduct({ p: page, s: size, t: type });
  },[]);

  return (
    Fsproduct &&
    
    <div>
        <NsHeader />
        <RvFsMain 
        // fetchFsProduct={fetchFsProduct}
        FsProduct={Fsproduct}
        />
    </div>


  )
}

export default RvFsTemplate