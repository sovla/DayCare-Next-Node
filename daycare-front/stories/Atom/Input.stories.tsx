/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputTextComponents from '@src/Components/Atom/Input/InputText';
import SearchComponent from '@src/Components/Atom/Input/Search';

export default {
  title: 'Atom/Input',
} as ComponentMeta<typeof InputTextComponents>;

const InputTextTemplate: ComponentStory<typeof InputTextComponents> = (
  args
) => <InputTextComponents {...args} />;

const SearchTemplate: ComponentStory<typeof SearchComponent> = (args) => (
  <SearchComponent {...args} />
);

export const InputText = InputTextTemplate.bind({});

InputText.argTypes = {
  width: {
    description: '너비',
    defaultValue: '240px',
    control: {
      type: 'text',
    },
  },
  height: {
    description: '높이',
    defaultValue: '40px',
    control: {
      type: 'text',
    },
  },
  placeholder: {
    description: 'placeholder',
    defaultValue: '아이디',
    control: {
      type: 'text',
    },
  },
  value: {
    description: 'value',
    defaultValue: '',
    control: {
      type: 'text',
    },
  },
};

export const Search = SearchTemplate.bind({});

Search.argTypes = {
  width: {
    description: '너비',
    defaultValue: '340px',
    control: {
      type: 'text',
    },
  },
  height: {
    description: '높이',
    defaultValue: '55px',
    control: {
      type: 'text',
    },
  },
  inputProps: {
    description: 'input Props',
    defaultValue: {
      placeholder: '제목이나 관련 정보를 입력해주세요.',
      value: '',
    },
    control: {
      type: 'object',
    },
  },
  onClick: {
    description: 'onClick 아이콘',
    defaultValue: () => console.log('액션'),
    control: {
      type: 'function',
    },
  },
};
