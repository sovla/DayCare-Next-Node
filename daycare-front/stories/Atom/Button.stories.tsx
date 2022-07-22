import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CategoryButtonComponent from '@src/Components/Atom/Button/CategoryButton';
import DetailMenuButtonComponent from '@src/Components/Atom/Button/DetailMenuButton';
import BlueButtonComponent from '@src/Components/Atom/Button/BlueButton';
import SaveIcon from '@src/assets/image/SaveIcon.png';
import IconButtonComponent from '@src/Components/Atom/Button/IconButton';
import FilterIcon from '@src/assets/image/FilterIcon.png';

export default {
  title: 'Atom/Button',
} as ComponentMeta<typeof CategoryButtonComponent>;

const CategoryTemplate: ComponentStory<typeof CategoryButtonComponent> = (
  args
) => <CategoryButtonComponent {...args} />;

const DetailMenuButtonTemplate: ComponentStory<
  typeof DetailMenuButtonComponent
> = (args) => <DetailMenuButtonComponent {...args} />;

const BlueButtonTemplate: ComponentStory<typeof BlueButtonComponent> = (
  args
) => <BlueButtonComponent {...args} />;

const IconButtonTemplate: ComponentStory<typeof IconButtonComponent> = (
  args
) => <IconButtonComponent {...args} />;

export const CategoryButton = CategoryTemplate.bind({});

CategoryButton.argTypes = {
  content: {
    description: '버튼 안 내용',
    defaultValue: '전체',
    control: {
      type: 'text',
    },
  },
  isSelect: {
    description: '버튼 선택여부',
    defaultValue: true,
    control: {
      type: 'boolean',
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

export const BlueButton = BlueButtonTemplate.bind({});

BlueButton.argTypes = {
  content: {
    description: '버튼 내용',
    defaultValue: '로그인',
    control: {
      type: 'text',
    },
  },
};

export const IconButton = IconButtonTemplate.bind({});

IconButton.argTypes = {
  image: {
    description: '버튼 아이콘',
    defaultValue: FilterIcon,
  },
};
