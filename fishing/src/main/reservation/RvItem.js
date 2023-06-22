import React from 'react'
import './RvScss/RvItem.scss'
import boat from '../img/boat.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bullseye, Calendar2Check, EmojiSmile, PersonVcard, CheckCircleFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import RvBtDetail from './RvBtDetail';
import { useState } from 'react';
import { useEffect } from 'react';
import { API_BASE_URL, SHIP } from '../../config/host-config';


const RvItem = ( {shipInfo}) => {
    
  



    // 배 이미지 가져오가
    const [shipimg , setshipimg] = useState("");

    useEffect(()=> {
      fetch(`${API_BASE_URL}${SHIP}/getshipinfo`)
      .then(reponse => reponse.text())
      .then(shipimg => {
        setshipimg(shipimg);
      });
    },[]);
    // 이미지 가져오기 끝 


  return (
    <div className='contentCard'>
      <Link to={"/detail"}>

    <div className='imgbox'>
        <img src={setshipimg} />
    
    </div>
    <div className='cardTitle'>
    <CheckCircleFill />[제부도5시간] 카날리나 1호 쭈꾸미 낚시
    </div>
    <div className='miniTitle'>집결장소 제부도 주차장 1호</div>
    <div className='miniContent'>
    <Bullseye />차고지 : 제부도 주차장 &nbsp;
    <PersonVcard/>
    신분증 지참 &nbsp;
    <EmojiSmile />
     총 6명
    </div>
    <div className='calendar'>
    <Calendar2Check style={{color:'#3974D9', float:'left',marginTop:'5'}}/> 130,000원
    </div>
      </Link>
</div>

  )
}

export default RvItem