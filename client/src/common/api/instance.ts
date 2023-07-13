import axios from 'axios';
import { decodeJWT } from '../utils/decodeJWT';
import { setCookie } from '../utils/cookie';

const timeout = 1500;

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout,
});

instance.interceptors.response.use(
  (response) => {
    if (response.config.url === '/login') {
      const headers = response.headers;
      const accessToken = headers['authorization'].replace('Bearer ', '');
      const refreshToken = headers['refresh'];
      const memberId = decodeJWT(accessToken).memberId;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('memberId', memberId);
      setCookie('refreshToken', refreshToken, {
        path: '/',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }
    return response;
  },
  (error) => {
    // const status = error?.response.status;
    // const msg = error?.response.data.message;
    if (error.config.url === '/signup') {
      // TODO: 서버에서 에러 정리되면 작업
      // if (status === 409) {
      //   if (msg === 'user exists') {
      //     alert('이미 존재하는 이메일 입니다.');
      //   }
      // }
      alert('회원가입 에러');
    }

    if (error.config.url === '/login') {
      alert('로그인 에러');
    }

    throw Promise.reject(error);
  }
);

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout,
});

authInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log('error체크', error);
    return Promise.reject(error);
  }
);

authInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('error체크', error);
    return Promise.reject(error);
  }
);
