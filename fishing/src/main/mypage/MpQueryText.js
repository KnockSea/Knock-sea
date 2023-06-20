import React from 'react'
import MpList from './MpList'
import './MpScss/MpQueryText.scss'

const MpQueryText = () => {
  return (
    <section className='MyPageMainBox'>
    <div className='mainbox1'>
     <h1>업체 내용 작성</h1>
    
    <div className='myquerybigbox'>
    {/* 제목 이름 작성 부분 */}
        <div className='titlebox '>
            <div className='clbox'>
                <div className='cltitle'>제목(이름)</div>
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
        

        <div className='titlebox qtfilebox1'>
            <div className='clbox'>
                <div className='cltitle qt'>첨부파일</div>
            </div>
            <div className='cltextbox'>
                <input/>
                <button className='qtfilebtn1'>파일 선택</button>
                <div className='qtfiletext'>선택된 파일 없음</div>
                <div className='qtfiletext1'>* 최대 다섯장까지 가능</div>
            </div>
        </div>

        <div className='titlebox qtfilebox1'>
            <div className='clbox'>
                <div className='cltitle'>대표 이미지 설정</div>
            </div>
            <div className='cltextbox'>
                <input/>
                <button className='qtfilebtn1'>파일 선택</button>
                <div className='qtfiletext'>선택된 파일 없음 </div>
            </div>
        </div>



  <button className='qtUpdatebtn'>글 등록하기</button>
    </div>
  </div>
    <MpList/>
</section>
  )
}

export default MpQueryText