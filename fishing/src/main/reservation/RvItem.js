import React, { useState, useEffect } from 'react';
import './RvScss/RvItem.scss';
import boat from '../img/boat.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bullseye, Calendar2Check, EmojiSmile, PersonVcard, CheckCircleFill } from 'react-bootstrap-icons';
import { Link, Route } from 'react-router-dom';
import RvBtDetail from './RvBtDetail';

import { API_BASE_URL, PRODUCTS, SHIP } from '../../config/host-config';


const RvItem = ({ allAddress, pageInfo, products, count }) => {
  const [Address, setAddress] = useState(allAddress);
  const [pgInfo, setpgInfo] = useState(pageInfo);
  const [pdt, setpdt] = useState(products);
  const [ct, setct] = useState(count);
  const [shipimg, setshipimg] = useState("");

  useEffect(() => {
    // fetch(`${API_BASE_URL}${PRODUCTS}/product-list`)
    //   .then(response => response.text())
    //   .then(shipimg => {
    //     // setshipimg(shipimg);
    //     // console.log(shipimg);
    //   });

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
              <img src={product.mainImgUrl} alt="Ship" />
            </div>
            
            <div className='cardTitle'>
              <CheckCircleFill />
              {product.title}
            </div>
            <br />
            <div className='miniTitle'>

              주소 : 
              {/* {allAddress[index].productLocationInfo} */}
              {product.locationInfo}

            </div>
            <br />
            <div className='miniContent'>

              <Bullseye />상세 위치 : 
              {/* {allAddress[index].productLocationInfo}  */}
              {product.fullAddress}

              &nbsp;
              {/* <PersonVcard/> 신분증 지참 &nbsp; */}
              <EmojiSmile /> 최대 {product.maxUser}명
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
