import { projectApi } from '@/common/api/api';
import { Projects } from '@/common/types/responseTypes';
import { ProjectItem } from '@/components/project';
import { Strong } from '@/components/ui';
import { Link, useSearchParams } from 'react-router-dom';
import useSWRImmutable from 'swr';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const searchWord = searchParams.get('q');

  const { data: projectList } = useSWRImmutable<Projects>(
    // `/search?q=${searchWord}`,
    '/projects',
    projectApi.getProjects,
    {
      dedupingInterval: Infinity,
    }
  );

  return (
    <main className='flex flex-col items-center w-full mx-auto max-w-7xl'>
      <div className='flex items-end w-full mt-40pxr mb-32pxr'>
        <h3 className='text-2xl font-semibold text-gray-700 mr-10pxr'>
          <Strong text={searchWord || ''} style='mr-5pxr' />
          검색결과
        </h3>
        <p className='font-medium '>
          {projectList ? projectList?.length : 0}
          <span> 개</span>
        </p>
      </div>
      <section className='w-full mx-auto grid-auto'>
        {projectList?.map((project) => (
          <Link to={`/project/${project.projectId}`} key={project.projectId}>
            <ProjectItem project={project} projects={projectList ?? []} />
          </Link>
        ))}
      </section>
    </main>
  );
}

export default SearchPage;
