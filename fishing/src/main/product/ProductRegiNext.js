import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './scss/ProductRegistration.scss';

function ProductRegiNext() {
  const [productContent, setProductContent] = useState('');
  const [locationInfo, setLocationInfo] = useState('');

  const handleGoBack = () => {
    window.history.back(); 
  };

  const handleProductRegi2nd = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="product-regi-wrap">
        <div className="product-regi-header">
          <div className="head-title">
            <p>KNOCK_SEA 상품 등록 <span style={{color:"navy", fontSize:"18px"}}>[2단계]</span></p>
            <img
              className="image-82-CzH"
              src="https://cdn-icons-png.flaticon.com/128/8955/8955326.png"
              id="SignUpImg"
              alt="SignUpImg"
            />
          </div>
        </div>
        <hr />
        <div className="product-regi-body" style={{marginTop:"40px"}}>
          <form onSubmit={handleProductRegi2nd} encType="multipart/form-data">
            <ul>
              <li>
                <div className="regi-title">
                  내용 <span className="imp">*</span>
                </div>
                <div>
                  <textarea
                    value={productContent}
                    onChange={(e) => setProductContent(e.target.value)}
                    className="form-control"
                    required
                    aria-required="true"
                    style={{height:"200px"}}
                    placeholder="ex) 해당 상품의 기재 내용을 상세히 작성"
                  />
                </div>
              </li>
              <li>
                <div className="regi-title">
                  장소 안내<span className="imp">*</span>
                </div>
                <div>
                  <textarea
                    value={locationInfo}
                    onChange={(e) => setLocationInfo(e.target.value)}
                    className="form-control"
                    required
                    aria-required="true"
                    style={{height:"200px"}}
                    placeholder="ex) 입문자도 한 시간만에 낚시 마스터!"
                  />
                </div>
              </li>
            </ul>
            <div className="product-regi-footer">
              <button onClick={handleGoBack} className="btn">
                이전으로
              </button>
              <Link to={'/'}>
              <button type="submit" className="btn">
                등록완료
              </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductRegiNext;
