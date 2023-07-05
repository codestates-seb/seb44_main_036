import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Buttons } from '.';
import { ProgressBar } from '../ui';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const CAROUSEL_LIST = [
  {
    id: 1,
    title: (
      <>
        놓치면 아쉬운 <br /> 종료 임박 프로젝트
      </>
    ),
    desc: '프로젝트',
    imageUrl:
      'https://cdn.wadiz.kr/ft/images/green001/2023/0703/20230703170823045_6537.jpg/wadiz/resize/3200/format/jpg/quality/85/',
  },
  {
    id: 2,
    title: (
      <>
        지금 알림신청만 해도
        <br />
        네이버 웹툰 쿠키 300개
      </>
    ),
    desc: '이벤트',
    imageUrl: 'https://cdn1.wadiz.kr/images/20230704/1688445677508.png/wadiz/optimize',
  },
  {
    id: 3,
    title: (
      <>
        한번에 펼치고 회전까지 <br /> 피벗체어 원액션
      </>
    ),
    desc: '스토어',
    imageUrl:
      'https://cdn.wadiz.kr/ft/images/green001/2023/0619/20230619113152840_5099.jpg/wadiz/resize/3200/format/jpg/quality/85/',
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
          <div className='absolute top-[0px] left-[0px] w-full h-full bg-gradient-to-tr from-gray-900 opacity-60'></div>
          <section className='absolute text-white left-80pxr bottom-50pxr max-w-400pxr'>
            <h2 className='max-w-sm text-[2.1rem] font-extrabold max-w-1280 mb-10pxr leading-10'>
              {carousel.title}
            </h2>
            <p className='font-semibold'>{carousel.desc}</p>
          </section>
        </SwiperSlide>
      ))}
      <ProgressBar
        backgroundStyle='absolute bottom-25pxr left-80pxr z-10 bg-white/30 h-3pxr w-380pxr'
        barStyle='z-20 bg-white h-3pxr'
        progress={(activeIndex / 3) * 100}
      />
      <Buttons />
    </Swiper>
  );
}

export default Carousel;
