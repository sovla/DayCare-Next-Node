import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CategoryButtonComponent from '@src/Components/Atom/Button/CategoryButton';

export default {
  title: 'Atom/Button',
} as ComponentMeta<typeof CategoryButtonComponent>;

const CategoryTemplate: ComponentStory<typeof CategoryButtonComponent> = (
  args
) => <CategoryButtonComponent {...args} />;

export const CategoryButton = CategoryTemplate.bind({});

CategoryButton.argTypes = {
  content: {
    description: '버튼 안 내용',
    defaultValue: '전체',
    control: {
      type: 'text',
    },
  },
};
