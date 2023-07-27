import { useParams } from 'react-router-dom';
import { TuiViewer } from '../editor';
import useSWRImmutable from 'swr';
import { projectApi } from '@/common/api/api';
import { Project } from '@/common/types/responseTypes';

function ProjectDetail() {
  const { projectId } = useParams();

  const { data, isLoading } = useSWRImmutable<Project>(
    `/projects/${projectId}`,
    projectApi.getProject,
    { dedupingInterval: Infinity }
  );

  if (isLoading) return <div>Loading....</div>;

  return (
    <div className='w-[54%]'>
      {/* <div> */}
      <h2 className='text-2xl font-bold mb-40pxr'>프로젝트 상세</h2>
      {data && <TuiViewer content={data.content} />}
    </div>
  );
}

export default ProjectDetail;
