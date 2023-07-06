import { loginData, signUpData } from '../types/authTypes';
import { authInstance, userInstance } from './instance';

export const authApi = {
  login: (data: loginData) => authInstance.post('/users/login', data),
  logout: () => authInstance.post('/users/logout'),
  signup: (data: signUpData) => authInstance.post('/users/signup', data),
};

export const userApi = {
  getUser: (userId: number) => userInstance.get(`/user/${userId}`),
};
