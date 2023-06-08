import React, { useEffect, useRef } from 'react';

import './scss/NsTemplate.scss';
import { NsHeader } from './NsHeader';
import NsMain from './NsMain';
import NsFootter from './NsFootter';

const NsTemplate = () => {


  



  
  return (
    <div>
      <div id='header'>
        <NsHeader />
      </div>

      <div id='main'>
        <NsMain />
        {/* <NsItem /> */}
      </div>

      <div id='footer'>
        <NsFootter />
      </div>
    </div>
  );
};

export default NsTemplate;