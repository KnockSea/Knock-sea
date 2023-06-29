import React from 'react'
import './scss/NsClass.scss'
import c1 from './img/bn3.jpg'
import { Link } from "react-router-dom";

const NsClass = () => {
  return (

    <div className='class'>
    <div className='title'>
        <p className='t1'>오늘의 클래스 </p>
        <Link to={"/class"}>더보기</Link>
    </div>
    <div className='classs'>
        <div><img src={c1} /></div>
        <div><img src={c1} /></div>
        <div><img src={c1} /></div>
    </div>
</div>


  )
}

export default NsClass