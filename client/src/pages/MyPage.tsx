import { useEffect, useState } from 'react';
import {
  UserProfile,
  MyPageHeader,
  TabButton,
  MyPageLikeList,
  MyPageMainList,
  MyPageFundingList,
} from '@/components/mypage';
import { UserModal } from '@/components/usermodal';
import { useAppSelector } from '@/hooks/useReducer';
import ScrollUpButton from '@/components/ui/ScrollUpButton';

function MyPage() {
  const userData = useAppSelector((state) => state.user.data);
  const memberId = userData?.memberId;

  const [tab, setTab] = useState<'sell' | 'buy' | 'liked'>('sell');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState<string | null>(userData?.address || null);
  const [nickname, setNickname] = useState<string | undefined>(userData?.nickname);

  useEffect(() => {
    if (userData) {
      setAddress(userData.address || null);
      setNickname(userData.nickname);
    }
  }, [userData]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveUser = (newNickname: string, newAddress: string) => {
    setNickname(newNickname);
    setAddress(newAddress);
    closeModal();
  };

  return (
    <>
      <div className='flex-col'>
        <div className='w-full bg-purple-300 mb-80pxr h-120pxr'>
          <MyPageHeader imageUrl={userData?.userImg} cash={userData?.cash} openModal={openModal} />
        </div>

        <div className='flex-col font-thin flex-center'>
          <UserProfile nickname={nickname} />
        </div>

        <div>
          <div className='flex items-center justify-center mb-50pxr'>
            <TabButton activeTab={tab} setTab={setTab} />
          </div>
          {tab === 'sell' && <MyPageMainList memberId={memberId}></MyPageMainList>}
          {tab === 'buy' && <MyPageFundingList memberId={memberId}></MyPageFundingList>}
          {tab === 'liked' && <MyPageLikeList memberId={memberId}></MyPageLikeList>}
        </div>

        {isModalOpen && (
          <UserModal
            memberId={memberId}
            imageUrl={userData?.userImg}
            nickname={nickname}
            address={address}
            onClose={closeModal}
            onSave={saveUser}
          />
        )}
      </div>
      <ScrollUpButton></ScrollUpButton>
    </>
  );
}

export default MyPage;
