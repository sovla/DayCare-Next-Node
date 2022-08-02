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
  user: {
    id: number;
    name: string;
  };
  view_count: number;
  write_date: string;
  likes: number;
  reply: number;
}

export interface replyType {
  content: string;
  delete_date: null | string;
  id: number;
  likes: {
    user_id: number;
  }[];
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
  user: {
    id: number;
    name: string;
    email: string;
  };
  view_count: number;
  write_date: string;
  likes: { user_id: number }[];
  reply: replyType[];
}

export interface reviewGetListTypeWithCategoryId extends APIType {
  url: `/review/category/${number}`;
  method: 'get';
  request: {
    page: number;
  };
  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
    review: reviewListType[];
    totalCount: number;
  };
}

export interface reviewGetType extends APIType {
  url: `/review/${string}`;
  method: 'get';
  request: {};

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
    review: {
      title: string;
      category_id: string;
      content: string;
      user: {
        id: number;
      };
      write_date: string;
      update_date: null | string;
      delete_date: null | string;
      center_id: null | string;
      id: number;
      view_count: number;
    };
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
    review: reviewListType;
  };
}

export interface reviewLikeType extends APIType {
  url: `/review/like/${number}`;
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
