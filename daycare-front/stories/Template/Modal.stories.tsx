import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FilterComponent from '@src/Components/Template/Modal/Filter';
import LoginComponent from '@src/Components/Template/Modal/Login';
import SignUpComponent from '@src/Components/Template/Modal/SignUp';

export default {
  title: 'Template/Modal',
} as ComponentMeta<typeof FilterComponent>;

const FilterTemplate: ComponentStory<typeof FilterComponent> = (args) => (
  <FilterComponent {...args} />
);

const LoginTemplate: ComponentStory<typeof LoginComponent> = (args) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#0003',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <LoginComponent {...args} />
  </div>
);

const SignUpTemplate: ComponentStory<typeof SignUpComponent> = (args) => (
  <SignUpComponent {...args} />
);

export const Filter = FilterTemplate.bind({});

Filter.argTypes = {
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

export const Login = LoginTemplate.bind({});

Login.argTypes = {
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

export const SignUp = SignUpTemplate.bind({});

SignUp.argTypes = {
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
