/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MapComponent from '@src/Container/Page/Map';

// import '@types/navermaps';

export default {
  title: 'Container/Map',
  component: MapComponent,

  parameters: { layout: 'fullscreen' },
} as ComponentMeta<typeof MapComponent>;

const Template: ComponentStory<typeof MapComponent> = (args) => (
  <MapComponent {...args} />
);

export const Map = Template.bind({});
