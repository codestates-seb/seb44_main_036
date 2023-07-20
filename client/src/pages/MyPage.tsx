import { useState } from 'react';
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
import { userApi } from '@/common/api/api';
import useSWR from 'swr';

interface IUser {
  imageUrl: string;
  nickname: string;
  path: string;
  accountType: 'seller' | 'buyer';
  address: string | null;
}

// 임시 사용자 데이터
const user: IUser = {
  imageUrl: '/test.svg',
  nickname: '신일전자',
  path: 'google',
  accountType: 'seller',
  address: '(06931) 경상남도 김해시....',
};

// const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function MyPage() {
  const [tab, setTab] = useState<'main' | 'liked'>('main');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState<string | null>(user.address);
  const [nickname, setNickname] = useState<string>(user.nickname);
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.user.data);
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const memberId = userData?.memberId;
  const { data } = useSWR(memberId, userApi.getUser); // Assign the fetched data to the 'data' variable
  console.log(data);

  if (!isLogin) {
    alert('로그인이 필요합니다.');
    navigate('/login');
  }

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

  return (
    <>
      <div className='flex-col'>
        <div className='w-full bg-purple-300 mb-80pxr h-120pxr'>
          <MyPageHeader imageUrl={userData?.userImg} openModal={openModal} />
        </div>

        <div className='flex-col font-thin flex-center'>
          <UserProfile nickname={userData?.nickname} accountType={user.accountType} />
        </div>

        <div>
          <div className='flex items-center justify-center mb-50pxr'>
            <TabButton activeTab={tab} setTab={setTab} userAccountType={user.accountType} />
          </div>
          {tab === 'main' && <MyPageMainList></MyPageMainList>}
          {tab === 'liked' && <MyPageLikeList></MyPageLikeList>}
        </div>

        {isModalOpen && (
          <UserModal
            imageUrl={userData?.userImg}
            nickname={userData?.nickname}
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
