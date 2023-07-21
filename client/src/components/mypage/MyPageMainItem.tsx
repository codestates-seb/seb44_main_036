import { Patch, Like } from '../ui';

function MyPageMainItem() {
  return (
    <article className='relative flex flex-col cursor-pointer w-400pxr'>
      <Patch type='alert'>마감임박</Patch>
      <img
        src='https://haitikkot.org/gv5/theme/cookie/img/noimage.png'
        alt='기본 이미지'
        className='h-250pxr rounded-xl mb-10pxr'
      />
      <Like like={false} position='top-12pxr right-12pxr' />
      <div className='flex items-center justify-between'>
        <div className='flex-center'>
          <span className='text-xl font-bold text-purple-300'>2,791% 달성</span>
          <span className='text-sm text-gray-500 ml-10pxr'>81,881,200 원</span>
        </div>
        <Patch type='deadline'>11일 남음</Patch>
      </div>
      <h2 className='text-xl mt-7pxr line-clamp-2'>아직 개발중인 기능입니다.</h2>
    </article>
  );
}

export default MyPageMainItem;
