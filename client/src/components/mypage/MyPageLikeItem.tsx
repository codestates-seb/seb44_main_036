import { projectApi } from '@/common/api/api';
import { Patch, Like } from '../ui';
import type { Project, Projects } from '@/common/types/responseTypes';
import { dday, formattingNumber, calculateAchievementRate, handleImageError } from '@/common/utils';
import { mutate } from 'swr';
import { LikeHandler } from '../project/ProjectItem';

type Props = {
  project: Project;
  projects: Projects;
};

function MyPageLikeItem({ project, projects }: Props) {
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

  const handleHeartClick: LikeHandler = async (e) => {
    e.preventDefault();

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

      // Update the project list based on whether it was liked or unliked
      let updatedProjects;
      if (updatedLikedProject === 0) {
        // Unliked
        updatedProjects = projects.filter((project) => project.projectId !== projectId);
      } else {
        // Liked
        updatedProjects = [...projects, updatedProject];
      }

      mutate(`/members/${memberId}/like`, updatedProjects, false);
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

export default MyPageLikeItem;
