import { loginData, signUpData } from '../types/authTypes';
import { authApi, userApi } from './api';

export const postSignUp = async (formData: signUpData) => {
  return (await authApi.signup(formData)).data;
};

export const postLogin = async (formData: loginData) => {
  return (await authApi.login(formData)).data;
};

export const getUserInfo = async () => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    return (await userApi.getUser(userId)).data;
  }
};
