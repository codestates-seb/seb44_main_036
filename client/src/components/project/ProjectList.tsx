import { Link, useSearchParams } from 'react-router-dom';
import { ProjectItem } from '.';
import type { Projects } from '@/common/types/responseTypes';
import useSWR from 'swr';
import { projectApi } from '@/common/api/api';
import { useCallback, useEffect, useState } from 'react';
import { isPastDeadline } from '@/common/utils';

type Progress = 'all' | 'ongoing' | 'end';
type Order = 'recent' | 'popular' | 'closing';

function ProjectList() {
  const { data: projectList } = useSWR<Projects>('/projects', projectApi.getProjects);
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
        return dataList;
      case 'popular':
        // TODO: 좋아요 기능 개발 후 구현
        return dataList;
      case 'closing':
        return dataList
          .filter((item) => new Date(item.expiredDate).getTime() > now)
          .sort((a, b) => new Date(a.expiredDate).getTime() - new Date(b.expiredDate).getTime());
      default:
        return dataList;
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

  return (
    <section className='grid-auto max-w-[1280px] mx-auto'>
      {filteredProjects?.map((project) => (
        <Link to={`/project/${project.projectId}`} key={project.projectId}>
          <ProjectItem project={project} />
        </Link>
      ))}
    </section>
  );
}

export default ProjectList;
