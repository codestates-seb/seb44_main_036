import type { Project, Projects } from '@/common/types/responseTypes';
import { projectApi } from '@/common/api/api';
import { Patch, Like } from '../ui';
import { dday, formattingNumber, calculateAchievementRate, handleImageError } from '@/common/utils';
import { mutate } from 'swr';
import { useAppSelector } from '@/hooks/useReducer';
import { useNavigate } from 'react-router-dom';

export type LikeHandler = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;

type Props = {
  project: Project;
  projects: Projects;
  endpoint?: string;
};

function ProjectItem({ project, projects, endpoint }: Props) {
  const {
    currentAmount,
    expiredDate,
    imageUrl,
    targetAmount,
    title,
    likedProject,
    memberId,
    projectId,
  } = project;
  const daysUntilDeadline = dday(new Date(expiredDate));
  const isDueSoon = daysUntilDeadline <= 7;
  const userData = useAppSelector((state) => state.user.data);
  const navigate = useNavigate();

  const handleHeartClick: LikeHandler = async (e) => {
    e.preventDefault();

    if (!userData) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/users/login');
      return;
    }

    await projectApi.likeProject({ memberId, projectId });
    const targetProject = projects.find((project) => project.projectId === projectId);

    if (targetProject) {
      const updatedLikedProject = targetProject.likedProject === 0 ? 1 : 0;
      const updatedLikeCount = targetProject.likeCount + (updatedLikedProject === 0 ? 1 : -1);
      const updatedProject = {
        ...targetProject,
        likedProject: updatedLikedProject,
        likeCount: updatedLikeCount,
      };
      mutate(
        endpoint,
        projects.map((project) => (project.projectId === projectId ? updatedProject : project)),
        false
      );
    }
  };

  return (
    <article className='relative flex flex-col cursor-pointer w-400pxr mb-35pxr'>
      {isDueSoon && <Patch type='alert'>마감임박</Patch>}
      <img
        src={imageUrl}
        alt='기본 이미지'
        className='h-250pxr rounded-xl mb-10pxr'
        onError={handleImageError}
      />
      <Like
        like={likedProject ? true : false}
        position='top-12pxr right-12pxr'
        handleClick={handleHeartClick}
      />
      <div className='flex items-center justify-between'>
        <div className='flex-center'>
          <span className='text-xl font-bold text-purple-300'>
            {formattingNumber(calculateAchievementRate(targetAmount, currentAmount))}% 달성
          </span>
          <span className='text-sm text-gray-500 ml-10pxr'>
            {formattingNumber(currentAmount)} 원
          </span>
        </div>
        <Patch type='deadline'>{`${daysUntilDeadline}일 남음`}</Patch>
      </div>
      <h2 className='text-xl mt-7pxr line-clamp-2'>{title}</h2>
    </article>
  );
}

export default ProjectItem;
