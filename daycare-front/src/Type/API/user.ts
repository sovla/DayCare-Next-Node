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
