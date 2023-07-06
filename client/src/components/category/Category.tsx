import { Link, useParams } from 'react-router-dom';
import type { categoryEN, categoryINFO } from './CategoryList';

type Props = {
  categoryEN: categoryEN;
  categoryINFO: categoryINFO;
};

function Category({ categoryEN, categoryINFO }: Props) {
  const imgUrl = new URL(`../../assets/category/${categoryEN}.png`, import.meta.url).href;
  const [categoryNUM, categoryKO] = categoryINFO;
  const { category = '' } = useParams();
  const isActive = category === `${categoryNUM ?? ''}`;

  return (
    <li className='flex-col flex-center'>
      <Link to={`/${categoryNUM ?? ''}`}>
        <img src={imgUrl} alt={categoryKO} className='cursor-pointer w-75pxr h-75pxr' />
      </Link>
      <span className={`text-sm mt-10pxr ${isActive && 'font-extrabold underline'}`}>
        {categoryKO}
      </span>
    </li>
  );
}

export default Category;
