import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CategoryButtonComponent from '@src/Components/Atom/Button/CategoryButton';
import DetailMenuButtonComponent from '@src/Components/Atom/Button/DetailMenuButton';
import SaveIcon from '@src/assets/image/SaveIcon.png';

export default {
  title: 'Atom/Button',
} as ComponentMeta<typeof CategoryButtonComponent>;

const CategoryTemplate: ComponentStory<typeof CategoryButtonComponent> = (
  args
) => <CategoryButtonComponent {...args} />;

const DetailMenuButtonTemplate: ComponentStory<
  typeof DetailMenuButtonComponent
> = (args) => <DetailMenuButtonComponent {...args} />;

export const CategoryButton = CategoryTemplate.bind({});

CategoryButton.argTypes = {
  content: {
    description: '버튼 안 내용',
    defaultValue: '전체',
    control: {
      type: 'text',
    },
  },
};

export const DetailMenuButton = DetailMenuButtonTemplate.bind({});

DetailMenuButton.argTypes = {
  alt: {
    description: '이미지 alt',
    defaultValue: '이미지',
    control: {
      type: 'text',
    },
  },
  menu: {
    description: '버튼 내용',
    defaultValue: '저장하기',
    control: {
      type: 'text',
    },
  },
  image: {
    description: '이미지',
    defaultValue: SaveIcon,
  },
};
