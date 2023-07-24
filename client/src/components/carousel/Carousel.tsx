import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { SlideController } from '.';
import { ProgressBar } from '../ui';
import { useState } from 'react';
import { coin, lizard } from '@/assets/common';
import 'swiper/css';
import 'swiper/css/autoplay';

const CAROUSEL_LIST = [
  {
    id: 1,
    title: (
      <>
        지금 회원가입하면 <br /> 300만 포인트 증정!
      </>
    ),
    desc: '회원가입 이벤트 진행 중',
    imageUrl: coin,
  },
  {
    id: 2,
    title: (
      <>
        내가 원하는 모든 펀딩
        <br />
        Mi Funding
      </>
    ),
    desc: 'Mi Funding',
    imageUrl: lizard,
  },
];

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex + 1);
  };

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 5000 }}
      onSlideChange={handleSlideChange}
      className='relative'
    >
      {CAROUSEL_LIST.map((carousel) => (
        <SwiperSlide key={carousel.id}>
          <img src={carousel.imageUrl} alt='캐러셀 이미지' />
          <div className='absolute top-[0px] left-[0px] w-full h-full bg-gradient-to-tr from-black opacity-60'></div>
          <section className='absolute text-white left-80pxr bottom-50pxr max-w-400pxr'>
            <h2 className='max-w-sm text-[2.1rem] font-extrabold max-w-1280 mb-10pxr leading-10'>
              {carousel.title}
            </h2>
            <p className='text-sm font-semibold'>{carousel.desc}</p>
          </section>
        </SwiperSlide>
      ))}
      <ProgressBar
        backgroundStyle='absolute bottom-25pxr left-80pxr z-10 bg-white/30 h-3pxr w-380pxr'
        barStyle='z-20 bg-white h-3pxr'
        progress={(activeIndex / CAROUSEL_LIST.length) * 100}
      />
      <SlideController />
    </Swiper>
  );
}

export default Carousel;
