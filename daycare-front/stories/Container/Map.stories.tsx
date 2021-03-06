/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MapComponent from '@src/Container/Page/Map';
import { Provider } from 'react-redux';
import { makeStore } from '@src/Store/store';

// import '@types/navermaps';

export default {
  title: 'Container/Map',
  component: MapComponent,

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
} as ComponentMeta<typeof MapComponent>;

const Template: ComponentStory<typeof MapComponent> = (args) => (
  <MapComponent {...args} />
);

export const Map = Template.bind({});
