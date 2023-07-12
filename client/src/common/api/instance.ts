import axios from 'axios';
import { decodeJWT } from '../utils/decodeJWT';
import { setCookie } from '../utils/cookie';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.response.use(
  (response) => {
    if (response.config.url === '/login') {
      const headers = response.headers;

      const accessToken = headers['authorization'].replace('Bearer ', '');
      localStorage.setItem('accessToken', accessToken);
      const { memberId } = decodeJWT(accessToken);
      localStorage.setItem('memberId', memberId);

      const refreshToken = headers['refresh'];
      setCookie('refreshToken', refreshToken, {
        path: '/',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }
    return response;
  },
  (error) => {
    console.log(error);
    const status = error.response.status;
    const msg = error.response.data.message;

    if (error.config.url === '/signup') {
      if (status === 409) {
        if (msg === 'user exists') {
          alert('이미 존재하는 이메일 입니다.');
        } else {
          alert('이미 존재하는 이메일 입니다.');
        }
      }
    }

    if (error.config.url === '/login') {
      if (status === 401) {
        if (msg === 'Unauthorized') {
          alert('이메일 또는 비밀번호가 맞지 않습니다. 다시 확인해 주세요.');
        }
      } else {
        alert('이메일 또는 비밀번호가 맞지 않습니다. 다시 확인해 주세요.');
      }
    }

    throw Promise.reject(error);
  }
);

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

authInstance.interceptors.request.use(
  (response) => response,
  (error) => {
    console.log('error체크', error);
    return Promise.reject(error);
  }
);
