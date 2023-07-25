import axios from 'axios';
import { decodeJWT } from '../utils/decodeJWT';
import { setCookie } from '../utils/cookie';
import { storage } from '../utils/storage';

const timeout = 5000;

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

      storage.set('accessToken', accessToken);
      storage.set('memberId', memberId);
      setCookie('refreshToken', refreshToken, {
        path: '/',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }
    return response;
  },
  (error) => {
    const errMsg = error.response.data.message;

    if (error.config.url === '/signup') {
      error.message = errMsg === 'member exists' ? '이미 존재하는 유저입니다.' : '회원가입 오류';
    }

    if (error.config.url === '/login') {
      error.message =
        errMsg === 'Unauthorized' ? '이메일이나 비밀번호를 올바르게 입력해 주세요' : '로그인 오류';
    }

    throw error;
  }
);

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout,
});

authInstance.interceptors.request.use(
  (config) => {
    const accessToken = storage.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
