import React, { useEffect, useState } from 'react';
import './scss/NsTemplate.scss';
import { NsHeader } from './NsHeader';
import NsMain from './NsMain';
import NsFootter from './NsFootter';
import { useLocation, useNavigate } from 'react-router-dom';





const NsTemplate = () => {


  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);








  useEffect(() => {
    // 링크 변경 시 footer 숨김 처리
    setShowFooter(location.pathname === '/');
  }, [location]);

  return (
    <div>
        <NsHeader
        
        />

        <NsMain />

      {showFooter && (
          <NsFootter />
      )}
    </div>
  );
};

export default NsTemplate;