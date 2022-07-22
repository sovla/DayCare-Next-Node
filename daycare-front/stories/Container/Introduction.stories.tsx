/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import IntroductionComponent from '@src/Container/Page/Introduction';
import { Provider } from 'react-redux';
import { makeStore } from '@src/Store/store';

export default {
  title: 'Container/Introduction',
  component: IntroductionComponent,
  argTypes: {},
  parameters: { layout: 'fullscreen' },
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
        {story()}
      </Provider>
    ),
  ],
} as ComponentMeta<typeof IntroductionComponent>;

const Template: ComponentStory<typeof IntroductionComponent> = (args) => (
  <IntroductionComponent {...args} />
);

export const Introduction = Template.bind({});
