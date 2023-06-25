import React ,{ useEffect, useState} from 'react'
import { NsHeader } from '../NsHeader'
import RvFsMain from './RvFsMain'
import { API_BASE_URL, PRODUCTS } from '../../config/host-config';








function RvFsTemplate() {

  const [Fsproduct , setFsproduct] = useState("");
  
  
  useEffect(() => {
  // 낚시터 상품 정보 전체를 가져오는 함수
  const fetchFsProduct = async () => {
    try {
      const reponse = await fetch(`${API_BASE_URL}${PRODUCTS}/product-list`)
      const data = await reponse.json();
      setFsproduct(data);

    }catch (error) {
      console.error('Error fetching Fsproduct info:', error);
    }
  };

  fetchFsProduct();

}, []);


  return (

    <div>
        <NsHeader />
        <RvFsMain 
        Fsproduct={Fsproduct}/>
    </div>

  )
}

export default RvFsTemplate