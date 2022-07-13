import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MenuComponent from '@src/Components/Template/Layout/Menu';

export default {
  title: 'Template/Layout',
} as ComponentMeta<typeof MenuComponent>;

const MenuTemplate: ComponentStory<typeof MenuComponent> = (args) => (
  <MenuComponent {...args} />
);

export const Menu = MenuTemplate.bind({});

Menu.argTypes = {
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
