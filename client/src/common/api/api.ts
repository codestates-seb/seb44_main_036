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
    authInstance.get(`/members/${userId}`, { headers }),
};

export const projectApi = {
  getImageUrl: (image: { image: File }) =>
    authInstance.post('/upload', image, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getProjects: (url: string) => authInstance.get(url).then(({ data }) => data),
  getProject: (url: string) => authInstance.get(url).then(({ data }) => data),
  addProject: <T>(project: T) => authInstance.post('/projects', project),
};
