import React, { useState } from 'react';
import './scss/OwnerCheck.scss';

function OwnerCheckShip() {
  const [shipConfirmImage1, setShipConfirmImage1] = useState(null);
  const [shipConfirmImage2, setShipConfirmImage2] = useState(null);
  const [name, setName] = useState('');

  const handleOwnerCheck = (e) => {
    e.preventDefault();
    // 등록 처리 로직
  };

  const handleShipConfirmImage1Change = (event) => {
    const file = event.target.files[0];
    setShipConfirmImage1(file);
  };

  const handleShipConfirmImage2Change = (event) => {
    const file = event.target.files[0];
    setShipConfirmImage2(file);
  };


  return (
    
    <div className="container">
      <div className="owner-check-wrap">
        <div className="owner-check-body">
          <form onSubmit={handleOwnerCheck} encType="multipart/form-data">
            {/* <ul>
              <li>
                <div>카테고리</div>
                <div className='category'>
                  <div className="category-select ship">선박</div>
                  <div className="category-select fishing">낚시터</div>
                </div>
              </li>
              </ul> */}
              <ul>
              {/* <li>
                <div>배 이름<span className="imp">*</span></div>
                <div>
                  <input
                    type="shipName"
                    value={shipName}
                    onChange={(e) => setShipName(e.target.value)}
                    size="30"
                    className="form-control"
                    required
                    aria-required="true"
                    placeholder="선박 등록증과 동일한 배 이름을 작성해주세요."
                  />
                </div>
              </li> */}
              <li>
                <div>선박 등록증<span className="imp">*</span></div>
                <div>
                  <div className="filebox">
                    <label htmlFor="shipConfirmImage1">파일 선택하기</label>
                    <input
                      type="file"
                      onChange={handleShipConfirmImage1Change}
                      id="shipConfirmImage1"
                      className="form-control"
                      required
                      aria-required="true"
                      accept="image/*"
                      name="shipConfirmImage1"
                    />
                  <span>{shipConfirmImage1 && <p>첨부된 사진 : {shipConfirmImage1.name}</p>}</span>
                  </div>
                </div>

              </li>
              <li>
                <div>선박등록증 번호<span className="imp">*</span></div>
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    maxLength="6"
                    required
                    aria-required="true"
                    placeholder="'-' 없이 선박 등록증 번호를 동일하게 입력해주세요."
                  />
                </div>
              </li>
              <li>
                <div>선박 면허증<span className="imp">*</span></div>
                <div>
                <div className="">
                    <div class="filebox">
                    <label htmlFor="shipConfirmImage2">파일 선택하기</label>
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
                     <span>{shipConfirmImage1 && <p>첨부된 사진 : {shipConfirmImage1.name}</p>}</span>
                  </div>
                  </div>
                </div>
              </li>
              <li>
                <div>면허증 번호<span className="imp">*</span></div>
                <div>
                  <input
                    type="address"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    required
                    aria-required="true"
                    placeholder="'-' 없이 면허증 번호를 동일하게 기입해주세요."
                  />
                  <span id="addressChk"></span>
                </div>
              </li>
              {/* <li>
                <div>선박번호판<span className="imp">*</span></div>
                <div>
                  <input
                    type="tel"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    className="form-control"
                    required
                    aria-required="true"
                    maxLength="15"
                    placeholder="선박번호판을 입력해주세요."
                  />
                  <span id="PhoneChk"></span>
                </div>
              </li> */}
            </ul>
            <div className="owner-check-footer">
              <button type="submit" className="btn">
                취소
              </button>
              <button type="submit" className="btn">
                다음
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default OwnerCheckShip
