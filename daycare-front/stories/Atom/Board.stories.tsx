/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Row from '@src/Components/Atom/Board/Row';

export default {
  title: 'Atom/Board',
} as ComponentMeta<typeof Row>;

const Template: ComponentStory<typeof Row> = (args) => <Row {...args} />;

export const BoardRow = Template.bind({});

BoardRow.argTypes = {
  category: {
    description: '첫 번째 줄 카테고리/번호',
    defaultValue: '전체',
    control: {
      type: 'text',
    },
  },
  title: {
    description: '두 번째 줄 제목',
    defaultValue: '어린이집 추천해요',
    control: {
      type: 'text',
    },
  },

  write: {
    description: '세 번째 줄 제목',
    defaultValue: '김미미',
    control: {
      type: 'text',
    },
  },
  writeDate: {
    description: '네 번째 줄 작성일자',
    defaultValue: '2022.07.09',
    control: {
      type: 'text',
    },
  },
  viewCount: {
    description: '다섯 번째 줄 조회수',
    defaultValue: 300,
    control: {
      type: 'text',
    },
  },
  likeCount: {
    description: '여섯 번째 줄 좋아요 수',
    defaultValue: 10,
    control: {
      type: 'text',
    },
  },
  reviewCount: {
    description: '두번 번째 줄 제목 뒤 리뷰수',
    defaultValue: 10,
    control: {
      type: 'text',
    },
  },
};
