import { useState } from 'react';
import { resign, resignHover, exit, exitHover, update, settingHover } from '@/assets/mypage';
// import axios from 'axios';
// import { mutate } from 'swr';

interface UserModalProps {
  imageUrl: string;
  nickname: string;
  accountType: 'seller' | 'buyer';
  address: string | null;
  onClose: () => void;
  onSave: (nickname: string, address: string) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  imageUrl,
  accountType,
  nickname,
  address,
  onClose,
  onSave,
}) => {
  const [newAddress, setNewAddress] = useState(address || '');
  const [newNickname, setNewNickname] = useState(nickname);
  const [IsExitHovered, setIsExitHovered] = useState(false);
  const [isResignHovered, setisResignHovered] = useState(false);
  const [editingNickname, setEditingNickname] = useState(false);

  const handleAddressChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewAddress(event.target.value);
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(event.target.value);
  };

  const handleSave = () => {
    onSave(newNickname, newAddress);
    setEditingNickname(false);
  };

  // API 완성 후 변경 될 코드
  // const handleSave = async () => {
  //   try {
  //     const response = await axios.patch(`/api/users/${userId}`, {
  //       nickname: newNickname,
  //       address: newAddress,
  //     });

  //     if (response.status === 200) {
  //       // When mutate is called with the SWR key and no data,
  //       // it revalidates the data instead of mutating the cache
  //       mutate(`/api/users/${userId}`);
  //       setEditingNickname(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <div className='fixed z-50 w-full h-full bg-black bg-opacity-50 top-1pxr flex-center'>
        <div className='bg-white rounded-lg w-700pxr h-600pxr'>
          <div className='flex-center mt-20pxr mb-20pxr'>
            <div className='absolute'>
              <button
                className='absolute flex flex-center right-150pxr bottom-10pxr'
                onMouseEnter={() => setisResignHovered(true)}
                onMouseLeave={() => setisResignHovered(false)}
              >
                <img src={isResignHovered ? resignHover : resign} alt='resign'></img>
                <p
                  className={`w-120pxr ml-10pxr text-xl ${
                    isResignHovered ? 'text-gray-800' : 'text-gray-600'
                  }`}
                >
                  회원탈퇴
                </p>
              </button>
            </div>
            <img
              className='object-cover overflow-hidden bg-gray-100 rounded-full flex-center w-120pxr h-120pxr'
              src={imageUrl}
              alt={nickname}
            />
            <div className='absolute'>
              <div className='absolute text-purple-300 bg-white rounded-full flex-center left-30pxr w-30pxr h-30pxr top-30pxr'>
                <img src={settingHover} alt='settingHover'></img>
              </div>
              <button
                className='absolute w-30pxr h-30pxr left-300pxr bottom-30pxr'
                onClick={onClose}
                onMouseEnter={() => setIsExitHovered(true)}
                onMouseLeave={() => setIsExitHovered(false)}
              >
                <img src={IsExitHovered ? exitHover : exit} alt='exit'></img>
              </button>
            </div>
          </div>

          <div className='flex-row text-4xl font-thin flex-center mb-30pxr'>
            {editingNickname ? (
              <input
                value={newNickname}
                onChange={handleNicknameChange}
                className='text-xl border border-gray-300 rounded w-400pxr h-60pxr'
              />
            ) : (
              <h1 className='text-4xl font-bold'>{nickname}</h1>
            )}
            <p>&nbsp;님</p>
            <button className='ml-10pxr' onClick={() => setEditingNickname(true)}>
              <img src={update} alt='update'></img>
            </button>
          </div>
          <p className='text-purple-300 flex-center mb-30pxr'>
            {accountType === 'seller' ? '판매자 회원' : '구매자 회원'}
          </p>
          <div className='flex-center'>
            <textarea
              className='border border-gray-300 rounded resize-none p-20pxr w-600pxr h-200pxr'
              value={newAddress}
              onChange={handleAddressChange}
              placeholder='주소를 입력해주세요'
            />
          </div>
          <div className='justify-end mt-20pxr flex-center'>
            <button
              className='px-4 py-2 text-white bg-purple-300 rounded-3xl h-50pxr w-240pxr'
              onClick={handleSave}
            >
              수정완료
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserModal;
