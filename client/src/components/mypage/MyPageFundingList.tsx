import type { Projects } from '@/common/types/responseTypes';
import useSWR from 'swr';
import { userApi } from '@/common/api/api';
import { Link } from 'react-router-dom';
import { MyPageFundingItem } from '.';

interface UserModalProps {
  memberId?: string;
}

function MyPageFundingList({ memberId }: UserModalProps) {
  const { data: projectList } = useSWR<Projects>(
    `/members/${memberId}/funding`,
    userApi.getUserProjects
  );

  console.log(projectList);

  return (
    <section className='grid-auto max-w-[1280px] mx-auto'>
      {projectList?.map((project) => (
        <Link to={`/project/${project.projectId}`} key={project.projectId}>
          <MyPageFundingItem project={project} />
        </Link>
      ))}
    </section>
  );
}

export default MyPageFundingList;
