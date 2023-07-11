import axios, { AxiosInstance, AxiosResponse, Method } from 'axios';

import { loginData, signUpData } from '../types/authTypes';
import { authInstance, instance } from './instance';

export const authApi = {
  login: (data: loginData) => instance.post('/login', data),
  logout: () => instance.post('/logout'),
  signup: (data: signUpData) => instance.post('/signup', data),
};

export const userApi = {
  getUser: (userId: string) => authInstance.get(`/${userId}`),
};

// export const ApiCaller = async <T, U>(
//   url: string,
//   data: U,
//   method: Method,
//   apiInstance: AxiosInstance = instance
// ): Promise<T> => {
//   let response: AxiosResponse<T>;
//   try {
//     response = await axios({
//       baseURL: import.meta.env.VITE_API_URL,
//       method,
//       data: { ...data },
//       url,
//     });
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
//   return response.data;
// };
