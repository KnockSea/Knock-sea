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
import Pagination from "react-js-pagination";



function RvMain({fetchFsProduct, FsProduct}) {

  const [totalItemCount, setTotalItemCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [products, setProducts] = useState(FsProduct);
  const type = 'SHIP';

  // console.log('안녕 나는 rvmain이야 ');
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };
    
  useEffect(() => {
    // fetchFsProduct(page, size, type);
    if (FsProduct.length === 0) {
      setPage(1);
    }
    setProducts(FsProduct);    
    setTotalItemCount(products.pageInfo.totalCount);
  },[FsProduct]);
  
  console.log('얘는 존재 해?', FsProduct);

  return (
    <div>
        <div className='rvMain'>
            <div className='rvContent'>                
              <div className='cardBox'>
                <RvItem                 
                productDetail={FsProduct}
                />
              </div>
            </div>
            <div className='rvApibox'>
            <div>위치 확인하기</div>
              <div className='mapbox'>
                <RvMap
                  productDetail={FsProduct} 
                />
              </div>
            </div>
        </div>

        {/* 페이징 버튼 영역 */}
                            
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
}

export default RvMain;
