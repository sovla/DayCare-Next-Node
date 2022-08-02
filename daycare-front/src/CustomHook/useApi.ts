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

  const api = useCallback(
    async (optionalData?: Partial<T['request']>) => {
      // Partial 유틸타입의 경우 기존 T["request"] 타입 전체를 옵셔널로 받게 됩니다.
      // optionalData 를 통해 별도의 데이터를 합쳐 API 요청을 합니다.
      setIsLoading(true);
      const requestData = {
        ...data,
        ...optionalData,
      };
      const response = (await API({
        //  method = "Post" | "Get" ...
        method,
        //  Data의 경우 get이 아닌 경우에만 추가하도록 하였습니다.
        data: method !== 'get' ? requestData : null,
        url,
        //  파라미터의 경우 get 메소드인 경우 추가하도록 하였습니다.
        params: method === 'get' ? requestData : null,
      })) as AxiosResponse<T['response'], T['request']>;
      setIsLoading(false);
      return response;
    },
    [data, method, url]
  );

  return { isLoading, api };
};

export default useApi;
