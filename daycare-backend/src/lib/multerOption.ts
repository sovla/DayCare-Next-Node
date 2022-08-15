import { HttpException } from '@nestjs/common';
import { existsSync, mkdirSync, rm } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const multerOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      // 이미지 형식은 jpg, jpeg, png,  만 허용합니다.
      callback(null, true);
    } else {
      callback(new HttpException('지원하지 않는 이미지 형식입니다.', 400));
    }
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'upload';

      if (!existsSync(uploadPath)) {
        // public 폴더가 존재하지 않을시, 생성합니다.
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },

    filename: (request, file, callback) => {
      callback(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};

export const createImageURL = (file): string => {
  const serverAddress = process.env.SERVER_ADDRESS;

  // 파일이 저장되는 경로: 서버주소/public 폴더
  // 위의 조건에 따라 파일의 경로를 생성해줍니다.
  return `${serverAddress}/upload/${file.filename}`;
};

export const deleteImage = async (file: string) => {
  rm(
    `${process.env.INIT_CWD}/upload/${file.replace(
      'https://daycare-center.shop/api/upload/',
      '',
    )}`,
    (err) => err,
  );
};
