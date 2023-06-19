import React from 'react'
import './scss/NsClass.scss'
import c1 from './img/class.jpg'
const NsClass = () => {
  return (

    <div className='class'>
    <div className='title'>
        <p className='t1'>오늘의 클래스 > </p>
        <p className='t2'>더보기</p>
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