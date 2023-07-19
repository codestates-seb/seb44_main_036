import { ProjectItem } from '.';
// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

function ProjectList() {
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
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
    </section>
  );
}

export default ProjectList;
