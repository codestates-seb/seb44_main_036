import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

import { getUserInfo, postLogin } from '@/common/api/authApi';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/common/constants/regexs';
import { LoginFormValues } from '@/common/types/authTypes';
import { Button, Strong } from '@/components/ui';
import userSlice from '@/reducer/userSlice';
import { useAppDispatch } from '@/hooks/useReducer';
import { successToast } from '@/common/utils/toast';
import { AuthInput } from '.';

function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (formData) => {
    if (isSubmitting) return;
    const { email, password } = formData;

    setIsSubmitting(true);
    try {
      await postLogin({ email, password });
      const userInfo = await getUserInfo();
      dispatch(userSlice.actions.logIn(userInfo));

      successToast(`환영합니다. ${userInfo.nickname}님`);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.message;
        alert(errorMessage);
      } else {
        alert('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className='flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
      <AuthInput
        type={'email'}
        id={'email'}
        label={'이메일'}
        style={'mb-30pxr'}
        holder={'이메일을 입력해 주세요'}
        register={register}
        registerOptions={{
          required: '이메일은 필수 입력입니다.',
          pattern: {
            value: EMAIL_REGEX,
            message: '올바른 이메일 형식을 사용하세요.',
          },
        }}
        errors={errors}
      />
      <AuthInput
        type={'password'}
        id={'password'}
        label={'비밀번호'}
        holder={'비밀번호을 입력해주세요'}
        register={register}
        registerOptions={{
          required: '비밀번호는 필수 입력입니다.',
          minLength: {
            value: 8,
            message: '8자리 이상 비밀번호를 사용하세요.',
          },
          maxLength: {
            value: 15,
            message: '15자리 이하 비밀번호를 사용하세요.',
          },
          pattern: {
            value: PASSWORD_REGEX,
            message: '하나 이상의 문자, 숫자, 특수문자를 포함해야 합니다.',
          },
        }}
        errors={errors}
      />
      <Button type='submit' text='로그인' style='h-50pxr mb-23pxr mt-44pxr' />
      <div className='flex-center'>
        <p>
          회원이 아니신가요?
          <Strong
            onClick={() => navigate('/users/signup')}
            text='회원가입'
            style={'cursor-pointer ml-12pxr'}
          />
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
