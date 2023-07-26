import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ProjectItem } from '.';
import type { Projects } from '@/common/types/responseTypes';
import useSWRImmutable from 'swr';
import { projectApi } from '@/common/api/api';
import { useCallback, useEffect, useState } from 'react';
import { isPastDeadline } from '@/common/utils';
import { Empty } from '../ui';

type Progress = 'all' | 'ongoing' | 'end';
type Order = 'recent' | 'popular' | 'closing';

function ProjectList() {
  const { categoryId } = useParams();

  const { data: projectList } = useSWRImmutable<Projects>(
    `/projects${categoryId ? `/category/${categoryId}` : ''}`,
    projectApi.getProjects,
    { dedupingInterval: Infinity }
  );

  const [filteredProjects, setFilteredProjects] = useState<Projects>();
  const [searchParams] = useSearchParams({ progress: 'all', order: 'recent' });

  const filterByProgress = useCallback((data: Projects, progress: Progress) => {
    if (progress === 'all') return [...data].sort((a, b) => b.projectId - a.projectId);
    return data.filter(({ expiredDate }) =>
      progress === 'end' ? isPastDeadline(expiredDate) : !isPastDeadline(expiredDate)
    );
  }, []);

  const sortByOrder = useCallback((data: Projects, order: Order) => {
    const now = new Date().getTime();
    switch (order) {
      case 'recent':
        return [...data].sort((a, b) => b.projectId - a.projectId);
      case 'popular':
        return [...data].sort((a, b) => b.view - a.view);
      case 'closing':
        return [...data]
          .filter((item) => new Date(item.expiredDate).getTime() > now)
          .sort((a, b) => new Date(a.expiredDate).getTime() - new Date(b.expiredDate).getTime());
    }
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      if (!projectList) return;
      const progress: Progress = searchParams.get('progress') as Progress;
      const order: Order = searchParams.get('order') as Order;

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
          <ProjectItem project={project} projects={filteredProjects} />
        </Link>
      ))}
    </section>
  );
}

export default ProjectList;
