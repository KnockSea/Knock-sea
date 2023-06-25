import React, { useState ,useEffect } from 'react'
import './RvScss/RvMain.scss'
import boat from '../img/boat.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bullseye,Calendar2Check,EmojiSmile,PersonVcard, CheckCircleFill } from 'react-bootstrap-icons';
import RvinnerHeader from './RvinnerHeader';
import map from '../img/map.png'
import RvItem from './RvItem';
import { Link, Route, Routes } from 'react-router-dom';
import RvBtDetail from './RvBtDetail';
import RvMap from './RvMap';


function RvMain({fetchFsProduct, FsProduct}) {


  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [products, setProducts] = useState(FsProduct);
  const type = 'SHIP';

  
  
  useEffect(() => {
    fetchFsProduct(page, size, type);
    
    console.log(products);
  },[fetchFsProduct, page, size, type]);
  

  return (
    <div>
        <div className='rvMain'>
            <div className='rvContent'>                
              <div className='cardBox'>
                <RvItem                 
                product={FsProduct}
                />
              </div>
            </div>
            <div className='rvApibox'>
            <div>위치 확인하기</div>
              <div className='mapbox'>
                <RvMap
                  product={FsProduct} 
                />
              </div>
            </div>
        </div>
        {/* 페이징 버튼 영역 */}
    </div>
  )
}

export default RvMain