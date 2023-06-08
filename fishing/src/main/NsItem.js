import React from 'react'
import ex from './img/ex.jpg'
import './scss/NsItem.scss'

const NsItem = () => {
  return (

    <div className='ship'>
                <div className='title'>
                    <p className='t1'>오늘의 배낚시 > </p>
                    <p className='t2'>더보기</p>
                </div>
                <div className='shipboxs'>
                    <div><img src={ex} /></div>
                    <div><img src={ex} /></div>
                    <div><img src={ex} /></div>
                </div>
            </div>

  )
}

export default NsItem