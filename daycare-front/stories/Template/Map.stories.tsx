import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DetailCenterComponent from '@src/Components/Template/Map/DetailCenter';
import CentersComponent from '@src/Components/Template/Map/Centers';

import Dummy from '@src/assets/image/dummy2.png';

export default {
  title: 'Template/Map',
} as ComponentMeta<typeof DetailCenterComponent>;

const DetailCenterTemplate: ComponentStory<typeof DetailCenterComponent> = (
  args
) => <DetailCenterComponent {...args} />;

const CentersTemplate: ComponentStory<typeof CentersComponent> = (args) => (
  <CentersComponent {...args} />
);

export const DetailCenter = DetailCenterTemplate.bind({});

DetailCenter.argTypes = {
  classList: {
    description: '반 리스트',
    defaultValue: [
      {
        title: '만 0세',
        value: '0명',
      },
    ],
    control: {
      type: 'array',
    },
  },

  center: {
    description: '어린이집 정보',
    defaultValue: {
      name: '어린이집 명',
      city: '행정 관할구역',
      authorizationDate: '2022-07-18',
      tel: '051-1234-1234',
      operatingTime: '평일 09:00 ~ 17:00',
      address: '어린이집 주소',
      representativeName: '김무무',
      directorName: '김원장',
    },
    control: {
      type: 'object',
    },
  },
  image: {
    defaultValue: Dummy,
    description: '어린이집 이미지',
  },
};

export const Centers = CentersTemplate.bind({});

Centers.argTypes = {
  centerList: {
    defaultValue: [
      {
        id: 0,
        name: '전포연수어린이집',
        address: '부산 남구 고동골로60번길 29 하승어린이집',
        type: '공립',
        tel: '051-1234-1234',
        homepage: 'https://naver.com',
        isSchoolBus: true,
        image: Dummy,
      },
      {
        id: 1,
        name: '전포연수어린이집',
        address: '부산 남구 고동골로60번길 29 하승어린이집',
        type: '공립',
        tel: '051-1234-1234',
        homepage: 'https://naver.com',
        isSchoolBus: true,
        image: Dummy,
      },
      {
        id: 2,
        name: '전포연수어린이집',
        address: '부산 남구 고동골로60번길 29 하승어린이집',
        type: '공립',
        tel: '051-1234-1234',
        homepage: 'https://naver.com',
        isSchoolBus: true,
        image: Dummy,
      },
      {
        id: 3,
        name: '전포연수어린이집',
        address: '부산 남구 고동골로60번길 29 하승어린이집',
        type: '공립',
        tel: '051-1234-1234',
        homepage: 'https://naver.com',
        isSchoolBus: true,
        image: Dummy,
      },
      {
        id: 4,
        name: '전포연수어린이집',
        address: '부산 남구 고동골로60번길 29 하승어린이집',
        type: '공립',
        tel: '051-1234-1234',
        homepage: 'https://naver.com',
        isSchoolBus: true,
        image: Dummy,
      },
    ],
    description: '어린이집 리스트',
    control: {
      type: 'array',
    },
  },
  selectCenter: {
    description: '선택한 어린이집',
    defaultValue: {
      id: 0,
    },
    control: {
      type: 'object',
    },
  },
};
