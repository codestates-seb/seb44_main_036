import { Link } from 'react-router-dom';
import { ProjectItem } from '.';
// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import type { Projects } from '@/common/types/responseTypes';
import useSWR from 'swr';
import { projectApi } from '@/common/api/api';

function ProjectList() {
  const { data: projectList } = useSWR<Projects>('/projects', projectApi.getProjects);
  console.log(projectList);

  // const [filteredProjects, setFilteredProjects] = useState([]);
  // const location = useLocation();

  // useEffect(() => {
  //   const query = new URLSearchParams(location.search).get("query");

  // get이 완성 되면 projects를 필터링 하여 서치검색 결과를 뿌린다.
  //   const newFilteredProjects = projects.filter(project =>
  //     project.title.includes(query)
  //   );

  //   setFilteredProjects(newFilteredProjects);
  // }, [location]);

  return (
    <section className='grid-auto max-w-[1280px] mx-auto'>
      {/* {filteredProjects.map((project, index) =>
        <ProjectItem key={index} project={project} />
      )} */}
      {projectList?.map((project) => (
        <Link to={`/project/${project.projectId}`} key={project.projectId}>
          <ProjectItem project={project} />
        </Link>
      ))}
    </section>
  );
}

export default ProjectList;
