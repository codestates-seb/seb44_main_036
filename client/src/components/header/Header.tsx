import { Link } from 'react-router-dom';

import { ReactComponent as LogoSvg } from '@/assets/logos/logo.svg';
import UserNav from './UserNav';
import SearchInput from './SearchInput';

function Header() {
  return (
    <header className='flex-center h-62pxr'>
      <div className='flex items-center justify-between w-full max-w-7xl'>
        <Link to='/' className='flex-center mr-20pxr'>
          <LogoSvg className='h-30pxr w-165pxr' />
        </Link>
        <SearchInput />
        <UserNav />
      </div>
    </header>
  );
}

export default Header;
