// 브라우저가 현재 클라이언트의 호스트 이름 얻어오기

const clientHostNmae = window.location.hostname;

let backEndHostName; // 백엔드 서버 호스트 이름

if(clientHostNmae === 'localhost'){
    backEndHostName = 'http://172.30.1.28:8012';
} else if (clientHostNmae === 'vanila.com'){
    backEndHostName = 'https://api.vanila.co.kr';
}

export const API_BASE_URL = backEndHostName;
export const SHIP = '/api/v1/ship'
export const FISHINGSPOT = 'api/v1/fishing'
export const PRODUCTS = '/api/v1/products'


export const USER = '/api/v1/user';