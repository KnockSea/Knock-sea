import React, { useEffect, useState } from 'react'
import { NsHeader } from '../NsHeader'
import RvMain from './RvMain'

import { API_BASE_URL, PRODUCTS } from '../../config/host-config';

function RvTemplate() {

  const [product, setproduct] = useState();


  // 배 상품 정보를 전체 가져오는 함수
  const fetchProduct = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${PRODUCTS}/product-list`);
      const data = await response.json();
      setproduct(data);
      console.log('와!',data);
      console.log('NsMian setproduct', product); // null 
    } catch (error) {
      console.error('Error fetching product info:', error);
    }
  };


  useEffect(() => {
    fetchProduct();
  }, []);

  return (

    product &&
    <div>
        <NsHeader />
        <RvMain
        product={product}

        />
    </div>

  )
}

export default RvTemplate