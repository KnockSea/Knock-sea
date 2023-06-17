import React, { useState } from 'react';
import './scss/OwnerCheck.scss';
import OwnerCheckFishing from './OwnerCheckFishing';
import OwnerCheckHeader from './OwnerCheckHeader';
import OwnerCheckShip from './OwnerCheckShip';

function OwnerCheckMain() {

  const handleOwnerCheck = (e) => {
    e.preventDefault();
    // 등록 처리 로직
  };

  return (
    <div className="container">
      <div className="owner-check-wrap">
       <OwnerCheckHeader/>
       <OwnerCheckShip/>
      </div>
    </div>
  );
}

export default OwnerCheckMain
