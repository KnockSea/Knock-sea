import React, { useState, useEffect } from 'react';
import './RvScss/RvFsItem.scss'
import fs from '../img/fs.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bullseye,Calendar2Check,EmojiSmile,PersonVcard, CheckCircleFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import RvFsDetail from './RvFsDetail';
import { API_BASE_URL, PRODUCTS } from '../../config/host-config';


const RvFsItem = ({ allAddress, pageInfo, products }) => {

  const [Address, setAddress] = useState(allAddress);
  const [pgInfo, setpgInfo] = useState(pageInfo);
  const [pdt, setpdt] = useState(products);
  // const [count, setcount] = useState(count);
  const [Fsimg, setFsimg] = useState("");

  
  useEffect(() => {
    fetch(`${API_BASE_URL}${PRODUCTS}/product-list`)
      .then(response => response.text())
      .then(Fsimg => {
        setFsimg(Fsimg);
        // console.log(shipimg);
      });
  }, []);


  const dt = products.productId;
  return (
    <div className='Fssection'>
    {products.map((product, index) => (
    <div  key={index}  className='contentCard'>
      <Link to={`/fsdetail${products.productId}`}>

    <div className='imgbox'>
        <img src={fs} />
    
    </div>
    <div className='cardTitle'>
    <CheckCircleFill />
    {products.title}&nbsp;&nbsp;
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
     {products.price}
    </div>
      </Link>
</div>
   ))}
 </div>
  )
}

export default RvFsItem