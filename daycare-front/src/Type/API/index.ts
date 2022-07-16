import { Method } from 'axios';

export interface APIType {
  url: string;
  method: Method;
  request: object;
  response: {
    statusCode: 200 | 400 | 401 | 403 | 500;
    message: string;
  };
}
