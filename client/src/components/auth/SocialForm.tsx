import { useMatch } from 'react-router-dom';

import { TitleText } from '../ui';
import { ReactComponent as GoogleLogoSvg } from '@/assets/logos/google_logo.svg';
import { ReactComponent as KakaoLogoSvg } from '@/assets/logos/kakao_logo.svg';
import SocialButton from './SocialButton';

function SocialForm() {
  const isSignUp = useMatch('/users/signup');
  const url = `https://mifunding.vercel.app/oauth2/authorization/google`;

  const googleSocialLogin = () => {
    window.location.href = url;
  };

  return (
    <article className='w-full max-w-[370px] flex flex-col'>
      <TitleText text={isSignUp ? '간편 가입' : '간편 로그인'} style={'mb-14pxr'} />
      <SocialButton
        onClick={googleSocialLogin}
        text={'구글 계정으로 시작'}
        icon={<GoogleLogoSvg />}
        style={'mb-15pxr text-gray-800 bg-white border-[1.5px] border-gray-300 hover:bg-gray-200'}
      />
      <SocialButton
        text={'카카오톡으로 시작'}
        icon={<KakaoLogoSvg />}
        style={'text-kakao-300 bg-kakao-100 border-gray-300 hover:bg-kakao-200'}
      />
    </article>
  );
}

export default SocialForm;
