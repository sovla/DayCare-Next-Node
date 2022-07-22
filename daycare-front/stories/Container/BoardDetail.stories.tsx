/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BoardDetailComponent from '@src/Container/Page/BoardDetail';
import { Provider } from 'react-redux';
import { makeStore, mockStore } from '@src/Store/store';
import MockError from 'stories/mockError';

export default {
  title: 'Container/BoardDetail',
  component: BoardDetailComponent,
  parameters: { layout: 'fullscreen' },
} as ComponentMeta<typeof BoardDetailComponent>;

const reviewDummy = {
  id: 261,
  title: '글쓰기테스트',
  content:
    '<p><br class="ProseMirror-trailingBreak"></p><p>도대체 뭥미</p><p><br class="ProseMirror-trailingBreak"></p><p><br class="ProseMirror-trailingBreak"></p><p>글쓰기테스트글쓰기테스트</p>',
  image1: '',
  image2: '',
  image3: '',
  image4: '',
  image5: '',
  write_date: '2022-07-21T06:23:22.000Z',
  update_date: null,
  delete_date: null,
  user_id: 1,
  view_count: 72,
  center_id: null,
  category_id: 1,
  likes: [],
  reply: [
    {
      id: 160,
      content: ' ',
      write_date: '2022-07-21T10:04:22.000Z',
      update_date: null,
      delete_date: null,
      likes: [],
      user: {
        id: 1,
        name: '어드민',
        email: 'dovla@naver.com',
      },
    },
    {
      id: 161,
      content: ' d',
      write_date: '2022-07-21T10:04:22.000Z',
      update_date: null,
      delete_date: null,
      likes: [],
      user: {
        id: 1,
        name: '어드민',
        email: 'dovla@naver.com',
      },
    },
    {
      id: 162,
      content: '  ',
      write_date: '2022-07-21T10:04:22.000Z',
      update_date: null,
      delete_date: null,
      likes: [],
      user: {
        id: 1,
        name: '어드민',
        email: 'dovla@naver.com',
      },
    },
    {
      id: 163,
      content: '     ',
      write_date: '2022-07-21T10:04:22.000Z',
      update_date: null,
      delete_date: null,
      likes: [
        {
          user_id: 1,
        },
      ],
      user: {
        id: 1,
        name: '어드민',
        email: 'dovla@naver.com',
      },
    },
    {
      id: 164,
      content: ' ',
      write_date: '2022-07-21T10:04:22.000Z',
      update_date: null,
      delete_date: null,
      likes: [],
      user: {
        id: 1,
        name: '어드민',
        email: 'dovla@naver.com',
      },
    },
  ],
  user: {
    id: 1,
    name: '어드민',
    email: 'dovla@naver.com',
  },
};

const Template: ComponentStory<typeof BoardDetailComponent> = (args) => (
  <BoardDetailComponent {...args} review={reviewDummy} />
);

export const BoardDetailNoAuth = Template.bind({});
BoardDetailNoAuth.decorators = [
  (story: any) => (
    <Provider store={makeStore}>
      <MockError />
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
];

export const BoardDetailLogin = Template.bind({});
BoardDetailLogin.decorators = [
  (story: any) => (
    <Provider store={mockStore}>
      <MockError />
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
];
