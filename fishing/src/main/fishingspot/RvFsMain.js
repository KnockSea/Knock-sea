import React from 'react'
import './RvScss/RvFsMain.scss'
import fs from '../img/fs.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bullseye,Calendar2Check,EmojiSmile,PersonVcard, CheckCircleFill } from 'react-bootstrap-icons';
import RvFsinnerHeader from './RvFsinnerHeader';
import map from '../img/map.png'
import RvFsItem from './RvFsItem';
import { Route, Routes } from 'react-router-dom';
import RvFsDetail from './RvFsDetail';
// import RvFsMap from './RvFsMap';


function RvFsMain({FsProduct}) {
  return (
    <div>

        <div className='rvMain'>

            <div className='rvContent'>
                {/* <RvFsinnerHeader />
                <div className='x1'>
                    <div>검색결과 1-30 / 총 80개</div>
                    <div>기본정렬순</div>
                </div> */}
                     <div className='cardBox'>

            <RvFsItem 
            {...FsProduct}
            />

            {/* <RvFsItem />
            <RvFsItem /> */}
       
         
        
                    </div>
            </div>



            <div className='rvApibox'>
            <div>위치 확인하기</div>
            <div className='mapbox'>

            <RvFsMap
              product={FsProduct}
            />

            </div>
            </div>
        </div>

    </div>

  )
}

export default RvFsMain