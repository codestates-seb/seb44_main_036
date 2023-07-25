import { xSquare } from '@/assets/common';

function Empty() {
  return (
    <div className='flex flex-col items-center mx-auto my-80pxr gap-20pxr h-351pxr'>
      <img src={xSquare} alt='' />
      <p className='text-3xl text-gray-500'>조건에 맞는 프로젝트가 없습니다.</p>
    </div>
  );
}

export default Empty;
