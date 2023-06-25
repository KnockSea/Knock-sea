import React, { useState, useEffect } from 'react';
import './RvScss/RvFsItem.scss'
import fs from '../img/fs.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bullseye,Calendar2Check,EmojiSmile,PersonVcard, CheckCircleFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import RvFsDetail from './RvFsDetail';
import { API_BASE_URL, PRODUCTS } from '../../config/host-config';


const RvFsItem = ({ allAddress, pageInfo, product, count }) => {

  const [Address, setAddress] = useState(allAddress);
  const [pgInfo, setpgInfo] = useState(pageInfo);
  const [pdt, setpdt] = useState(product);
  // const [count, setcount] = useState(count);
  const [Fsimg, setFsimg] = useState();
  const [page, setPage] = useState("");
  const [size, setSize] = useState("");
  // const [type, setType] = useState("");
  const type = 'SPOT';
  
  // GET 방식 보낼때 page값 넘겨야 함
  fetch(`${API_BASE_URL}${PRODUCTS}/product-list?page=${page}&size=${size}&type=${type}`)
  .then(response => response.json())
    .then(Fsimg => {
      setFsimg(Fsimg);
      // console.log(shipimg);
    });
  useEffect(() => {
  }, []);


  const dt = product.productId;
  return (
    <div className='Fssection'>
    {product.map((product, index) => (
    <div  key={index}  className='contentCard'>
      <Link to={`/fsdetail${product.productId}`}>

    <div className='imgbox'>
        <img src={fs} />
    
    </div>
    <div className='cardTitle'>
    <CheckCircleFill />
    {product.title}&nbsp;&nbsp;
    </div>
    <div className='miniTitle'>집결장소  
     {allAddress[index].productLocationInfo}
    </div>
    <div className='miniContent'>
    <Bullseye />차고지 : 
    {allAddress[index].productLocationInfo} 
    <PersonVcard/>
    신분증 지참 &nbsp;
    <EmojiSmile />
     총 6명
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