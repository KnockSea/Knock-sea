import React from 'react';
// import './scss/OwnerCheck.scss';
import './scss/OwnerCheckHeader.scss';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-bootstrap-icons';

function OwnerCheckHeader() {
  return (
    // <div className="container">
    //   <div className="owner-check-wrap">
        <div className="owner-check-header">
         <div className="head-title">
          <p>KNOCK_SEA 업체 검증</p>
          <img className="image-82-CzH" src="https://cdn-icons-png.flaticon.com/128/3061/3061579.png" id="SignUpImg" alt="SignUpImg" />
        </div>
        <div className="owner-check-body">
          <hr/>
          <ul>
            <li>
              <div>카테고리<span className="imp">*</span></div>
              <div className='category'>
                <Link to="ship" className="category-select ship">선박</Link>
                <Link to="fishing" className="category-select fishing">낚시터</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    //  </div>
    // </div>
  );
}

export default OwnerCheckHeader;
