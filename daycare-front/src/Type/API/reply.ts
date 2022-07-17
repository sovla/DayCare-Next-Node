import { APIType } from '.';

// export interface replyListType {
//   category_id: null | number;
//   center_id: null | number;
//   content: string;
//   delete_date: null | string;
//   id: number;
//   image1: string;
//   image2: string;
//   image3: string;
//   image4: string;
//   image5: string;
//   title: string;
//   update_date: null | string;
//   user_id: number;
//   view_count: number;
//   write_date: string;
//   likes: number;
//   reply: number;
// }

// export interface replyType {
//   content: string;
//   delete_date: null | string;
//   id: number;
//   likes: any[];
//   update_date: null | string;
//   user: {
//     id: number;
//     name: string;
//     email: string;
//   };
//   write_date: string;
// }

// export interface replyDetailType {
//   category_id: null | number;
//   center_id: null | number;
//   content: string;
//   delete_date: null | string;
//   id: number;
//   image1: string;
//   image2: string;
//   image3: string;
//   image4: string;
//   image5: string;
//   title: string;
//   update_date: null | string;
//   user_id: number;
//   user: {
//     id: number;
//     name: string;
//     email: string;
//   };
//   view_count: number;
//   write_date: string;
//   likes: any[];
//   reply: replyType[];
// }

// export interface replyGetListType extends APIType {
//   url: '/reply';
//   method: 'get';
//   request:
//     | {
//         center_id: number;
//       }
//     | {
//         category_id: number;
//       };
//   response: {
//     statusCode: 200 | 400 | 401 | 403;
//     message: string;
//     reply: replyListType[];
//   };
// }

// export interface replyGetType extends APIType {
//   url: '/reply';
//   method: 'get';
//   request: {
//     reply_id: number;
//   };

//   response: {
//     statusCode: 200 | 400 | 401 | 403;
//     message: string;
//     reply: replyDetailType;
//   };
// }

export interface replyWriteType extends APIType {
  url: '/reply';
  method: 'post';
  request: {
    review_id: number;
    content: string;
    id: number;
  };

  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
    reply: any;
  };
}

// export interface replyDelteType extends APIType {
//   url: '/reply';
//   method: 'delete';
//   request: {
//     reply_id: number;
//     id: number;
//   };
//   response: {
//     statusCode: 200 | 400 | 401 | 403;
//     message: string;
//   };
// }

// export interface replyUpdateType extends APIType {
//   url: '/reply';
//   method: 'patch';
//   request: {
//     reply_id: number;
//     title: string;
//     content: string;
//     image1: File;
//     image2: File;
//     image3: File;
//     image4: File;
//     image5: File;
//     id: number;
//   };

//   response: {
//     statusCode: 200 | 400 | 401 | 403;
//     message: string;
//     reply: replyListType;
//   };
// }

export interface replyLikeType extends APIType {
  url: '/reply/like';
  method: 'get';
  request: {
    id: number;
    reply_id: number;
  };

  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
    like: boolean;
  };
}
