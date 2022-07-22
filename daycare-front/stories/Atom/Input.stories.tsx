/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputTextComponents from '@src/Components/Atom/Input/InputText';
import SearchComponent from '@src/Components/Atom/Input/Search';
import SelectComponent from '@src/Components/Atom/Input/Select';
import CheckBoxComponent from '@src/Components/Atom/Input/CheckBox';

export default {
  title: 'Atom/Input',
} as ComponentMeta<typeof InputTextComponents>;

const InputTextTemplate: ComponentStory<typeof InputTextComponents> = (
  args
) => <InputTextComponents {...args} />;

const SearchTemplate: ComponentStory<typeof SearchComponent> = (args) => (
  <SearchComponent {...args} />
);

const SelectTemplate: ComponentStory<typeof SelectComponent> = (args) => (
  <SelectComponent {...args} />
);

const CheckBoxTemplate: ComponentStory<typeof CheckBoxComponent> = (args) => (
  <CheckBoxComponent {...args} />
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

export const SelectCategory = SelectTemplate.bind({});

SelectCategory.argTypes = {
  menuList: {
    description: '메뉴 리스트',
    defaultValue: ['전체', '어린이집 추천', '어린이집 꿀팁'],
    control: {
      type: 'array',
    },
  },
};

export const CheckBox = CheckBoxTemplate.bind({});

CheckBox.argTypes = {
  content: {
    description: '내용',
    defaultValue: '공립',
    control: {
      type: 'text',
    },
  },

  isCheck: {
    description: '체크여부',
    defaultValue: true,
    control: {
      type: 'boolean',
    },
  },
};
