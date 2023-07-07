import { decodeJWT } from '../utils/decodeJWT';
import { loginInstance } from './instance';

loginInstance.interceptors.response.use(
  async (response) => {
    const { data } = response;
    const token = data.accessToken;
    localStorage.setItem('token', token);
    const userId = decodeJWT(token);
    localStorage.setItem('userId', userId);

    return response;
  },
  (error) => {
    throw error;
  }
);
