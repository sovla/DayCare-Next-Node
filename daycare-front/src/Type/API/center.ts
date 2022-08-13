import { APIType } from '.';

export interface centerType {
  homepage: string;
  address_detail: string;
  tel: string;
  name: string;
  image: string;
  lat: string;
  lon: string;
  school_vehicle: '운영' | '미운영';
  type: string;
  id: number;
}

export interface getCentersType extends APIType {
  url: '/center';
  method: 'get';
  request: {
    type: string;
    lon: string;
    lat: string;
    city: string;
    city_detail: string;
    max: boolean;
    property: string;
    empty_class: string;
    employee_count: string;
    employee: string;
    radius: number;
  };

  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
    center: centerType[];
  };
}

export interface getSearchCentersType extends APIType {
  url: '/center';
  method: 'post';
  request: {
    title: string;
  };

  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
    center: centerType[];
  };
}

export interface centerLikeType extends APIType {
  url: `/center/like/${number}`;
  method: 'get';
  request: {
    id: number;
  };
  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
    like: boolean;
  };
}
