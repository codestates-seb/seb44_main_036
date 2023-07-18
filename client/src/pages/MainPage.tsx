import { ProjectList, ProjectHeader } from '@/components/project';
import { CategoryList } from '@/components/category';
import { Carousel } from '@/components/carousel';
import { projectApi } from '@/common/api/api';
import useSWR from 'swr';
import type { Projects } from '@/common/types/responseTypes';

function MainPage() {
  const { data: projectList } = useSWR<Projects>('/projects', projectApi.getProjects);

  return (
    <>
      <Carousel />
      <CategoryList />
      <ProjectHeader />
      {projectList && <ProjectList projectList={projectList} />}
    </>
  );
}

export default MainPage;
