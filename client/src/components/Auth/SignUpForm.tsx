import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';

import AuthInput from '@/components/auth/AuthInput';
import { Button, Strong } from '@/components/ui';
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from '@/common/constants/regexs';
import { FormValues } from '@/common/types/authTypes';
import { postSignUp } from '@/common/api/authApi';
import { successToast } from '@/common/utils/toast';
import axios from 'axios';

function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    const { email, nickname, password } = formData;
    try {
      await postSignUp({ email, password, nickname });
      successToast('회원가입 성공');
      navigate('/users/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.message;
        alert(errorMessage);
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
        type={'text'}
        id={'nickname'}
        label={'닉네임'}
        style={'mb-30pxr'}
        holder={'닉네임을 입력해주세요'}
        register={register}
        registerOptions={{
          required: '닉네임은 필수 입력입니다.',
          minLength: {
            value: 2,
            message: '2자리 이상 닉네임을 사용하세요.',
          },
          maxLength: {
            value: 10,
            message: '10자리 이하 닉네임를 사용하세요.',
          },
          pattern: {
            value: NAME_REGEX,
            message: '닉네임은 한글, 영문만 사용가능 합니다.',
          },
        }}
        errors={errors}
      />
      <AuthInput
        type={'password'}
        id={'password'}
        label={'비밀번호'}
        style={'mb-15pxr'}
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
      <AuthInput
        type={'password'}
        id={'passwordCheck'}
        holder={'비밀번호 확인'}
        register={register}
        registerOptions={{
          required: '비밀번호 확인은 필수 입력입니다.',
          validate: {
            value: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
          },
        }}
        errors={errors}
      />
      <Button type='submit' text='회원가입' style='h-50pxr mb-23pxr mt-44pxr' />
      <div className='flex-center'>
        <p>
          이미 회원이신가요?
          <Strong
            onClick={() => navigate('/users/login')}
            text='로그인'
            style={'cursor-pointer ml-12pxr'}
          />
        </p>
      </div>
    </form>
  );
}

export default SignUpForm;
