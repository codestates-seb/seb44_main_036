import { MYTABS } from '@/common/constants/sort';
import useSetParams from '@/hooks/useSetParams';

function MyTabs() {
  const tabs = Object.entries(MYTABS);
  const [tabParams, setTabParams] = useSetParams('tab', 'project');

  return (
    <ul className='flex-center gap-30pxr mb-50pxr'>
      {tabs.map(([key, value]) => (
        <li key={key} className='relative flex-col flex-center'>
          {tabParams === key && (
            <span className='absolute bg-purple-300 rounded-full -top-13pxr left-1/2 w-6pxr h-6pxr mb-5pxr'></span>
          )}
          <button
            onClick={() => setTabParams(key)}
            className={`text-xl font-bold hover:text-purple-300 ${
              tabParams === key ? 'text-purple-300' : 'text-gray-400'
            }`}
          >
            {value} 프로젝트
          </button>
        </li>
      ))}
    </ul>
  );
}

export default MyTabs;
