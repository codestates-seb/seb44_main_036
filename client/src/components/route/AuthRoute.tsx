import { getUserInfo } from '@/common/api/authApi';
import { storage } from '@/common/utils/storage';
import { useAppDispatch, useAppSelector } from '@/hooks/useReducer';
import userSlice from '@/reducer/userSlice';
import { useCallback, useEffect, useState, ReactNode } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

type Props = {
  children: ReactNode;
};

const AuthRoute = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.user.isLogin);

  const getUser = async () => {
    const userInfo = await getUserInfo();
    dispatch(userSlice.actions.logIn(userInfo));
    setIsLoading(true);
  };

  const autoLogin = useCallback(() => {
    if (!isLogin) {
      const accessToken = storage.get('accessToken');
      if (accessToken) {
        getUser();
      } else {
        navigate('/users/login');
      }
    }
    setIsLoading(true);
  }, []);

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  if (!isLoading) return <>Loading...</>;

  return isLoading ? <>{children}</> : <Navigate to='/users/login' />;
};

export default AuthRoute;
