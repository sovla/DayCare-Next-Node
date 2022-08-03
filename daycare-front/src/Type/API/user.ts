import { APIType } from '.';

export interface userSignUpType extends APIType {
  url: '/user';
  method: 'post';
  request: {
    email: string;
    password: string;
    name: string;
    verificationCode: string;
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

export interface userEmailVerifyType extends APIType {
  url: '/user/email';
  method: 'post';
  request: {
    email: string;
  };
  response: {
    statusCode: 200 | 400 | 403;
    message: string;
  };
}

export interface getUserInformationType extends APIType {
  url: `/user/${number}`;
  method: 'get';
  request: {};
  response: {
    statusCode: 200 | 400 | 403;
    message: string;
    user: {
      id: number;
      email: string;
      name: string;
      __reply__: {
        content: string;
        delete_date: null | string;
        id: number;
        update_date: null | string;
        write_date: string;
      }[];
      __reviews__: {
        category_id: 2;
        center_id: null | string;
        content: string;
        delete_date: string;
        id: number;
        title: string;
        update_date: null | string;
        view_count: number;
        write_date: string;
      }[];
    };
  };
}

export interface userPatchType extends APIType {
  url: '/user';
  method: 'patch';
  request:
    | {
        name: string;
        id: number;
      }
    | {
        password: string;
        id: number;
      };
  response: {
    statusCode: 200 | 400 | 403;
    message: string;
    user: {
      id: number;
      email: string;
      name: string;
    };
  };
}
