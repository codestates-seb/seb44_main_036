import { Patch, SquareButton, Button } from '../ui';
import { arrowRight } from '@/assets/common';
import { emptyHeart, heart, share } from '@/assets/like';
import { useRef, useState } from 'react';
import ShareModal from '../kakaoshare/ShareModal';

function ProjectInfo() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef();

  const onModalClosed = () => {
    setModalOpen(false);
  };

  return (
    <section className='flex justify-between h-410pxr'>
      <img
        src='https://haitikkot.org/gv5/theme/cookie/img/noimage.png'
        alt='기본 이미지'
        className='w-[54%] h-full rounded-xl mb-10pxr'
      />
      <div className='flex flex-col w-[42%] justify-between'>
        <div className='flex items-center gap-5pxr'>
          <span className='text-gray-500 mr-5pxr'>뷰티</span>
          <img src={arrowRight} className='h-12pxr mr-5pxr' alt='' />
          <Patch type='tag'># 남성 화장품</Patch>
          <Patch type='tag'># 케어</Patch>
        </div>
        <h1 className='text-2xl font-semibold'>
          [지코 여행어댑터] 최대 2500W 고출력 65W C타입 초고속 충전도 가능한 지코 여행어댑터
        </h1>
        <p className='text-sm text-gray-800'>
          최대 2500W 고출력으로 전기포트, 드라이기도 쌉가능! 65W C타입 초고속 충전도 가능한 지코
          여행어댑터! 해외여행갈때 이제 간편하게 지코 여행어댑터 하나만 챙겨가세요!
        </p>
        <div className='bg-gray-500/50 h-1pxr'></div>
        <div className='text-purple-300'>
          <span className='text-4xl italic font-extrabold'>1597</span> % 달성
        </div>
        <div>
          <span className='text-4xl italic font-extrabold'>2,902,000</span> 원 달성
        </div>
        <div className='bg-gray-500/50 h-1pxr'></div>
        <div className='relative flex justify-between'>
          {modalOpen && <ShareModal onModalClosed={onModalClosed} />}
          <div className='flex justify-between gap-20pxr'>
            <SquareButton text='396' imgSrc={heart} />
            <SquareButton onClick={() => setModalOpen(true)} text='공유' imgSrc={share} />
          </div>
          <Button text='펀딩하기' style='w-[70%] text-xl' />
        </div>
      </div>
    </section>
  );
}

export default ProjectInfo;
