import { signUpData } from '../types/authTypes';
import { instance } from './instance';

export const authApi = {
  login: () => instance.post('/users/login'),
  logout: () => instance.post('/users/logout'),
  signup: (data: signUpData) => instance.post('/users/signup', data),
};
