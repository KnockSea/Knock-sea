import React from 'react'
import './scss/hostSearchMain.scss'

const HostSearchMain = () => {
  return (
        <section className='MyHostMainBox'>
            <div className='mainbox1'>
                    
                    <div className='mychoicebox'>
                        <h1>호스트 조회</h1>
                    </div>
                                      
                    <div className='userinfobox'>
                        <div className='thumnail-box'>
                            <div> </div>
                        </div>
                        <div className='namebox'>
                            <div className='nickName'>LOVETMORROW</div>
                            <div>업체정보를 입력하세요</div>
                        </div>
                        <div className='btbox'>
                        <button className='isbtn'></button>
                        <button></button>
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