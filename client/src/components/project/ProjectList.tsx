import { Link } from 'react-router-dom';
import { ProjectItem } from '.';
import type { Projects } from '@/common/types/responseTypes';

type Props = {
  projectList: Projects;
};

function ProjectList({ projectList }: Props) {
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
