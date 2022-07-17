import { APIType } from '.';

export interface reviewListType {
  category_id: null | number;
  center_id: null | number;
  content: string;
  delete_date: null | string;
  id: number;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  title: string;
  update_date: null | string;
  user_id: number;
  view_count: number;
  write_date: string;
  likes: number;
  reply: number;
}

export interface replyType {
  content: string;
  delete_date: null | string;
  id: number;
  likes: any[];
  update_date: null | string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  write_date: string;
}

export interface reviewDetailType {
  category_id: null | number;
  center_id: null | number;
  content: string;
  delete_date: null | string;
  id: number;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  title: string;
  update_date: null | string;
  user_id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  view_count: number;
  write_date: string;
  likes: any[];
  reply: replyType[];
}

export interface reviewGetListType extends APIType {
  url: '/review';
  method: 'get';
  request:
    | {
        center_id: number;
      }
    | {
        category_id: number;
      };
  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
    review: reviewListType[];
  };
}

export interface reviewGetType extends APIType {
  url: '/review';
  method: 'get';
  request: {
    review_id: number;
  };

  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
    review: reviewDetailType;
  };
}

export interface reviewWriteType extends APIType {
  url: '/review';
  method: 'post';
  request:
    | {
        center_id: number;
        title: string;
        content: string;
        image1?: File;
        image2?: File;
        image3?: File;
        image4?: File;
        image5?: File;
        id: number;
      }
    | {
        category_id: number;
        title: string;
        content: string;
        image1?: File;
        image2?: File;
        image3?: File;
        image4?: File;
        image5?: File;
        id: number;
      };
  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
    review: reviewListType[];
  };
}

export interface reviewDeleteType extends APIType {
  url: '/review';
  method: 'delete';
  request: {
    review_id: number;
    id: number;
  };
  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
  };
}

export interface reviewUpdateType extends APIType {
  url: '/review';
  method: 'patch';
  request: {
    review_id: number;
    title: string;
    content: string;
    image1: File;
    image2: File;
    image3: File;
    image4: File;
    image5: File;
    id: number;
  };

  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
    review: reviewListType;
  };
}

export interface reviewLikeType extends APIType {
  url: '/review/like';
  method: 'get';
  request: {
    id: number;
    review_id: number;
  };

  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
    like: boolean;
  };
}
