
// 토큰및 로그인 유저 데이터를 브라우저에 저장하는 함수

export const setLoginUserInfo = ({ token, userEmail, userGrade, userId, userName }) => {
                                    // 토큰 객체에 더 추가하면 더 넣을수 있음
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('LOGIN_USERNAME', userName);
    localStorage.setItem('LOGIN_USEREMAIL', userEmail);
    localStorage.setItem('USER_GRADE', userGrade);
    localStorage.setItem('USER_ID', userId);
};


// 로그인한 유저의 데이터객체를 반환하는 함수
export const getLoginUserInfo = () => {
  return {
    token: localStorage.getItem('ACCESS_TOKEN'),
    userEmail: localStorage.getItem('LOGIN_USEREMAIL'),
    userName: localStorage.getItem('LOGIN_USERNAME'),
    userGrade: localStorage.getItem('USER_GRADE'),
    userId: localStorage.getItem('USER_ID')
  };
};

// export const getLoginUserInfo = ({userPassword}) => {
//   return {
//     email: localStorage.getItem('EMAIL')
//     userPassword: localStorage.getItem('USER_PWD')
//   };
// };

// 로그인 여부를 확인하는 함수
// const isLogin = () => {
//   const token = localStorage.getItem('ACCESS_TOKEN');
//   if (token === null) return false;
//   return true;
// };


export const isLogin = () => !!localStorage.getItem('ACCESS_TOKEN');