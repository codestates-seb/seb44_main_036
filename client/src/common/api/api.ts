import { AxiosRequestConfig } from 'axios';

import { loginData, signUpData } from '../types/authTypes';
import { authInstance, instance } from './instance';

export const authApi = {
  login: (data: loginData) => instance.post('/login', data),
  logout: () => instance.post('/logout'),
  signup: (data: signUpData) => instance.post('/signup', data),
};

export const userApi = {
  getUser: (memberId: number, headers?: AxiosRequestConfig['headers']) =>
    authInstance.get(`/members/${memberId}`, { headers }),
  getUserProjects: (url: string) => authInstance.get(url).then(({ data }) => data),
  updateUser: (memberId: number, userData: any, headers?: AxiosRequestConfig['headers']) =>
    authInstance.patch(`/members/${memberId}`, userData, { headers }),
};

export const projectApi = {
  getImageUrl: (image: { image: File }) =>
    authInstance.post('/upload', image, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getProjects: (url: string) => authInstance.get(url).then(({ data }) => data),
  getProject: (url: string) => authInstance.get(url).then(({ data }) => data),
  addProject: <T>(project: T) => authInstance.post('/projects', project),
  editProject: <T>(id: string, project: T) => authInstance.patch(`/projects/${id}`, project),
  deleteProject: (id: string) => authInstance.delete(`/projects/${id}`),
  fundingProject: <T>(data: T) => authInstance.post('/fundings', data),
  likeProject: <T>(data: T) => authInstance.post('/projects/like', data),
};
