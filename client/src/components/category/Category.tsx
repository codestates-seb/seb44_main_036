import { Link, useParams } from 'react-router-dom';
import { CATEGORIES } from '@/common/types';

type Props = {
  categoryEN: (typeof CATEGORIES)[keyof typeof CATEGORIES];
  categoryKO: keyof typeof CATEGORIES;
};

function Category({ categoryEN, categoryKO }: Props) {
  const imgUrl = new URL(`../../assets/category/${categoryEN}.png`, import.meta.url).href;
  const { category = 'all' } = useParams();
  const isActive = category === categoryEN;

  return (
    <li
      className={`flex-col border-b-4 border-solid flex-center px-12pxr py-10pxr ${
        isActive ? 'border-black' : 'border-gray-300'
      }`}
    >
      <Link to={`/${categoryEN}`}>
        <img src={imgUrl} alt={categoryEN} className='cursor-pointer w-75pxr h-75pxr' />
      </Link>
      <span className='text-sm mt-10pxr'>{categoryKO}</span>
    </li>
  );
}

export default Category;
