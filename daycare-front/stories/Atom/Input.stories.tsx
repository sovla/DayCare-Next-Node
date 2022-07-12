/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputTextComponents from '@src/Components/Atom/Input/InputText';

export default {
  title: 'Atom/Input',
} as ComponentMeta<typeof InputTextComponents>;

const Template: ComponentStory<typeof InputTextComponents> = (args) => (
  <InputTextComponents {...args} />
);

export const InputText = Template.bind({});

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
