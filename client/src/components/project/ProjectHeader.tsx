// import { useSearchParams } from 'react-router-dom';
import { ORDERS, PROGRESS } from '@/common/constants';
import useSetParams from '@/hooks/useSetParams';

function ProjectHeader() {
  const orders = Object.entries(ORDERS);
  const progress = Object.entries(PROGRESS);
  const [orderParams, setOrderParams] = useSetParams('order', 'recent');
  const [progressParams, setProgressParams] = useSetParams('progress', 'ongoing');

  return (
    <section className='flex justify-between max-w-[1280px] mx-auto mt-45pxr mb-25pxr'>
      <h2 className='text-2xl font-bold'>프로젝트 리스트</h2>
      <div className='text-sm flex-center gap-20pxr'>
        <select
          className='w-80pxr'
          value={progressParams}
          onChange={(e) => setProgressParams(e.target.value)}
        >
          {progress.map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
        <ul className='flex text-gray-700 gap-15pxr'>
          {orders.map(([key, value]) => (
            <li
              key={key}
              onClick={() => setOrderParams(key)}
              className={`cursor-pointer ${orderParams === key && 'text-black font-bold'}`}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ProjectHeader;
