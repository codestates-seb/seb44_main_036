import { SignUpForm, SocialForm } from '@/components/@auth';

function SignUpPage() {
  return (
    <section className='flex-col flex-center my-80pxr'>
      <SocialForm />
      <article className='w-full max-w-[370px] mt-42pxr'>
        <SignUpForm />
      </article>
    </section>
  );
}

export default SignUpPage;
