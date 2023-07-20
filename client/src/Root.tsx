import { Outlet } from 'react-router-dom';
import Header from './components/@header/Header';
import Toast from './components/toast/toast';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/useReducer';
import userSlice from './reducer/userSlice';

function Root() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const memberId = localStorage.getItem('accessToken');
    if (accessToken && memberId) {
      // const userInfo = await getUserInfo();
      // dispatch(userSlice.actions.logIn(userInfo));
      dispatch(
        userSlice.actions.logIn({
          nickname: 'eyo25',
          address: null,
          userImg: null,
        })
      );
    }
  }, [dispatch]);

  return (
    <>
      <Toast />
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
