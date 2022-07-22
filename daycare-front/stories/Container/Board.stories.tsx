/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BoardComponent from '@src/Container/Page/Board';
import { Provider } from 'react-redux';
import { makeStore } from '@src/Store/store';

export default {
  title: 'Container/Board',
  component: BoardComponent,
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
} as ComponentMeta<typeof BoardComponent>;

const Template: ComponentStory<typeof BoardComponent> = (args) => (
  <BoardComponent
    {...args}
    category={[
      { id: 1, join_date: '2022-07-20', title: '공지사항' },
      { id: 2, join_date: '2022-07-20', title: '어린이집' },
      { id: 3, join_date: '2022-07-20', title: '어린이집 추천' },
      { id: 4, join_date: '2022-07-20', title: '자유게시판' },
    ]}
  />
);

export const Board = Template.bind({});
