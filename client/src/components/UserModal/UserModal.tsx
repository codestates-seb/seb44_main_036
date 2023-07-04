import { useState } from 'react';
import { exit, exitHover, update, settingHover } from '@/assets/mypage';

interface UserModalProps {
  imageUrl: string;
  nickname: string;
  accountType: 'seller' | 'buyer';
  address: string | null;
  onClose: () => void;
  onSave: (address: string, nickname: string) => void;
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
  const [isHovered, setIsHovered] = useState(false);
  const [editingNickname, setEditingNickname] = useState(false);

  const handleAddressChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewAddress(event.target.value);
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(event.target.value);
  };

  const handleSave = () => {
    onSave(newAddress, newNickname);
    setEditingNickname(false);
  };

  return (
    <>
      <div className='fixed w-full h-full bg-black bg-opacity-50 flex-center'>
        <div className='bg-white rounded-lg w-700pxr h-600pxr'>
          <div className='flex-center mt-20pxr mb-20pxr'>
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
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img src={isHovered ? exitHover : exit} alt='exit'></img>
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
              className='border border-gray-300 rounded p-20pxr w-500pxr h-200pxr'
              value={newAddress}
              onChange={handleAddressChange}
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
