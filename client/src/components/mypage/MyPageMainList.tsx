import { MyPageMainItem } from '.';
// import useSWR from 'swr';
// import axios from 'axios';

// const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function MyPageMainList() {
  // 유저 정보 프롭스로 가져와야함, 프로젝트 정보 받아올것 타입 지정할 것
  // const { data: mainProjects, error: mainProjectsError } = useSWR<IProject[]>(
  //   user
  //     ? user.accountType === 'seller'
  //       ? `서버 url/selling-projects/${userId}`
  //       : `서버 url/funded-projects/${userId}`
  //     : null,
  //   fetcher
  // );
  return (
    <section className='grid-auto max-w-[1280px] mx-auto'>
      <MyPageMainItem />
      <MyPageMainItem />
      <MyPageMainItem />
    </section>
  );
}

export default MyPageMainList;
