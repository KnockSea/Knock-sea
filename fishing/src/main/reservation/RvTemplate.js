import React, { useEffect, useState } from 'react'
import { NsHeader } from '../NsHeader'
import RvMain from './RvMain'
import { API_BASE_URL, PRODUCTS, SHIP } from '../../config/host-config';
import { fetchShipInfo } from '../NsMain';

function RvTemplate() {

  const [shipInfo, setShipInfo] = useState(null);

  const [product, setproduct] = useState(null);



  useEffect(() => {
    // 배 정보를 가져오는 함수
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${PRODUCTS}/`);
        const data = await response.json();
        setShipInfo(data);
      } catch (error) {
        console.error('Error fetching ship info:', error);
      }
    };

    // fetchShipInfo();
  }, []);



  return (

    <div>
        <NsHeader />
        <RvMain
        shipInfo={shipInfo}
        />
    </div>

  )
}

export default RvTemplate