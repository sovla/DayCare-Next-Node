import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CardsComponent from '@src/Components/Template/Introduction/Cards';

export default {
  title: 'Template/Introduction',
} as ComponentMeta<typeof CardsComponent>;

const CardsTemplate: ComponentStory<typeof CardsComponent> = (args) => (
  <CardsComponent {...args} />
);

export const Cards = CardsTemplate.bind({});

Cards.argTypes = {
  CardList: {
    defaultValue: [
      {
        title: '어린이집 정보 Tips',
        content:
          '어린이집은 이렇게 고르면 좋습니다,어린이집은 이렇게 고르면 좋습니다,어린이집은 이렇게 고르면 좋습니다,어린이집은 이렇게 고르면 좋습니다,어린이집은 이렇게 고르면 좋습니다',
      },
      {
        title: '어린이집 정보 Tips',
        content:
          '어린이집은 이렇게 고르면 좋습니다,어린이집은 이렇게 고르면 좋습니다,어린이집은 이렇게 고르면 좋습니다,어린이집은 이렇게 고르면 좋습니다,어린이집은 이렇게 고르면 좋습니다',
      },
      {
        title: '어린이집 정보 Tips',
        content:
          '어린이집은 이렇게 고르면 좋습니다,어린이집은 이렇게 고르면 좋습니다,어린이집은 이렇게 고르면 좋습니다,어린이집은 이렇게 고르면 좋습니다,어린이집은 이렇게 고르면 좋습니다',
      },
      {
        title: '어린이집 정보 Tips',
        content:
          '어린이집은 이렇게 고르면 좋습니다,어린이집은 이렇게 고르면 좋습니다,어린이집은 이렇게 고르면 좋습니다,어린이집은 이렇게 고르면 좋습니다,어린이집은 이렇게 고르면 좋습니다',
      },
    ],
    description: '카드 리스트',
    control: {
      type: 'array',
    },
  },
  width: {
    defaultValue: '1440px',
    description: '넓이',
    control: {
      type: 'text',
    },
  },
};
