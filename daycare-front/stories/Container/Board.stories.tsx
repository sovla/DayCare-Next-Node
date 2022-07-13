/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BoardComponent from '@src/Container/Page/Board';

export default {
  title: 'Container/Board',
  component: BoardComponent,
  parameters: { layout: 'fullscreen' },
} as ComponentMeta<typeof BoardComponent>;

const Template: ComponentStory<typeof BoardComponent> = (args) => (
  <BoardComponent {...args} />
);

export const Board = Template.bind({});
