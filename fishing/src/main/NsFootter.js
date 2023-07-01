import React from 'react';
import './scss/NsFootter.scss';
import star from './icons/icons10.png';
import fb from './icons/icons11.png';
import tw from './icons/icons12.png';

const NsFootter = () => {
  return (
    <div className='footter'>
      <div className='iconsbox1'>
        <a href='http://icons8.com/icons'>
          <img src={star} alt='Star' />
        </a>
        <a href='http://icons8.com/icons' className='imgcn'>
          <img src={fb} alt='Facebook' />
        </a>
        <a href='http://icons8.com/icons'>
          <img src={tw} alt='Twitter' />
        </a>
      </div>

      <div>
        <p>FAX : 02-123-4567</p>
        <p className='ft'>Email: helpdesk@knocksea.com</p>
      </div>
      <p className='copyright'>
        Copyrightⓒ Your fishing makes me happy.
        All rights reserved.
      </p>
    </div>
  );
};

export default NsFootter;
