import { useState, useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

import { ReactComponent as SearchIconSvg } from '@/assets/icons/search_icon.svg';

function SearchInput() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const isSearch = useMatch('/search*');
  const isNavigate = useMatch('/*');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSearchNavigate = () => {
    navigate(`/search?q=${inputValue}`);
  };

  const onEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearchNavigate();
    }
  };

  useEffect(() => {
    if (!isSearch) {
      setInputValue('');
    }
  }, [isNavigate]);

  return (
    <div className='relative flex w-full max-w-3xl '>
      <input
        type='text'
        placeholder='내가 원하는 모든 펀딩이 여기에!'
        className='w-full text-sm border-[1.5px] border-gray-200 border-solid h-35pxr rounded-3xl py-7pxr px-24pxr focus:border-purple-300'
        onChange={handleInputChange}
        value={inputValue}
        onKeyDown={onEnterHandler}
      />
      <SearchIconSvg className='absolute right-20pxr top-8pxr' onClick={onSearchNavigate} />
    </div>
  );
}

export default SearchInput;
