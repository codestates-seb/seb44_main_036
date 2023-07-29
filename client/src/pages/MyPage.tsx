import { useAppSelector } from '@/hooks/useReducer';
import { MyPageHeader, UserProfile } from '@/components/mypage';
import { useEffect, useState } from 'react';
import { UserModal } from '@/components/usermodal';
import ScrollUpButton from '@/components/ui/ScrollUpButton';
import MyProjectList from '@/components/mypage/MyProjectList';
import MyTabs from '@/components/mypage/MyTabs';

function MyPage() {
  const userData = useAppSelector((state) => state.user.data);
  const memberId = userData?.memberId;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState<string | null>(userData?.address || null);
  const [nickname, setNickname] = useState<string | undefined>(userData?.nickname);

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

  useEffect(() => {
    if (userData) {
      setAddress(userData.address || null);
      setNickname(userData.nickname);
    }
  }, [userData]);

  return (
    <>
      <div className='w-full bg-purple-300 mb-80pxr h-120pxr'>
        <MyPageHeader imageUrl={userData?.userImg} cash={userData?.cash} openModal={openModal} />
      </div>
      <div className='flex-col font-thin flex-center'>
        <UserProfile nickname={nickname} />
      </div>
      <section className='flex flex-col justify-between max-w-[1280px] mx-auto mb-25pxr'>
        <MyTabs />
        {memberId && <MyProjectList memberId={memberId} />}
      </section>
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
      <ScrollUpButton />
    </>
  );
}

export default MyPage;
