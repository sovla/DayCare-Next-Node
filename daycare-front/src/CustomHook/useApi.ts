import API from '@src/API';
import { APIType } from '@src/Type/API';
import { AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';

const useApi = <T extends APIType>({
  url,
  data,
  method,
}: {
  url: T['url'];
  data: T['request'];
  method: T['method'];
}) => {
  //  공통적인 api를 핸들링하기 위한 훅
  const [isLoading, setIsLoading] = useState(false);

  const api = useCallback(async () => {
    setIsLoading(true);
    const response = (await API({
      method,
      data: method !== 'get' ? data : null,
      url,
      params: method === 'get' ? data : null,
    })) as AxiosResponse<T['response'], T['request']>;
    setIsLoading(false);
    return response;
  }, [data, method, url]);

  return { isLoading, api };
};

export default useApi;
