
// 토큰및 로그인 유저 데이터를 브라우저에 저장하는 함수
export const setLoginUserInfo = ({ token, email, userGrade, userId, userName }) => {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('EMAIL', email);
    localStorage.setItem('GRADE', userGrade);
    localStorage.setItem('USER_ID', userId);
    localStorage.setItem('USER_NAME', userName);
};


// 로그인한 유저의 데이터객체를 반환하는 함수
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