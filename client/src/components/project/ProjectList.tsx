import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ProjectItem } from '.';
import type { Projects } from '@/common/types/responseTypes';
import useSWRImmutable from 'swr';
import { projectApi } from '@/common/api/api';
import { useCallback, useEffect, useState } from 'react';
import { isPastDeadline } from '@/common/utils';
import { Empty } from '../ui';
import { useAppSelector } from '@/hooks/useReducer';

type Progress = 'all' | 'ongoing' | 'end';
type Order = 'recent' | 'popular' | 'closing';

function ProjectList() {
  const { categoryId } = useParams();
  const userData = useAppSelector((state) => state.user.data);

  const getProjectsEndpoint = useCallback(() => {
    if (userData) {
      // DESC: 카테고리 구현되어야 함. /projects/login/{memberId}/category/{categoryId}
      if (categoryId) return `/projects/login/${userData.memberId}`;
      else return `/projects/login/${userData.memberId}`;
    } else {
      if (categoryId) return `/projects/category/${categoryId}`;
      else return `/projects`;
    }
  }, [userData, categoryId]);

  const { data: projectList } = useSWRImmutable<Projects>(
    getProjectsEndpoint(),
    projectApi.getProjects,
    {
      dedupingInterval: Infinity,
    }
  );

  const [filteredProjects, setFilteredProjects] = useState(projectList);
  const [searchParams] = useSearchParams();

  const filterByProgress = useCallback((data: Projects, progress: Progress) => {
    if (progress === 'all') return data;
    return data.filter((item) =>
      progress === 'end' ? isPastDeadline(item.expiredDate) : !isPastDeadline(item.expiredDate)
    );
  }, []);

  const sortByOrder = useCallback((dataList: Projects, order: Order) => {
    const now = new Date().getTime();
    switch (order) {
      case 'recent':
        return dataList.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case 'popular':
        return dataList.sort((a, b) => b.view - a.view);
      case 'closing':
        return dataList
          .filter((item) => new Date(item.expiredDate).getTime() > now)
          .sort((a, b) => new Date(a.expiredDate).getTime() - new Date(b.expiredDate).getTime());
    }
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      if (!projectList) return;
      const progress: Progress = (searchParams.get('progress') as Progress) || 'all';
      const order: Order = (searchParams.get('order') as Order) || 'recent';

      let filteredList = filterByProgress(projectList, progress);
      filteredList = sortByOrder(filteredList, order);

      setFilteredProjects(filteredList);
    };
    applyFilters();
  }, [projectList, searchParams, sortByOrder, filterByProgress]);

  if (!filteredProjects || filteredProjects.length === 0) return <Empty />;

  return (
    <section className='grid-auto max-w-[1280px] mx-auto'>
      {filteredProjects.map((project) => (
        <Link to={`/project/${project.projectId}`} key={project.projectId}>
          <ProjectItem
            project={project}
            projects={projectList ?? []}
            endpoint={getProjectsEndpoint()}
          />
        </Link>
      ))}
    </section>
  );
}

export default ProjectList;
