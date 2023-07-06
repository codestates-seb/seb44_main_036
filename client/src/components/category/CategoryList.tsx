import { CATEGORIES } from '@/common/constants';
import { Category } from '.';
// import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

function CategoryList() {
  const categories = Object.entries(CATEGORIES);

  return (
    <Swiper
      modules={[Navigation]}
      navigation
      slidesPerView={8}
      slidesPerGroup={5}
      className='flex-center max-w-[1200px] mx-auto my-50pxr'
    >
      {categories.map(([key, value]) => (
        <SwiperSlide>
          <Category
            key={key}
            categoryEN={key as (typeof CATEGORIES)[keyof typeof CATEGORIES]}
            categoryKO={value as keyof typeof CATEGORIES}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CategoryList;
