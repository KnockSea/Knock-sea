import React, { useState, useEffect } from 'react';
import './RvScss/RvItem.scss';
import boat from '../img/boat.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bullseye, Calendar2Check, EmojiSmile, PersonVcard, CheckCircleFill } from 'react-bootstrap-icons';
import { Link, Route } from 'react-router-dom';
import RvBtDetail from './RvBtDetail';

import { API_BASE_URL, PRODUCTS, SHIP } from '../../config/host-config';
import { useState } from 'react';
import { useEffect } from 'react';
import { API_BASE_URL, SHIP } from '../../config/host-config';


const RvItem = ( {shipInfo}) => {
    
//     // 배 이미지 가져오가
//     const [shipimg , setshipimg] = useState("");

//     useEffect(()=> {
//       fetch(`${API_BASE_URL}${SHIP}/getshipinfo`)
//       .then(reponse => reponse.text())
//       .then(shipimg => {
//         setshipimg(shipimg);
//       });
//     },[]);
//     // 이미지 가져오기 끝 

const RvItem = ({ allAddress, pageInfo, products, count }) => {
  const [Address, setAddress] = useState(allAddress);
  const [pgInfo, setpgInfo] = useState(pageInfo);
  const [pdt, setpdt] = useState(products);
  const [ct, setct] = useState(count);
  const [shipimg, setshipimg] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}${PRODUCTS}/product-list`)
      .then(response => response.text())
      .then(shipimg => {
        // setshipimg(shipimg);
        // console.log(shipimg);
      });
  }, []);
  const dt = products.productId;
  return (
    <div className='shipsection'>
      {products.map((product, index) => (
        <div key={index} className='contentCard'>
   {/* <Link to={{ pathname: '/detail', state: { pdtId: product.productId } }}> */}
  
   <Link to={`/detail/${product.productId}`}>
            상세 보기
            <div className='imgbox'>
              <img src={shipimg} alt="Ship" />
            </div>
            <div className='cardTitle'>
              <CheckCircleFill />
              {product.title}
            </div>
            <div className='miniTitle'>
              집결장소 
              {allAddress[index].productLocationInfo}
            </div>
            <div className='miniContent'>
              <Bullseye />차고지 : 
              {allAddress[index].productLocationInfo} 
              &nbsp;
              <PersonVcard/> 신분증 지참 &nbsp;
              <EmojiSmile /> 총 6명
            </div>
            <div className='calendar'>
              <Calendar2Check style={{color:'#3974D9', float:'left',marginTop:'5'}}/>
              {product.price}
            </div>
          </Link>
        </div>
      ))}

    </div>
  );
};

export default RvItem;
