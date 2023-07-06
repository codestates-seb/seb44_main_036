import { signUpData } from '../types/authTypes';
import { authApi } from './api';

export const postSignUp = async (formData: signUpData) => {
  return (await authApi.signup(formData)).data;
};
