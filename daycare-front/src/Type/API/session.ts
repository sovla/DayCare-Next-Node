import { APIType } from '.';

export interface sessionLoginType extends APIType {
  url: '/session';
  method: 'post';
  request: {
    email: string;
    password: string;
    token: string | null;
  };
  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
    user: {
      id: number;
      email: string;
      name: string;
    };
  };
}

export interface sessionLoginOutType extends APIType {
  url: '/session';
  method: 'delete';
  request: {
    id: number;
  };
  response: {
    statusCode: 200 | 400 | 403;
    message: string;
  };
}
