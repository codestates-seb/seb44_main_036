import { decodeJWT } from '../utils/decodeJWT';
import { instance } from './instance';

instance.interceptors.response.use(
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
