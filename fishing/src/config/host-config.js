// 브라우저가 현재 클라이언트의 호스트 이름 얻어오기

const clientHostNmae = window.location.hostname;

let backEndHostName; // 백엔드 서버 호스트 이름

if(clientHostNmae === 'localhost'){
    backEndHostName = 'http://localhost:8012';    
} else if (clientHostNmae === 'knocksea-react.s3-website.ap-northeast-2.amazonaws.com'){
    backEndHostName = 'http://52.78.128.116';
}

export const API_BASE_URL = backEndHostName;
export const SHIP = '/api/v1/ship';

export const FISHINGSPOT = 'api/v1/fishing';

export const EDU = '/api/v1/edu';

export const PRODUCTS = '/api/v1/products';

export const USER = '/api/v1/user';

export const VALIDATION = '/api/v1/validation';

export const INQUIRIES = '/api/v1/inquiries';

export const ANSWERS = '/api/v1/answers';

export const REVIEW = '/api/v1/reviews';

export const HOST = '/api/v1/products';
