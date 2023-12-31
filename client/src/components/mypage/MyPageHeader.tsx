import { useState } from 'react';
import { setting, settingHover } from '@/assets/mypage';
import { logout } from '@/common/api/authApi';
import { useAppDispatch } from '@/hooks/useReducer';
import userSlice from '@/reducer/userSlice';
import { useNavigate } from 'react-router-dom';
import { profile } from '@/assets/mypage/index';

interface MyPageHeaderProps {
  imageUrl?: string;
  cash?: number;
  openModal: () => void;
}

function MyPageHeader({ cash, imageUrl, openModal }: MyPageHeaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogOutClick = () => {
    const ok = confirm('로그아웃 하시겠습니까?');
    if (ok) {
      logout();
      dispatch(userSlice.actions.logOut());
      navigate('/');
    }
  };

  const formattedCash = cash ? cash.toLocaleString() : '0';

  return (
    <>
      <div className='flex flex-row items-center justify-around h-full'>
        <div>
          <p className='text-sm text-gray-100'>보유금액</p>
          <div className='flex flex-row'>
            <p className='text-4xl font-bold text-gray-100'>{formattedCash}</p>
            <p className='flex items-end text-gray-100 ml-10pxr'>원</p>
          </div>
        </div>
        <div className='flex flex-row'>
          <button className='text-gray-100 mr-10pxr' onClick={openModal}>
            프로필 수정
          </button>
          <p className='text-gray-100 mr-10pxr'>|</p>
          <button className='text-gray-100' onClick={onLogOutClick}>
            로그아웃
          </button>
        </div>
      </div>
      <div className='absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-180pxr'>
        <img
          className='object-cover overflow-hidden bg-gray-100 rounded-full w-120pxr h-120pxr'
          src={imageUrl ? imageUrl : profile}
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
