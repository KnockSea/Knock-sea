import React, { useState } from 'react';
import MpList from './MpList';
import './MpScss/MpQueryText.scss';
import { getLoginUserInfo } from '../util/login-util';
import axios from 'axios';

const MpQueryText = () => {


  const [token, setToken] = useState(getLoginUserInfo().token);
  const [images, setImages] = useState([]);
  const [info, setInfo] = useState({
    shipName: '',
    shipDescription: '',
  });
  
  // 이미지 선택상자 하나로 받을때
  const handleImage = e => {
    // const img = Array.from(e.target.files);
    setImages([...e.target.files]);
    // console.log('이미지 파일 목록 뜸?', img);
  };

  const handleTitle = (e) => {
    const newInfo = {...info, shipName:e.target.value};
    setInfo(newInfo);
  };

  const handleContent = (e) => {
    const newInfo = {...info, shipDescription:e.target.value};
    setInfo(newInfo);
  };

  const shipRegiFetch = async() => {

    const userJsonBlob = new Blob(
      [JSON.stringify(info)],
      { type: 'application/json' }
    );


    const formData = new FormData();
    formData.append('shipDTO', userJsonBlob);
    images.forEach((imgs) => {
      formData.append('shipImages', imgs);
    });

    for (let pair of formData.entries()) {
      console.log('키: ' + JSON.stringify(pair[0]),'밸류: ' + JSON.stringify(pair[1].name));
    }
    try{
      const res = await fetch('http://localhost:8012/api/v1/ship/register', {
        method: 'POST',
        headers: {'Authorization': 'Bearer ' + token},
        body: formData
      });
      
      if (res.status === 200) {
        alert('등록 성공');
      } else {
        alert(res.text());
      }
    } catch (error) {
      console.error('씨발');
    }

  }
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
                <input
                  type="text"
                  onChange={handleTitle}
                 />
            </div>
        </div>
    {/* 제목 이름 작성 부분  끝 */}

    {/* 내용 작성 부분 */}
        <div className='titlebox qtbox2'>
            <div className='clbox exx1'>
                <div className='cltitle'>내용</div>
            </div>
            <div className='cltextbox qttext'>
              <textarea
                type="text"
                onChange={handleContent}
              />
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
                      onChange={handleImage}
                      id="shipConfirmImage1"
                      className="form-control"                      
                      accept="image/*"                               
                      multiple
                    />
                  <span style={{color:"black"}}>{images[0] && <p>첨부된 사진 : {images[0].name}</p>}</span>
                  </div>
                  </div>
        </div>
  <button className='qtUpdatebtn' onClick={shipRegiFetch}>글 등록하기</button>
    </div>
  </div>
    <MpList/>
</section>
  )
}

export default MpQueryText