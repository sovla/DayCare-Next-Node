/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CategoryButton from '@src/Components/Atom/Button/CategoryButton';
import { Button } from '../Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atom/Button',

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

const CategoryTemplate: ComponentStory<typeof CategoryButton> = (args) => (
  <CategoryButton {...args} />
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const DetailMenuText = CategoryTemplate.bind({});

DetailMenuText.argTypes = {
  type: { control: 'color' },
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const LoginButton = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const WriteButton = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
