import React, { useState } from 'react'
import MpList from './MpList'
import './MpScss/MpQueryText.scss'

const MpQueryText = () => {

    const [shipConfirmImage1, setShipConfirmImage1] = useState(null);
    const [shipConfirmImage2, setShipConfirmImage2] = useState(null);

  const handleShipConfirmImage1Change = (event) => {
    const file = event.target.files[0];
    setShipConfirmImage1(file);
  };

  const handleShipConfirmImage2Change = (event) => {
    const file = event.target.files[0];
    setShipConfirmImage2(file);
  };
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
            <div className="filebox">
                    <label htmlFor="shipConfirmImage1">파일 선택하기</label>
                    <div>
                    <input
                      type="file"
                      onChange={handleShipConfirmImage1Change}
                      id="shipConfirmImage1"
                      className="form-control"
                      required
                      aria-required="true"
                      accept="image/*"
                      name="shipConfirmImage1"
                      encType="multipart/form-data"
                      multiple
                    />
                  <span style={{color:"black"}}>{shipConfirmImage1 && <p>첨부된 사진 : {shipConfirmImage1.name}</p>}</span>
                  </div>
                  </div>
        </div>

        <div className='titlebox qtfilebox1'>
            <div className='clbox'>
                <div className='cltitle'>대표 이미지 설정</div>
            </div>
            <div class="filebox">
                    <label htmlFor="shipConfirmImage2">파일 선택하기</label>
                    <div>
                    <input
                      type="file"
                      onChange={handleShipConfirmImage2Change}
                      id="shipConfirmImage2"
                      className="form-control"
                      required
                      aria-required="true"
                      accept="image/*"
                      name="shipConfirmImage2"
                    />
                     <span style={{color:"black"}}>{shipConfirmImage2 && <p>첨부된 사진 : {shipConfirmImage2.name}</p>}</span>
                     </div>
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