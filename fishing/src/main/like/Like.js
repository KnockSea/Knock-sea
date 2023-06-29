import React, { useEffect, useState } from 'react';
import { getLoginUserInfo } from '../util/login-util';
import { API_BASE_URL, HEART } from '../../config/host-config';

function Like() {
  const [token, setToken] = useState(getLoginUserInfo().token);
  const [isHearted, setIsHearted] = useState(
    localStorage.getItem('isHearted') === 'true'
  );


  const createHeart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL, HEART}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          heartType: 'EDU', // 하트 유형 (SHIP, SPOT, EDU 등)
          eduId: 1, // 해당하는 edu의 ID
          productId: null, // 해당하는 product의 ID
        }),
      });

      if (response.ok) {
        const updatedIsHearted = !isHearted;
        setIsHearted(updatedIsHearted);
        localStorage.setItem('isHearted', updatedIsHearted.toString());
      } else {
        console.error('하트 생성 또는 삭제 실패');
      }
    } catch (error) {
      console.error('하트 생성 또는 삭제 실패:', error);
    }
  };

  return (
      <button
        onClick={createHeart}
        style={{
          color: isHearted ? 'red' : 'black',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
        }}
      >
        {isHearted ? '❤️' : '🤍'}
      </button>
  );
}

export default Like;