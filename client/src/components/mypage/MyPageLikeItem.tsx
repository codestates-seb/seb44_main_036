import { Patch, Like } from '../ui';
import type { Project } from '@/common/types/responseTypes';
import { dday, formattingNumber, calculateAchievementRate, handleImageError } from '@/common/utils';

type Props = {
  project: Project;
};

function MyPageLikeItem({ project }: Props) {
  const { currentAmount, expiredDate, imageUrl, targetAmount, title } = project;
  const daysUntilDeadline = dday(new Date(expiredDate));
  const isDueSoon = daysUntilDeadline <= 7;

  return (
    <article className='relative flex flex-col cursor-pointer w-400pxr mb-35pxr'>
      {isDueSoon && <Patch type='alert'>마감임박</Patch>}
      <img
        src={imageUrl}
        alt='기본 이미지'
        className='h-250pxr rounded-xl mb-10pxr'
        onError={handleImageError}
      />
      <Like like={false} position='top-12pxr right-12pxr' />
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
