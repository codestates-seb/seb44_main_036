// import useSWR from 'swr';
// import axios from 'axios';
import UserModal from '@/components/UserModal/UserModal';
import { useState } from 'react';
import { IoMdSettings } from 'react-icons/io';

interface IUser {
  imageUrl: string;
  nickname: string;
  path: string;
  accountType: 'seller' | 'buyer';
  address: string | null;
}

interface IProject {
  id: number;
  name: string;
}

// 임시 사용자 데이터
const user: IUser = {
  imageUrl: '/test.svg',
  nickname: '신일전자',
  path: 'google',
  accountType: 'seller',
  address: '(06931) 경상남도 김해시....',
};

// 임시 프로젝트 데이터
const sellingProjects: IProject[] = [
  { id: 1, name: 'Selling Project 1' },
  { id: 2, name: 'Selling Project 2' },
];

const fundedProjects: IProject[] = [
  { id: 1, name: 'Funded Project 1' },
  { id: 2, name: 'Funded Project 2' },
];

// 임시 좋아요 데이터
const likedProjects: IProject[] = [
  { id: 1, name: 'Liked Project 1' },
  { id: 2, name: 'Liked Project 2' },
];
// const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const MyPage: React.FC<{ userId: string }> = (/*{ userId }*/) => {
  const [tab, setTab] = useState<'main' | 'liked'>('main');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState<string | null>(user.address);

  const mainProjects = user.accountType === 'seller' ? sellingProjects : fundedProjects;
  const projects = tab === 'main' ? mainProjects : likedProjects;

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
      <div className='flex-col w-full flex-center'>
        <div className='w-full bg-purple-300 mb-80pxr h-120pxr'>
          <div className='absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-110pxr'>
            <img
              className='overflow-hidden bg-black rounded-full w-120pxr h-120pxr'
              src={user.imageUrl}
              alt={user.nickname}
            />
            <button
              className='absolute text-gray-400 bg-white rounded-full flex-center left-90pxr w-30pxr h-30pxr top-90pxr hover:text-purple-300'
              onClick={openModal}
            >
              <IoMdSettings size='24'></IoMdSettings>
            </button>
          </div>
        </div>

        <div className='flex flex-row text-4xl font-thin'>
          <h1 className='text-4xl font-bold mb-10pxr'>{user.nickname}</h1>
          <p>&nbsp;님</p>
        </div>
        <p className='text-purple-300 mb-100pxr'>
          {user.accountType === 'seller' ? '판매자 회원' : '구매자 회원'}
        </p>

        <div>
          <div className='flex items-center justify-center mb-50pxr'>
            <button
              className={`text-3xl font-semibold ${
                tab === 'main' ? 'text-purple-300 active' : 'text-gray-400 hover:text-purple-300'
              } relative mr-50pxr`}
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
          {projects.map((project) => (
            <div key={project.id}>
              <h2>{project.name}</h2>
            </div>
          ))}
        </div>
        {isModalOpen && (
          <div className='fixed z-50 flex-center bottom-410pxr'>
            <UserModal
              imageUrl={user.imageUrl}
              nickname={user.nickname}
              accountType={user.accountType}
              address={address}
              onClose={closeModal}
              onSave={saveAddress}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MyPage;
