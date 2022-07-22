/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CategoriesComponent from '@src/Components/Template/Board/Categories';
import PaginationComponent from '@src/Components/Template/Board/Pagination';
import TableComponent from '@src/Components/Template/Board/Table';
import { Provider } from 'react-redux';
import { makeStore } from '@src/Store/store';

export default {
  title: 'Template/Board',
  decorators: [
    (story: any) => <Provider store={makeStore}>{story()}</Provider>,
  ],
} as unknown as ComponentMeta<typeof CategoriesComponent>;

const CategoriesTemplate: ComponentStory<typeof CategoriesComponent> = (
  args
) => {
  const [select, setSelect] = useState(0);
  return (
    <CategoriesComponent
      {...args}
      selectCategory={select}
      onClickCategory={setSelect}
    />
  );
};

const PaginationTemplate: ComponentStory<typeof PaginationComponent> = (
  args
) => <PaginationComponent {...args} />;

const TableTemplate: ComponentStory<typeof TableComponent> = (args) => (
  <TableComponent {...args} />
);

export const Categories = CategoriesTemplate.bind({});

Categories.argTypes = {
  categoryList: {
    description: '카테고리 리스트',
    defaultValue: [
      {
        title: '전체',
        id: 0,
      },
      {
        title: '아이 자랑',
        id: 1,
      },
      {
        title: '어린이 집',
        id: 2,
      },
      {
        title: '추천',
        id: 3,
      },
      {
        title: '전체',
        id: 4,
      },
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
};

export const Table = TableTemplate.bind({});

Table.argTypes = {
  boardList: {
    defaultValue: [
      {
        category: '1',
        title: '어린이집 추천해요',
        write: '김미미',
        writeDate: '2020.07.02',
        likeCount: '200',
        viewCount: '100',
        reviewCount: 10,
      },
      {
        category: '1',
        title: '어린이집 추천해요',
        write: '김미미',
        writeDate: '2020.07.02',
        likeCount: '200',
        viewCount: '100',
        reviewCount: 10,
      },
      {
        category: '1',
        title: '어린이집 추천해요',
        write: '김미미',
        writeDate: '2020.07.02',
        likeCount: '200',
        viewCount: '100',
        reviewCount: 10,
      },
      {
        category: '1',
        title: '어린이집 추천해요',
        write: '김미미',
        writeDate: '2020.07.02',
        likeCount: '200',
        viewCount: '100',
        reviewCount: 10,
      },
      {
        category: '1',
        title: '어린이집 추천해요',
        write: '김미미',
        writeDate: '2020.07.02',
        likeCount: '200',
        viewCount: '100',
        reviewCount: 10,
      },
    ],
    description: '테이블 내용',
  },
};
