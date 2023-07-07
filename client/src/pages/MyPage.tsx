// import useSWR from 'swr';
// import axios from 'axios';
import UserModal from '@/components/usermodal/UserModal';
import { useState } from 'react';
import { setting, settingHover } from '@/assets/mypage';
import { MyPageLikeList, MyPageMainList } from '@/components/mypage';

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

const MyPage: React.FC<{ userId: string }> = (/*{ userId }*/) => {
  const [tab, setTab] = useState<'main' | 'liked'>('main');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState<string | null>(user.address);
  const [isHovered, setIsHovered] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveAddress = (newAddress: string) => {
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
              src={user.imageUrl}
              alt={user.nickname}
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
        </div>

        <div className='flex flex-row text-4xl font-thin flex-center'>
          <h1 className='text-4xl font-bold mb-10pxr'>{user.nickname}</h1>
          <p>&nbsp;님</p>
        </div>
        <p className='text-purple-300 flex-center mb-100pxr'>
          {user.accountType === 'seller' ? '판매자 회원' : '구매자 회원'}
        </p>

        <div>
          <div className='flex items-center justify-center mb-50pxr'>
            <button
              className={`text-3xl font-semibold ${
                tab === 'main' ? 'text-purple-300 active' : 'text-gray-400 hover:text-purple-300'
              } relative mr-85pxr`}
              onClick={() => setTab('main')}
            >
              {user.accountType === 'seller' ? '판매중인 프로젝트' : '펀딩중인 프로젝트'}
              {tab === 'main' && (
                <span className='absolute transform -translate-x-1/2 bg-purple-300 rounded-full w-8pxr h-8pxr -top-16pxr left-1/2'></span>
              )}
            </button>
            <button
              className={`text-3xl font-semibold ${
                tab === 'liked' ? 'text-purple-300 active' : 'text-gray-400 hover:text-purple-300'
              } relative`}
              onClick={() => setTab('liked')}
            >
              좋아요한 프로젝트
              {tab === 'liked' && (
                <span className='absolute transform -translate-x-1/2 bg-purple-300 rounded-full w-8pxr h-8pxr -top-16pxr left-1/2'></span>
              )}
            </button>
          </div>
          {tab === 'main' && <MyPageMainList></MyPageMainList>}
          {tab === 'liked' && <MyPageLikeList></MyPageLikeList>}
        </div>
        {isModalOpen && (
          <UserModal
            imageUrl={user.imageUrl}
            nickname={user.nickname}
            accountType={user.accountType}
            address={address}
            onClose={closeModal}
            onSave={saveAddress}
          />
        )}
      </div>
    </>
  );
};

export default MyPage;
