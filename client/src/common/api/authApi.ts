import { loginData, signUpData } from '../types/authTypes';
import { removeCookie } from '../utils/cookie';
import { authApi, userApi } from './api';

export const postSignUp = async (formData: signUpData) => {
  await authApi.signup(formData);
};

export const postLogin = async (formData: loginData) => {
  const response = await authApi.login(formData);
  return response;
};

export const logout = async () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('memberId');
  removeCookie('refreshToken', { path: '/' });
};

export const getUserInfo = async () => {
  const memberId = localStorage.getItem('memberId');
  if (memberId) {
    return (await userApi.getUser(memberId)).data;
  }
};
