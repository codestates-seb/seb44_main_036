import { Link, useSearchParams } from 'react-router-dom';
import useSWRImmutable from 'swr';

import { ProjectItem } from '../project';
import { userApi } from '@/common/api/api';
import { Projects } from '@/common/types/responseTypes';
import { Empty } from '../ui';

type Props = {
  memberId: number;
};

function MyProjectList({ memberId }: Props) {
  const [searchParams] = useSearchParams({ tab: 'project' });
  const tabMenu = searchParams.get('tab');

  const { data: projectList } = useSWRImmutable<Projects>(
    `/members/${memberId}${tabMenu && `/${tabMenu}`}`,
    userApi.getUserProjects,
    { dedupingInterval: Infinity }
  );

  return (
    <>
      {projectList && 0 < projectList.length ? (
        <article className='w-full mx-auto grid-auto'>
          {projectList?.map((project) => (
            <Link to={`/project/${project.projectId}`} key={project.projectId}>
              <ProjectItem project={project} projects={projectList} />
            </Link>
          ))}
        </article>
      ) : (
        <Empty />
      )}
    </>
  );
}

export default MyProjectList;
