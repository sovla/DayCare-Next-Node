import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SimpleComponent from '@src/Components/Atom/Center/SimpleCenter';

import Dummy from '@src/assets/image/dummy2.png';

export default {
  title: 'Atom/Center',
} as ComponentMeta<typeof SimpleComponent>;

const SimpleCenterTemplate: ComponentStory<typeof SimpleComponent> = (args) => (
  <SimpleComponent {...args} />
);

export const SimpleCenter = SimpleCenterTemplate.bind({});

SimpleCenter.argTypes = {
  name: {
    defaultValue: '미미스쿨존',
    description: '어린이집 명',
    control: {
      type: 'text',
    },
  },
  address: {
    defaultValue: '부산 진구 거제대로 30번길 14',
    description: '어린이집 주소',
    control: {
      type: 'text',
    },
  },
  homepage: {
    defaultValue: 'https://asdlkjsadk.com',
    description: '어린이집 주소',
    control: {
      type: 'text',
    },
  },
  image: {
    defaultValue: Dummy,
    description: '어린이집 이미지',
  },
  isSchoolBus: {
    defaultValue: true,
    description: '통학버스 운행여부',
    control: {
      type: 'boolean',
    },
  },
  tel: {
    defaultValue: '051-1234-1234',
    description: '어린이집 전화번호',
    control: {
      type: 'text',
    },
  },
  type: {
    defaultValue: '공립',
    description: '어린이집 특징(공립,사립)',
    control: {
      type: 'text',
    },
  },
};
