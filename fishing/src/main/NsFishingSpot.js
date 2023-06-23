import React from 'react'
import './scss/NsFishingSpot.scss'
import ex1 from './img/bg.jpg'

const NsFishingSpot = () => {
  return (
    <div className='fishingSpot'>
    <div className='title'>
        <p className='t1'>오늘의 낚시터 </p>
        <p className='t2'>더보기</p>
    </div>
    <div className='fishingSpots'>
        <div><img src={ex1} /></div>
        <div><img src={ex1} /></div>
        <div><img src={ex1} /></div>
    </div>
</div>
  )
}

export default NsFishingSpot