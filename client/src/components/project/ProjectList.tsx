import { Link } from 'react-router-dom';
import { ProjectItem } from '.';
import type { Projects } from '@/common/types/responseTypes';
import useSWR from 'swr';
import { projectApi } from '@/common/api/api';

function ProjectList() {
  const { data: projectList } = useSWR<Projects>('/projects', projectApi.getProjects);
  console.log(projectList);

  return (
    <section className='grid-auto max-w-[1280px] mx-auto'>
      {projectList?.map((project) => (
        <Link to={`/project/${project.projectId}`} key={project.projectId}>
          <ProjectItem project={project} />
        </Link>
      ))}
    </section>
  );
}

export default ProjectList;
