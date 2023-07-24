import { useEffect, useState } from 'react';
import {
  UserProfile,
  MyPageHeader,
  TabButton,
  MyPageLikeList,
  MyPageMainList,
} from '@/components/mypage';
import { UserModal } from '@/components/usermodal';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useReducer';
import { storage } from '@/common/utils/storage';
// import { userApi } from '@/common/api/api';
// import useSWR from 'swr';

interface IUser {
  imageUrl: string;
  path: string;
  accountType: 'seller' | 'buyer';
  address: string;
  cash: string;
}

// 임시 사용자 데이터
const user: IUser = {
  imageUrl: '/test.svg',
  path: 'google',
  accountType: 'buyer',
  address: '(06931) 경상남도 김해시....',
  cash: '',
};

function MyPage() {
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.user.data);
  // const isLogin = useAppSelector((state) => state.user.isLogin);
  const memberId = userData?.memberId;
  // const { data } = useSWR(memberId, userApi.getUserLikedProjects);
  // console.log(data);

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

  useEffect(() => {
    const accessToken = storage.get('accessToken');
    if (!accessToken) {
      navigate('/users/login');
    }
  }, [navigate]);

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

  // 서버 API 구현 후 추가 될 코드
  // const { data: user, error: userError } = useSWR<IUser>(
  //   `서버 url/users/${userId}`,
  //   fetcher
  // );
  // const { data: mainProjects, error: mainProjectsError } = useSWR<IProject[]>(
  //   user
  //     ? user.accountType === 'seller'
  //       ? `서버 url/selling-projects/${userId}`
  //       : `서버 url/funded-projects/${userId}`
  //     : null,
  //   fetcher
  // );
  // const { data: likedProjects, error: likedProjectsError } = useSWR<IProject[]>(`서버 url/users/${userId}/like`, fetcher);

  // if (userError || projectsError) {
  //   return <div>서버에러: {userError?.message ?? projectsError?.message}</div>;
  // }

  // if (!user || !projects) {
  //   return <div>로딩중...</div>;
  // }

  console.log(userData);

  return (
    <>
      <div className='flex-col'>
        <div className='w-full bg-purple-300 mb-80pxr h-120pxr'>
          <MyPageHeader imageUrl={userData?.userImg} cash={userData?.cash} openModal={openModal} />
        </div>

        <div className='flex-col font-thin flex-center'>
          <UserProfile nickname={nickname} accountType={user.accountType} />
        </div>

        <div>
          <div className='flex items-center justify-center mb-50pxr'>
            <TabButton activeTab={tab} setTab={setTab} />
          </div>
          {tab === 'sell' && <MyPageMainList></MyPageMainList>}
          {tab === 'buy' && <MyPageMainList></MyPageMainList>}
          {tab === 'liked' && <MyPageLikeList></MyPageLikeList>}
        </div>

        {isModalOpen && (
          <UserModal
            memberId={memberId}
            imageUrl={userData?.userImg}
            nickname={nickname}
            accountType={user.accountType}
            address={address}
            onClose={closeModal}
            onSave={saveUser}
          />
        )}
      </div>
    </>
  );
}

export default MyPage;
