import { Link } from 'react-router-dom';

import { ReactComponent as LogoSvg } from '@/assets/logos/logo.svg';
import { ReactComponent as SearchIconSvg } from '@/assets/icons/search_icon.svg';
import UserNav from './UserNav';

function Header() {
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
        <UserNav />
      </div>
    </header>
  );
}

export default Header;