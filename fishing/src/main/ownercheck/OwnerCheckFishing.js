import React, { useState } from 'react';
import './scss/OwnerCheck.scss';

function OwnerCheckFishing() {
  const [accountId, setAccountId] = useState('');
  const [shipName, setShipName] = useState('');
  const [file, setFile] = useState(null);
  const [userpasswordChk, setuserpasswordChk] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const handleOwnerConfirm = (e) => {
    e.preventDefault();
    //  처리 로직
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
   
         <div className="owner-check-body">
          <form onSubmit={handleOwnerConfirm} encType="multipart/form-data">
              <ul>
             
              <li>
                <div>사업자 등록증<span className="imp">*</span></div>
                <div>
                  <div className="">
                    <div className="filebox">
                      <label htmlFor="shipConfirm">파일 선택하기</label>
                      <input
                      type="file"
                      onChange={handleFileChange}
                      id="shipConfirm"
                      className="form-control"
                      required
                      aria-required="true"
                      accept="image/*"
                      name="shipConfirmImage"
                    />
                     <span>{file && <p>첨부된 사진: {file.name}</p>}</span>
                  </div>
                  </div>
                  
                </div>
              </li>
              <li>
                <div>사업자 등록증 번호<span className="imp">*</span></div>
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    maxLength="6"
                    required
                    aria-required="true"
                    placeholder="'-' 없이 사업자 등록증 번호와 동일하게 입력해주세요."
                  />
                  <span id="nameChk"></span>
                </div>
              </li>
              {/* <li>
                <div>사업주 명<span className="imp">*</span></div>
                <div>
                <input
                    type="shipName"
                    value={shipName}
                    onChange={(e) => setShipName(e.target.value)}
                    size="30"
                    className="form-control"
                    required
                    aria-required="true"
                    placeholder="사업자 등록증의 상호명과 동일하게 작성해주세요."
                  />
                </div>
              </li>
              <li>
                <div>낚시터 위치 정보<span className="imp">*</span></div>
                <div>
                  <input
                    type="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    required
                    aria-required="true"
                    placeholder="도로명 주소 혹은 지번 주소를 입력해주세요."
                  />
                  <span id="addressChk"></span>
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
  );
}

export default OwnerCheckFishing