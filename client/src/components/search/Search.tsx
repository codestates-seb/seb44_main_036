import { ReactComponent as SearchIconSvg } from '@/assets/icons/search_icon.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?keyword=${searchTerm}`);
  };

  return (
    <form className='relative w-full' onSubmit={handleSearch}>
      <input
        type='text'
        placeholder='내가 원하는 모든 펀딩이 여기에!'
        className='w-full text-sm border-[1.5px] border-gray-200 border-solid h-35pxr rounded-3xl py-7pxr px-24pxr focus:border-purple-300'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type='submit' disabled={searchTerm.length === 0}>
        <SearchIconSvg className='absolute right-20pxr top-8pxr' />
      </button>
    </form>
  );
}

export default Search;
