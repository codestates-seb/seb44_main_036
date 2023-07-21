import { useMemo } from 'react';
import { useAppSelector } from '@/hooks/useReducer';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../ui';
import { profile } from '@/assets/mypage/index';

function UserNav() {
  const navigate = useNavigate();
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const userData = useAppSelector((state) => state.user.data);

  const userProfileImg = useMemo(() => userData?.userImg || profile, [userData]);

  const onProjectAddClick = () => {
    if (isLogin) {
      navigate('/project/add');
    } else {
      const ok = confirm('로그인이 필요한 서비스 입니다.');
      if (ok) {
        navigate('/users/login');
      }
    }
  };

  return (
    <nav className='flex-center ellipsis'>
      {isLogin ? (
        <Link
          to='/mypage'
          className='overflow-hidden bg-gray-400 rounded-full h-35pxr w-35pxr mr-20pxr'
        >
          <img src={userProfileImg} alt='유저' />
        </Link>
      ) : (
        <>
          <Link to='/users/login' className='text-gray-800 px-10pxr hover:text-purple-300'>
            로그인
          </Link>
          <Link to='/users/signup' className='text-gray-800 px-10pxr hover:text-purple-300'>
            회원가입
          </Link>
        </>
      )}
      <Button
        onClick={onProjectAddClick}
        text={'프로젝트 만들기'}
        style={'text-sm ml-7pxr h-35pxr px-20pxr py-8pxr'}
      />
    </nav>
  );
}

export default UserNav;
