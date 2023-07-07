import { loginData, signUpData } from '../types/authTypes';
import { authInstance, instance, loginInstance } from './instance';

export const authApi = {
  login: (data: loginData) => loginInstance.post('/users/login', data),
  logout: () => instance.post('/users/logout'),
  signup: (data: signUpData) => instance.post('/users/signup', data),
};

export const userApi = {
  getUser: (userId: string) => authInstance.get(`/user/${userId}`),
};
