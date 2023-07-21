import { loginData, signUpData } from '../types/authTypes';
import { removeCookie } from '../utils/cookie';
import { storage } from '../utils/storage';
import { authApi, userApi } from './api';

export const postSignUp = async (formData: signUpData) => {
  await authApi.signup(formData);
};

export const postLogin = async (formData: loginData) => {
  const response = await authApi.login(formData);
  return response;
};

export const logout = async () => {
  storage.remove('accessToken');
  storage.remove('memberId');
  removeCookie('refreshToken', { path: '/' });
};

export const getUserInfo = async () => {
  const memberId = storage.get('memberId');
  console.log('memberId', memberId);
  if (memberId) {
    return (await userApi.getUser(memberId)).data;
  }
};
