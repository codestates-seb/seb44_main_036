import { CATEGORIES } from '@/common/constants';
import { Category } from '.';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

export type categoryEN = keyof typeof CATEGORIES;
export type categoryINFO = (typeof CATEGORIES)[keyof typeof CATEGORIES];

function CategoryList() {
  const categories = Object.entries(CATEGORIES) as [categoryEN, categoryINFO][];

  return (
    <Swiper
      modules={[Navigation]}
      navigation
      slidesPerView={8}
      slidesPerGroup={5}
      className='flex-center max-w-[1200px] mx-auto my-50pxr'
    >
      {categories.map(([categoryEN, categoryINFO]) => (
        <SwiperSlide key={categoryEN}>
          <Category categoryEN={categoryEN} categoryINFO={categoryINFO} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CategoryList;
