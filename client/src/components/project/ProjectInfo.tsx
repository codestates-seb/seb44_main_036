import { Patch, SquareButton, Button } from '../ui';
import { arrowRight } from '@/assets/common';
import { emptyHeart, heart, share } from '@/assets/like';
import { useState } from 'react';
import ShareModal from '../kakaoshare/ShareModal';
import { useNavigate, useParams } from 'react-router-dom';
import useSWRImmutable, { mutate } from 'swr';
import { Project } from '@/common/types/responseTypes';
import { projectApi } from '@/common/api/api';
import { handleImageError } from '@/common/utils';
import { calculateAchievementRate } from '@/common/utils';
import { CATEGORY_NUMBER_TO_KO, CategoryNumber } from '@/common/constants/sort';
import { useAppSelector } from '@/hooks/useReducer';

export type ModalData = {
  title: string;
  desc: string;
  imgUrl: string;
};

function ProjectInfo() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const userData = useAppSelector((state) => state.user.data);

  const { data: projectDetail, isLoading } = useSWRImmutable<Project>(
    `/projects/${projectId}`,
    projectApi.getProject,
    { dedupingInterval: Infinity }
  );

  if (isLoading) return <div>Loading...</div>;

  const {
    imageUrl,
    summary,
    title,
    currentAmount,
    targetAmount,
    memberId,
    likeCount,
    likedProject,
    categoryId = 11,
    tags,
  } = projectDetail!;

  const userId = userData?.memberId ?? -1;
  const isWriter = userId === memberId;

  const modalData: ModalData = {
    title: title,
    desc: summary,
    imgUrl: imageUrl || 'https://haitikkot.org/gv5/theme/cookie/img/noimage.png',
  };

  const onModalClosed = () => {
    setModalOpen(false);
  };

  const deleteProject = async () => {
    const deleteConfirm = confirm('게시글을 삭제하시겠습니까?');
    if (deleteConfirm) {
      try {
        await projectApi.deleteProject(projectId ?? '');
        mutate('/projects');
        alert('게시글 삭제가 완료되었습니다.');
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const editProject = () => {
    navigate('/project/edit', { state: projectDetail });
  };

  const likeProject = async () => {
    if (!userData) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/users/login');
      return;
    }
    await projectApi.likeProject({ projectId, memberId });
    mutate(
      `/projects/${projectId}`,
      {
        ...projectDetail,
        likedProject: likedProject === 0 ? 1 : 0,
        likeCount: likedProject ? likeCount - 1 : likeCount + 1,
      },
      false
    );
  };

  return (
    <section className='flex justify-between h-410pxr'>
      <img
        src={imageUrl}
        alt='기본 이미지'
        className='w-[54%] h-full rounded-xl mb-10pxr object-cover'
        onError={handleImageError}
      />
      <div className='flex flex-col w-[42%] justify-between'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-5pxr'>
            <span className='text-gray-500 mr-5pxr'>
              {CATEGORY_NUMBER_TO_KO[categoryId as CategoryNumber]}
            </span>
            <img src={arrowRight} className='h-12pxr mr-5pxr' alt='' />
            {tags.map((tag) => (
              <Patch type='tag' key={tag}>
                {tag}
              </Patch>
            ))}
          </div>
          {isWriter && (
            <div className='flex gap-12pxr'>
              <button className='text-gray-500' onClick={editProject}>
                수정
              </button>
              <button className='text-gray-500' onClick={deleteProject}>
                삭제
              </button>
            </div>
          )}
        </div>
        <h1 className='text-2xl font-semibold'>{title}</h1>
        <p className='text-sm text-gray-800'>{summary}</p>
        <div className='bg-gray-500/50 h-1pxr'></div>
        <div className='text-purple-300'>
          <span className='text-4xl italic font-extrabold'>
            {calculateAchievementRate(targetAmount, currentAmount)}
          </span>{' '}
          % 달성
        </div>
        <div>
          <span className='text-4xl italic font-extrabold'>{currentAmount}</span> 원 달성
        </div>
        <div className='bg-gray-500/50 h-1pxr'></div>
        <div className='relative flex justify-between'>
          {modalOpen && <ShareModal onModalClosed={onModalClosed} modalData={modalData} />}
          <div className='flex justify-between gap-20pxr'>
            <SquareButton
              text={likeCount}
              imgSrc={likedProject ? heart : emptyHeart}
              onClick={likeProject}
            />
            <SquareButton onClick={() => setModalOpen(true)} text='공유' imgSrc={share} />
          </div>
          <Button
            text='펀딩하기'
            style='w-[70%] text-xl'
            onClick={() => navigate(`/project/${projectId}/payment`)}
          />
        </div>
      </div>
    </section>
  );
}

export default ProjectInfo;
