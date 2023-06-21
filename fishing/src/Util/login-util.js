// 토큰 및 로그인 유저 데이터를 브라우저에 저장하는 함수

export const setLoginUserInfo = ({token , userName , role }) => {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('LOGIN_USERNAME', userName);
    localStorage.setItem('USER_ROLE', role);
};

export const getLoginUserInfo = () => {
    return {
        token: localStorage.getItem('ACCESS_TOKEN'),
        userName: localStorage.getItem('LOGIN_USERNAME'),
        role : localStorage.getItem('USER_ROLE')
    };
};

export const isLogin = () => !!localStorage.getItem('ACCESS_TOKEN');