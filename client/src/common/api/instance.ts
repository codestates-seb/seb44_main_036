import axios from 'axios';
import { decodeJWT } from '../utils/decodeJWT';
import { getUserData } from './authApi';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const userInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

authInstance.interceptors.response.use(
  async (response) => {
    const data = response.data;
    const token = data.accessToken;
    localStorage.setItem('token', token);
    const userId = decodeJWT(token);

    try {
      const userData = await getUserData(userId);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('유저 정보를 가져오는데 실패했습니다.', error);
    }

    return response;
  },
  (error) => {
    throw error;
  }
);
