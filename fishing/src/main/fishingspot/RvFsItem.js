import React, { useState, useEffect } from 'react';
import './RvScss/RvFsItem.scss'
import fs from '../img/fs.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bullseye,Calendar2Check,EmojiSmile,PersonVcard, CheckCircleFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import RvFsDetail from './RvFsDetail';
import { API_BASE_URL, PRODUCTS } from '../../config/host-config';


const RvFsItem = ({productDetail}) => {

  
  const [pro, setPro] = useState(productDetail);
  
  return (
    <div className='Fssection'>
    {!pro && pro.map((product, index) => (
    <div  key={index}  className='contentCard'>
      <Link to={`/fsdetail${product.productId}`}>

    <div className='imgbox'>
        <img src={product.mainImgUrl} alt="Spot"/>
    
    </div>
      <div className='cardTitle'>
      <CheckCircleFill />
      {product.title}
      </div>
      <br />
      <div className='miniTitle'>주소 :  
      {/* {allAddress[index].productLocationInfo} */}
      {product.locationInfo}
      </div>
      <div className='miniContent'>
      <Bullseye />상세 위치 :
      {product.fullAddress}
      {/* <PersonVcard/> */}
      {/* 신분증 지참 &nbsp; */}
      <EmojiSmile /> 최대 {product.maxUser}명
      </div>
      <div className='calendar'>
      <Calendar2Check style={{color:'#3974D9'}}/>  
      {product.price}
      </div>
      </Link>
</div>
   ))}
 </div>
  )
}

export default RvFsItem