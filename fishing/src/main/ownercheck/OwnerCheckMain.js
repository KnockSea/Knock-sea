import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './scss/OwnerCheck.scss';
import OwnerCheckFishing from './OwnerCheckFishing';
import OwnerCheckHeader from './OwnerCheckHeader';
import OwnerCheckShip from './OwnerCheckShip';

function OwnerCheckMain() {
  return (
      <div className="container">
        <div className="owner-check-wrap">
          <Routes>
          <Route path="/" element={<OwnerCheckHeader />} />
          <Route path="/ship" element={<OwnerCheckShip />} />
          <Route path="/fishing" element={<OwnerCheckFishing />} />
          </Routes>
        </div>
      </div>
  );
}

export default OwnerCheckMain;
