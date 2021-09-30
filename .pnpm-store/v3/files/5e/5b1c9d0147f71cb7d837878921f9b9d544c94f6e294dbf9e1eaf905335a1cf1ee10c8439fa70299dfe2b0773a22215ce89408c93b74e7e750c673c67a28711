import React from 'react'
import { Story, Meta } from '@storybook/react'

import Reset from '../components/decorator-reset'

import { useControls } from '../../src'

export default {
  title: 'Inputs/Number',
  decorators: [Reset],
} as Meta

const Template: Story<any> = (args) => {
  const values = useControls({
    foo: args,
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Simple = Template.bind({})
Simple.args = {
  value: 1,
}

export const MinMax = Template.bind({})
MinMax.args = {
  value: 1,
  min: 0,
  max: 10,
}

export const WithValueOverflow = Template.bind({})
WithValueOverflow.args = {
  value: 100,
  min: 0,
  max: 10,
}

export const Step = Template.bind({})
Step.args = {
  value: 10,
  step: 0.25,
}

export const Suffix = Template.bind({})
Suffix.args = { value: '10px' }

export const Complete = Template.bind({})
Complete.args = {
  value: 5,
  min: 0,
  max: 10,
  step: 1,
  suffix: 'px',
}
