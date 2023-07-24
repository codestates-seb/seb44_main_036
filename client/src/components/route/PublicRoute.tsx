import { useMatch, useNavigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { storage } from '@/common/utils/storage';

type Props = {
  children: ReactNode;
};

const PublicRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const isLoginPage = useMatch('/users/login');
  const isSignUpPage = useMatch('/users/signup');

  useEffect(() => {
    const accessToken = storage.get('accessToken');
    if (accessToken && (isSignUpPage || isLoginPage)) {
      navigate('/');
    }
  }, [isLoginPage, isSignUpPage]);

  return <>{children}</>;
};

export default PublicRoute;
