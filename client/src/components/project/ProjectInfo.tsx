import { Patch, SquareButton, Button } from '../ui';
import { arrowRight } from '@/assets/common';
import { emptyHeart, heart, share } from '@/assets/like';
import { useState } from 'react';
import ShareModal from '../kakaoshare/ShareModal';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { ProjectDetail } from '@/common/types/responseTypes';
import { projectApi } from '@/common/api/api';
import { handleImageError } from '@/common/utils';
import { calculateAchievementRate } from '@/common/utils';
import { CATEGORY_NUMBER_TO_KO, CategoryNumber } from '@/common/constants/sort';

export type ModalData = {
  title: string;
  desc: string;
  imgUrl: string;
};

function ProjectInfo() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { data: projectDetail, isLoading } = useSWR<ProjectDetail>(
    `/projects/${projectId}`,
    projectApi.getProject
  );

  if (isLoading) return <div>Loading...</div>;

  const { imageUrl, summary, title, currentAmount, targetAmount, categoryId = 11 } = projectDetail!;

  const modalData: ModalData = {
    title: '프로젝트 제목',
    desc: '프로젝트 상세',
    imgUrl: 'https://haitikkot.org/gv5/theme/cookie/img/noimage.png',
  };

  const onModalClosed = () => {
    setModalOpen(false);
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
        <div className='flex items-center gap-5pxr'>
          <span className='text-gray-500 mr-5pxr'>
            {CATEGORY_NUMBER_TO_KO[categoryId as CategoryNumber]}
          </span>
          <img src={arrowRight} className='h-12pxr mr-5pxr' alt='' />
          {/* todo: 태그 기능 구현시 추가 */}
          {/* <Patch type='tag'># 남성 화장품</Patch>
          <Patch type='tag'># 케어</Patch> */}
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
            <SquareButton text='396' imgSrc={heart} />
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
