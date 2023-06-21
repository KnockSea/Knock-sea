import React from 'react'
import './scss/hostSearchMain.scss'
import HostPhotoCarousel from './hostPhotoCarousel'

const HostSearchMain = () => {
  return (
        <section className='MyHostMainBox'>
            <div className='mainbox1'>
                    
                    <div className='mychoicebox'>
                        <h1>호스트 조회</h1>
                    </div>
                                      
                    <div className='user-search-box'>
                        <div className='user-photo-box'>
                            <div>
                                <HostPhotoCarousel/>    
                            </div>
                        </div>

                        <div className='user-info-box'>
                            <div>
                                <div className='nickName'>
                                    <p>LOVETMORROW</p>
                                    <p>★★★★★</p>
                                </div>
                                <div>
                                    프사프사
                                </div>
                            </div>
                            <div>
                                <span>제목입니둥</span>
                                <span>소개소개소개</span>
                            </div>
                        </div>
                    </div>


                <div className='rvbox'>
                        <h2>이 업체의 리뷰</h2>
                        <p>아직 작성된 리뷰가 없습니다</p>
                </div>

                <div className='rvbox2'>
                    <div>
                        <h2>이 업체의 글</h2>
                        <p>아직 작성된 글이 없습니다</p>
                    </div>
                    <button className='isbtn'></button>
                </div>
            </div>
        </section>
    )
}

export default HostSearchMain