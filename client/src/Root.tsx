import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Toast from './components/toast/toast';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/useReducer';
import userSlice from './reducer/userSlice';
import { getUserInfo } from './common/api/authApi';

function Root() {
  const dispatch = useAppDispatch();

  const getUser = async () => {
    const userInfo = await getUserInfo();
    dispatch(userSlice.actions.logIn(userInfo));
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const memberId = localStorage.getItem('accessToken');
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
