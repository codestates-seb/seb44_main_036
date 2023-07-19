import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

import { loginData, signUpData } from '../types/authTypes';
import { authInstance, instance } from './instance';

export const authApi = {
  login: (data: loginData) => instance.post('/login', data),
  logout: () => instance.post('/logout'),
  signup: (data: signUpData) => instance.post('/signup', data),
};

export const userApi = {
  getUser: (userId: string, headers?: AxiosRequestConfig['headers']) =>
    authInstance.get(`/mypage/${userId}`, { headers }),
};

export const projectApi = {
  getImageUrl: (image: { image: File }) =>
    authInstance.post('/upload', image, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getProjects: (url: string) => authInstance.get(url).then(({ data }) => data),
  getProject: (url: string) => authInstance.get(url).then(({ data }) => data),
  addProject: <T>(project: T) => authInstance.post('/projects', project),
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
