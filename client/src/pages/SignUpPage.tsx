import AuthInput from '@/components/Auth/AuthInput';
import { ReactComponent as GoogleLogoSvg } from '@/assets/logos/google_logo.svg';
import { ReactComponent as KakaoLogoSvg } from '@/assets/logos/kakao_logo.svg';
import TitleText from '@/components/Auth/TitleText';
import SocialButton from '@/components/Auth/SocialButton';
import Button from '@/components/Auth/Button';
import Strong from '@/components/Auth/Strong';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from '@/common/regaxs';

interface IFormValues {
  [key: string]: string;
}

function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <section className='flex-col flex-center my-80pxr'>
      <article className='w-full max-w-[370px] mb-42pxr flex flex-col'>
        <TitleText text={'간편 가입'} style={'mb-14pxr'} />
        <SocialButton
          text={'구글 계정으로 시작'}
          icon={<GoogleLogoSvg />}
          style={'mb-15pxr text-gray-800 bg-white border-[1.5px] border-gray-300 hover:bg-gray-200'}
        />
        <SocialButton
          text={'카카오톡으로 시작'}
          icon={<KakaoLogoSvg />}
          style={'text-kakao-300 bg-kakao-100 border-[1.5px] border-gray-300 hover:bg-kakao-200'}
        />
      </article>
      <article className='w-full max-w-[370px]'>
        <form className='flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            type={'email'}
            id={'email'}
            label={'이메일'}
            style={'mb-30pxr'}
            holder={'이메일을 입력해 주세요'}
            register={register}
          />
          <AuthInput
            type={'text'}
            id={'nickname'}
            label={'닉네임'}
            style={'mb-30pxr'}
            holder={'닉네임을 입력해주세요'}
            register={register}
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
            }}
            errors={errors}
          />
          <AuthInput
            type={'password'}
            id={'password-check'}
            holder={'비밀번호 확인'}
            style={'mb-44pxr'}
            register={register}
          />
          <Button type='submit' text='회원가입' style='h-50pxr mb-23pxr' />
          <div className='flex-center'>
            <p>
              이미 회원이신가요?{' '}
              <Strong
                onClick={() => navigate('/users/login')}
                text='로그인'
                style={'cursor-pointer'}
              />
            </p>
          </div>
        </form>
      </article>
    </section>
  );
}

export default SignUpPage;
