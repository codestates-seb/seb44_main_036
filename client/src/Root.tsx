import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/header/Header';
import Toast from './components/toast/toast';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/useReducer';
import userSlice from './reducer/userSlice';
import { getUserInfo } from './common/api/authApi';
import { storage } from './common/utils/storage';

function Root() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    const userInfo = await getUserInfo();
    dispatch(userSlice.actions.logIn(userInfo));
  };

  useEffect(() => {
    const accessToken = storage.get('accessToken');
    const memberId = storage.get('memberId');
    if (accessToken && memberId) {
      getUser();
      navigate('/');
    }
  }, []);

  return (
    <>
      <Toast />
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
