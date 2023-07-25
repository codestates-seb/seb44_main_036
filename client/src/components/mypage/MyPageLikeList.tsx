import { MyPageLikeItem } from '.';
import type { Projects } from '@/common/types/responseTypes';
import useSWR, { mutate } from 'swr';
import { userApi } from '@/common/api/api';
import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { isPastDeadline } from '@/common/utils';
import { Empty } from '../ui';

type Progress = 'all' | 'ongoing' | 'end';

interface UserModalProps {
  memberId?: string;
}

function MyPageLikeList({ memberId }: UserModalProps) {
  const { data: projectList } = useSWR<Projects>(
    `/members/${memberId}/like`,
    userApi.getUserProjects
  );

  const [filteredProjects, setFilteredProjects] = useState(projectList);

  const filterByProgress = useCallback((data: Projects, progress: Progress) => {
    if (progress === 'all') return data;
    return data.filter((item) =>
      progress === 'end' ? isPastDeadline(item.expiredDate) : !isPastDeadline(item.expiredDate)
    );
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      if (!projectList) return;
      const progress: Progress = 'all'; // update this based on your needs

      const filteredList = filterByProgress(projectList, progress);

      setFilteredProjects(filteredList);
    };
    applyFilters();
  }, [projectList, filterByProgress]);

  if (!filteredProjects || filteredProjects.length === 0) return <Empty />;

  return (
    <section className='grid-auto max-w-[1280px] mx-auto'>
      {filteredProjects.map((project) => (
        <Link to={`/project/${project.projectId}`} key={project.projectId}>
          <MyPageLikeItem project={project} projects={projectList ?? []} />
        </Link>
      ))}
    </section>
  );
}

export default MyPageLikeList;
