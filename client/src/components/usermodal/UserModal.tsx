import { useState } from 'react';
import {
  resign,
  resignHover,
  exit,
  exitHover,
  update,
  setting,
  settingHover,
} from '@/assets/mypage';
import { DaumPostcodeButton } from '.';
import { profile } from '@/assets/mypage/index';
import { userApi } from '@/common/api/api';
import { AxiosError } from 'axios';

interface UserModalProps {
  memberId?: string;
  imageUrl?: string;
  nickname?: string;
  accountType: 'seller' | 'buyer';
  address: string | null;
  onClose: () => void;
  onSave: (nickname: string, address: string) => void;
}

interface PostcodeData {
  zonecode: string;
  address: string;
}

function UserModal({
  memberId,
  imageUrl,
  // accountType,
  nickname,
  address,
  onClose,
  onSave,
}: UserModalProps) {
  const [newAddress, setNewAddress] = useState<string>(address || '');
  const [newNickname, setNewNickname] = useState<string>(nickname || '');
  const [IsExitHovered, setIsExitHovered] = useState(false);
  const [isResignHovered, setisResignHovered] = useState(false);
  const [isSettingHovered, setisSettingHovered] = useState(false);
  const [editingNickname, setEditingNickname] = useState(false);
  const [previewImage, setPreviewImage] = useState(imageUrl ? imageUrl : profile);
  const [error, setError] = useState<string | null>(null);

  const handleAddressChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewAddress(event.target.value);
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(event.target.value);
  };

  console.log(address);

  const handleSave = async () => {
    try {
      if (!memberId) {
        console.error('memberId가 유효하지 않습니다.');
        return;
      }

      // 수정할 사용자 정보
      const updatedUserData = {
        nickname: newNickname,
        address: newAddress,
        // imageUrl: previewImage ? previewImage : imageUrl,
      };

      // PATCH 요청 보내기
      await userApi.updateUser(memberId, updatedUserData);

      // 데이터 업데이트
      onSave(newNickname, newAddress);

      window.alert('사용자 정보가 업데이트되었습니다.');
      setError(null);
    } catch (err) {
      // Error handling
      if (err instanceof AxiosError && err.response && err.response.status === 400) {
        setError('요청이 잘못되었습니다. 올바른 형식으로 입력해주세요.'); // Set error message
        window.alert('올바른 닉네임을 작성해주세요.');
      } else {
        // Other error handling
        console.error('사용자 정보 업데이트 오류:', err);
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleClickImageUpload = () => {
    const input = document.getElementById('image-upload');
    if (input) {
      input.click();
    }
  };

  const handleSelectedAddress = (data: PostcodeData) => {
    setNewAddress(data.address);
  };

  return (
    <>
      <div className='fixed z-50 w-full h-full bg-black bg-opacity-50 top-1pxr flex-center'>
        <div className='bg-white rounded-lg w-700pxr h-600pxr'>
          <div className='flex-center mt-20pxr mb-20pxr'>
            <div className='absolute'>
              <button
                className='absolute flex-center right-200pxr bottom-10pxr w-100pxr'
                onMouseEnter={() => setisResignHovered(true)}
                onMouseLeave={() => setisResignHovered(false)}
              >
                <img
                  className='w-20pxr'
                  src={isResignHovered ? resignHover : resign}
                  alt='resign'
                ></img>
                <p
                  className={` ml-10pxr text-sm ${
                    isResignHovered ? 'text-gray-800' : 'text-gray-600'
                  }`}
                >
                  회원탈퇴
                </p>
              </button>
            </div>
            <img
              className='object-cover overflow-hidden bg-gray-100 rounded-full flex-center w-120pxr h-120pxr'
              src={previewImage}
              alt={nickname}
            />
            <div className='absolute'>
              <button
                className='absolute text-purple-300 bg-white rounded-full flex-center left-30pxr w-30pxr h-30pxr top-30pxr'
                onClick={handleClickImageUpload}
                onMouseEnter={() => setisSettingHovered(true)}
                onMouseLeave={() => setisSettingHovered(false)}
              >
                <img src={isSettingHovered ? settingHover : setting} alt='settingHover'></img>
              </button>
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

          <div className='flex-row text-4xl font-thin flex-center mb-60pxr'>
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
          <div className='relative flex-center'>
            <textarea
              className='border border-gray-300 rounded resize-none p-20pxr w-600pxr h-200pxr'
              value={newAddress}
              onChange={handleAddressChange}
              placeholder='주소를 입력해주세요'
            />
            <div className='absolute right-60pxr bottom-10pxr'>
              <DaumPostcodeButton onAddressSelected={handleSelectedAddress} />
            </div>
          </div>
          <div className='justify-end mt-20pxr flex-center'>
            <button
              className='px-4 py-2 text-white bg-purple-300 rounded-3xl h-50pxr w-240pxr'
              onClick={handleSave}
            >
              수정완료
            </button>
          </div>
          <input
            id='image-upload'
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div>
      </div>
    </>
  );
}

export default UserModal;
