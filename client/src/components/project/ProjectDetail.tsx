import { useParams } from 'react-router-dom';
import { TuiViewer } from '../editor';
import useSWR from 'swr';
import { projectApi } from '@/common/api/api';
import { useCallback } from 'react';
import { useAppSelector } from '@/hooks/useReducer';

function ProjectDetail() {
  const { projectId } = useParams();
  const userData = useAppSelector((state) => state.user.data);

  const getProjectEndpoint = useCallback(() => {
    if (userData) return `/projects/${projectId}/${userData.memberId}`;
    else return `/projects/${projectId}`;
  }, [userData, projectId]);

  const { data, isLoading } = useSWR(getProjectEndpoint(), projectApi.getProject);

  if (isLoading) return <div>Loading....</div>;

  return (
    <div className='w-[54%]'>
      {/* <div> */}
      <h2 className='text-2xl font-bold mb-40pxr'>프로젝트 상세</h2>
      <TuiViewer content={data?.content} />
    </div>
  );
}

export default ProjectDetail;
