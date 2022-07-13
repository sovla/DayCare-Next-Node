/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CategoriesComponent from '@src/Components/Template/Board/Categories';
import PaginationComponent from '@src/Components/Template/Board/Pagination';

export default {
  title: 'Template/Board',
} as ComponentMeta<typeof CategoriesComponent>;

const CategoriesTemplate: ComponentStory<typeof CategoriesComponent> = (
  args
) => <CategoriesComponent {...args} />;

const PaginationTemplate: ComponentStory<typeof PaginationComponent> = (
  args
) => <PaginationComponent {...args} />;

export const Categories = CategoriesTemplate.bind({});

Categories.argTypes = {
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

export const Pagination = PaginationTemplate.bind({});

Pagination.argTypes = {
  selectPage: {
    defaultValue: 1,
    description: '선택한 번호',
    control: {
      type: 'number',
    },
  },
  maxPage: {
    defaultValue: 20,
    description: '마지막 번호',
    control: {
      type: 'number',
    },
  },
  onClickPage: {
    defaultValue: (page: number) => console.log(page),
    description: '선택한 페이지 액션',
    control: {
      type: 'function',
    },
  },
};
