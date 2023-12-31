import { LoginForm } from '@/components/auth';

function LoginPage() {
  return (
    <section className='flex-col flex-center my-140pxr'>
      <article className='w-full max-w-[370px] mt-42pxr'>
        <LoginForm />
      </article>
    </section>
  );
}

export default LoginPage;
