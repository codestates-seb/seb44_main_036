import { Link, useNavigate } from 'react-router-dom';

import { ReactComponent as LogoSvg } from '@/assets/logos/logo.svg';
import { ReactComponent as SearchIconSvg } from '@/assets/icons/search_icon.svg';
import Button from '../ui/Button';
import { useAppSelector } from '@/hooks/useReducer';

function Header() {
  const navigate = useNavigate();
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const userData = useAppSelector((state) => state.user.data);

  const onProjectAddClick = () => {
    navigate('/project/add');
  };

  return (
    <header className='flex-center h-62pxr'>
      <div className='flex items-center justify-between w-full max-w-7xl'>
        <Link to='/' className='flex-center mr-20pxr'>
          <LogoSvg className='h-30pxr w-165pxr' />
        </Link>
        <div className='relative flex w-full max-w-3xl '>
          <input
            type='text'
            placeholder='내가 원하는 모든 펀딩이 여기에!'
            className='w-full text-sm border-[1.5px] border-gray-200 border-solid h-35pxr rounded-3xl py-7pxr px-24pxr focus:border-purple-300'
          />
          <SearchIconSvg className='absolute right-20pxr top-8pxr' />
        </div>
        <div className='flex-center ellipsis'>
          {isLogin ? (
            <Link
              to='/mypage'
              className='overflow-hidden bg-gray-400 rounded-full h-35pxr w-35pxr mr-20pxr'
            >
              <img
                src={
                  userData?.userImg
                    ? userData.userImg
                    : 'https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-6/301699229_495029505958367_2122837022415143500_n.jpg?_nc_cat=108&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=8fX5M9O1SbMAX-n-qiV&_nc_ht=scontent-gmp1-1.xx&oh=00_AfAHUTKiZrB-LKlTbaCvEDDB5k3mwj-M97Y65Rdn7DXTCw&oe=64AFC6D7'
                }
                alt='유저'
              />
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
        </div>
      </div>
    </header>
  );
}

export default Header;
