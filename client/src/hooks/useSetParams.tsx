import { useSearchParams } from 'react-router-dom';

type Returns = [string | undefined, (value: string) => void];

function useSetParams(key: string, initialParams?: string): Returns {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = searchParams.get(key) || initialParams;

  const setParams = (value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return [params, setParams];
}

export default useSetParams;
