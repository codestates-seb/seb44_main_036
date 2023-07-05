import { CATEGORIES } from '@/common/constants';
import { Category } from '.';

function CategoryList() {
  const categories = Object.entries(CATEGORIES);

  return (
    <ul className='flex-center max-w-[1280px] mx-auto my-50pxr'>
      {categories.map(([key, value]) => (
        <Category
          key={key}
          categoryEN={key as (typeof CATEGORIES)[keyof typeof CATEGORIES]}
          categoryKO={value as keyof typeof CATEGORIES}
        />
      ))}
    </ul>
  );
}

export default CategoryList;
