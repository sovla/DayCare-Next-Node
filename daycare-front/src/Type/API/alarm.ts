import { APIType } from './index';

export interface alarmType {
  center: { id: number | undefined; lat: number; lon: number };
  content: string;
  id: number;
  join_date: string;
  read_status: number;
  review: {
    id: number | undefined;
  };
  title: string;
  user: { id: number };
}

export interface getAlarmType extends APIType {
  url: '/alarm';
  method: 'get';
  request: {
    id: number;
  };
  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
    alarm: alarmType[];
  };
}

export interface readAlarmType extends APIType {
  url: '/alarm';
  method: 'patch';
  request: {
    id: number;
    alarm_id: number;
  };
  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
    alarm: boolean;
  };
}

export interface deleteAlarmType extends APIType {
  url: '/alarm';
  method: 'delete';
  request: {
    id: number;
    alarm_id: number;
  };
  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
    alarm: boolean;
  };
}
