import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as LogoSvg } from '@/assets/logos/logo.svg';
import { ReactComponent as SearchIconSvg } from '@/assets/icons/search_icon.svg';
import Button from '../Auth/Button';

function Header() {
  const navigate = useNavigate();
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
          <Link to='/users/login' className='text-gray-800 px-10pxr hover:text-purple-300'>
            로그인
          </Link>
          <Link to='/users/signup' className='text-gray-800 px-10pxr hover:text-purple-300'>
            회원가입
          </Link>
          <Button
            onClick={() => navigate('/project/add')}
            text={'프로젝트 만들기'}
            style={'text-sm ml-7pxr h-35pxr px-20pxr py-8pxr'}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
