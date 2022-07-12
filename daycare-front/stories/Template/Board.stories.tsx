/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Categories from '@src/Components/Template/Board/Categories';

export default {
  title: 'Template/Board',
} as ComponentMeta<typeof Categories>;

const Template: ComponentStory<typeof Categories> = (args) => (
  <Categories {...args} />
);

export const BoardRow = Template.bind({});

BoardRow.argTypes = {
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
