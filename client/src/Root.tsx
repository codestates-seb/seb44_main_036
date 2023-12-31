import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Toast from './components/toast/toast';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/useReducer';
import userSlice from './reducer/userSlice';
import { getUserInfo, logout } from './common/api/authApi';
import { storage } from './common/utils/storage';

function Root() {
  const dispatch = useAppDispatch();

  const getUser = async () => {
    try {
      const userInfo = await getUserInfo();
      dispatch(userSlice.actions.logIn(userInfo));
    } catch {
      logout();
    }
  };

  useEffect(() => {
    const accessToken = storage.get('accessToken');
    const memberId = storage.get('memberId');
    if (accessToken && memberId) {
      getUser();
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
