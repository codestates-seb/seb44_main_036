import SocialForm from '@/components/auth/SocialForm';
import SignUpForm from '@/components/auth/SignUpForm';
import KakaoMap from '@/components/kakaomap/KakaoMap';

function SignUpPage() {
  return (
    <section className='flex-col flex-center my-80pxr'>
      <KakaoMap />
      <SocialForm />
      <article className='w-full max-w-[370px] mt-42pxr'>
        <SignUpForm />
      </article>
    </section>
  );
}

export default SignUpPage;
