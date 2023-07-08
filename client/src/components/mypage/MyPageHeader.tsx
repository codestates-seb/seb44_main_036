import { useState } from 'react';
import { setting, settingHover } from '@/assets/mypage';

interface MyPageHeaderProps {
  imageUrl: string;
  openModal: () => void;
}

function MyPageHeader({ imageUrl, openModal }: MyPageHeaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <div className='flex flex-row items-center justify-end h-full'>
        <button className='text-gray-100 mr-10pxr' onClick={openModal}>
          프로필 수정
        </button>
        <p className='text-gray-100 mr-10pxr'>|</p>
        <button className='text-gray-100 mr-320pxr'>로그아웃</button>
      </div>
      <div className='absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-110pxr'>
        <img
          className='object-cover overflow-hidden bg-gray-100 rounded-full w-120pxr h-120pxr'
          src={imageUrl}
          alt={imageUrl}
        />
        <button
          className='absolute text-gray-400 bg-white rounded-full flex-center left-90pxr w-30pxr h-30pxr top-90pxr hover:text-purple-300'
          onClick={openModal}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={isHovered ? settingHover : setting} alt='setting'></img>
        </button>
      </div>
    </>
  );
}

export default MyPageHeader;
