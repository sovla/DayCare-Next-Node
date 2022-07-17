import { APIType } from '.';

export interface category {
  id: number;
  title: string;
  join_date: string;
}

export interface categoryListType extends APIType {
  url: '/category';
  method: 'get';
  request: {};
  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
    category: category[];
  };
}
