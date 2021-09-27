import React from 'react';
import { Story, Meta } from '@storybook/react';

import Reset from '../components/decorator-reset'

import { useControls } from '../../src';

export default {
  title: 'Inputs/Boolean',
  decorators: [Reset]
} as Meta;

const Template: Story<any> = (args) => {
  const values = useControls({
    foo: args,
  })
  
  return <div><pre>{JSON.stringify(values, null, '  ')}</pre></div>;
}

export const Default = Template.bind({});
Default.args = {
  value: false
};

export const Checked = Template.bind({});
Checked.args = {
  value: true
};
