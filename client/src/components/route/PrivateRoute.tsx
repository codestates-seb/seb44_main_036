import { useMatch, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '@/hooks/useReducer';

const PrivateRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const isLoginPage = useMatch('/users/login');
  const isSignUpPage = useMatch('/users/signup');

  useEffect(() => {
    if (isLogin && (isSignUpPage || isLoginPage)) {
      navigate('/');
    }
  }, []);

  return <>{children}</>;
};

export default PrivateRoute;
