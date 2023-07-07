import { MyPageLikeItem } from '.';
// import useSWR from 'swr';
// import axios from 'axios';

// const { data: likedProjects, error: likedProjectsError } = useSWR<IProject[]>(`서버 url/users/${userId}/like`, fetcher);

function MyPageLikeList() {
  return (
    <section className='grid-auto max-w-[1280px] mx-auto'>
      <MyPageLikeItem />
      <MyPageLikeItem />
      <MyPageLikeItem />
    </section>
  );
}

export default MyPageLikeList;
