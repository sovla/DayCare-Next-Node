/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CardComponents from '@src/Components/Atom/Card/Card';

import Dummy from '@src/assets/image/dummy1.png';

export default {
  title: 'Atom/Cards',
} as ComponentMeta<typeof CardComponents>;

const Template: ComponentStory<typeof CardComponents> = (args) => (
  <CardComponents {...args} />
);

export const Card = Template.bind({});

Card.argTypes = {
  content: {
    description: '카드 아래 내용입니다.',
    defaultValue:
      '좋은 어린이집 고르는 Tip좋은 어린이집 고르는 Tip좋은 어린이집 고르는 Tip좋은 어린이집 고르는 Tip좋은 어린이집 고르는 Tip좋은 어린',
    control: {
      type: 'text',
    },
  },
  title: {
    description: '카드 제목입니다.',
    defaultValue: '좋은 어린이집 고르는 Tip',
    control: {
      type: 'text',
    },
  },
  image: {
    description: '이미지 입니다 Next Image',
    defaultValue: Dummy,
  },
};
