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
  categoryList: {
    description: '카테고리 리스트',
    defaultValue: [
      '전체',
      '아이-자랑',
      '어린이집 추천해요',
      '아이-자랑',
      '어린이집 추천해요',
    ],
    control: {
      type: 'array',
    },
  },
};

export const Centers = CentersTemplate.bind({});

Centers.argTypes = {
  centerList: {
    defaultValue: [
      {
        name: '전포연수어린이집',
        address: '부산 남구 고동골로60번길 29 하승어린이집',
        type: '공립',
        tel: '051-1234-1234',
        homepage: 'https://naver.com',
        isSchoolBus: true,
        image: Dummy,
      },
      {
        name: '전포연수어린이집',
        address: '부산 남구 고동골로60번길 29 하승어린이집',
        type: '공립',
        tel: '051-1234-1234',
        homepage: 'https://naver.com',
        isSchoolBus: true,
        image: Dummy,
      },
      {
        name: '전포연수어린이집',
        address: '부산 남구 고동골로60번길 29 하승어린이집',
        type: '공립',
        tel: '051-1234-1234',
        homepage: 'https://naver.com',
        isSchoolBus: true,
        image: Dummy,
      },
      {
        name: '전포연수어린이집',
        address: '부산 남구 고동골로60번길 29 하승어린이집',
        type: '공립',
        tel: '051-1234-1234',
        homepage: 'https://naver.com',
        isSchoolBus: true,
        image: Dummy,
      },
      {
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
};
