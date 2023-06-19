import React, { useEffect, useState } from 'react';
import './scss/NsTemplate.scss';
import { NsHeader } from './NsHeader';
import NsMain from './NsMain';
import NsFootter from './NsFootter';
import { useLocation } from 'react-router-dom';

const NsTemplate = () => {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    // 링크 변경 시 footer 숨김 처리
    setShowFooter(location.pathname === '/');
  }, [location]);

  return (
    <div>
      <div id='header'>
        <NsHeader />
      </div>

      <div id='main'>
        <NsMain />
        {/* <NsItem /> */}
      </div>

      {showFooter && (
        <div id='footer'>
          <NsFootter />
        </div>
      )}
    </div>
  );
};

export default NsTemplate;