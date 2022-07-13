/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import IntroductionComponent from '@src/Container/Page/Introduction';

export default {
  title: 'Container/Introduction',
  component: IntroductionComponent,
  argTypes: {},
} as ComponentMeta<typeof IntroductionComponent>;

const Template: ComponentStory<typeof IntroductionComponent> = (args) => (
  <IntroductionComponent {...args} />
);

export const Introduction = Template.bind({});
