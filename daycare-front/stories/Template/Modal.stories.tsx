import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FilterComponent from '@src/Components/Template/Modal/Filter';
import LoginComponent from '@src/Components/Template/Modal/Login';
import SignUpComponent from '@src/Components/Template/Modal/SignUp';
import { Provider } from 'react-redux';
import { makeStore } from '@src/Store/store';

export default {
  title: 'Template/Modal',
  decorators: [
    (story: any) => (
      <Provider store={makeStore}>
        <div
          id="modal-root"
          style={{
            position: 'fixed',
            zIndex: 2000,
            left: '0px',
            top: '0px',
          }}
        />
        <div
          id="error-root"
          style={{
            position: 'fixed',
            zIndex: 2000,
            left: '0px',
            top: '0px',
          }}
        />
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#0003',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {story()}
        </div>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof FilterComponent>;

const FilterTemplate: ComponentStory<typeof FilterComponent> = (args) => (
  <FilterComponent {...args} />
);

const LoginTemplate: ComponentStory<typeof LoginComponent> = (args) => (
  <LoginComponent {...args} />
);

const SignUpTemplate: ComponentStory<typeof SignUpComponent> = (args) => (
  <SignUpComponent {...args} />
);

export const Filter = FilterTemplate.bind({});

Filter.argTypes = {
  isShow: {
    defaultValue: true,
    description: '보이는 상태',
    control: {
      type: 'boolean',
    },
  },
  filter: {
    defaultValue: {
      type: [],
      city: null,
      cityDetail: null,
      personnel: null,
      characteristic: [],
      classType: [],
      employeeCount: null,
      employee: [],
    },
    description: '필터 object',
    control: {
      type: 'object',
    },
  },
};

export const Login = LoginTemplate.bind({});

Login.argTypes = {};

export const SignUp = SignUpTemplate.bind({});

SignUp.argTypes = {};
