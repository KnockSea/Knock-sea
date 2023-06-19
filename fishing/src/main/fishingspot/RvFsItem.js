import React from 'react'
import './RvScss/RvFsItem.scss'
import fs from '../img/fs.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bullseye,Calendar2Check,EmojiSmile,PersonVcard, CheckCircleFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import RvFsDetail from './RvFsDetail';


const RvFsItem = () => {
  return (
    <div className='contentCard'>
      <Link to={"/fsdetail"}>

    <div className='imgbox'>
        <img src={fs} />
    
    </div>
    <div className='cardTitle'>
    <CheckCircleFill />[제부도] 독도 바다 낚시터 &nbsp;&nbsp;
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
    <Calendar2Check style={{color:'#3974D9'}}/> 130,000원
    </div>
      </Link>
</div>

  )
}

export default RvFsItem