import React from 'react'
import MpList from './MpList'

const MpIqInput = () => {
  return (
    <section className='MyPageMainBox'>
    <div className='mainbox1'>
     <h1>문의하기</h1>
    
    <div className='myquerybigbox'>
    {/* 제목 이름 작성 부분 */}
        <div className='titlebox '>
            <div className='clbox'>
                <div className='cltitle'>제목</div>
            </div>
            <div className='cltextbox'>
                <input/>
            </div>
        </div>
    {/* 제목 이름 작성 부분  끝 */}

    {/* 내용 작성 부분 */}
        <div className='titlebox qtbox2'>
            <div className='clbox exx1'>
                <div className='cltitle'>내용</div>
            </div>
            <div className='cltextbox qttext'>
              <textarea/>
            </div>
        </div>
    {/* 내용 작성 부분 끝 */}
        

     



  <button className='qtUpdatebtn'> 작성완료 </button>
    </div>
  </div>
    <MpList/>
</section>
  )
}

export default MpIqInput