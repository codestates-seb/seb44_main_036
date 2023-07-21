import { useSwiper } from 'swiper/react';
import { arrowLeft, arrowRight } from '@/assets/common';
import { useCallback } from 'react';

function SlideController() {
  const swiper = useSwiper();
  const buttonStyle = 'bg-gray-900 px-15pxr py-12pxr hover:bg-gray-800';

  const slideNext = useCallback(() => {
    swiper.slideNext();
    swiper.autoplay.start();
  }, [swiper]);

  const slidePrev = useCallback(() => {
    swiper.slidePrev();
    swiper.autoplay.start();
  }, [swiper]);

  return (
    <div className='absolute z-10 flex cursor-pointer bottom-40pxr right-100pxr opacity-80'>
      <img src={arrowLeft} onClick={slidePrev} className={buttonStyle} />
      <img src={arrowRight} onClick={slideNext} className={buttonStyle} />
    </div>
  );
}

export default SlideController;
