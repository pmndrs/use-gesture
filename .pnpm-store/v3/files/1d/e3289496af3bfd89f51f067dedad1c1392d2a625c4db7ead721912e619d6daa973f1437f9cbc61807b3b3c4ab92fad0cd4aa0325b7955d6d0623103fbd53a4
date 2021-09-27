import React from 'react'
import { Story, Meta } from '@storybook/react'

import Reset from '../components/decorator-reset'

import { useControls } from '../../src'

export default {
  title: 'Inputs/Select',
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
  value: 'x',
  options: ['x', 'y'],
}

export const CustomLabels = Template.bind({})
CustomLabels.args = {
  value: 'helloWorld',
  options: {
    'Hello World': 'helloWorld',
    'Leva is awesome!': 'leva',
  },
}

export const InferredValueAsOption = Template.bind({})
InferredValueAsOption.args = {
  value: true,
  options: [false],
}

export const DifferentOptionTypes = Template.bind({})
DifferentOptionTypes.args = {
  value: undefined,
  options: ['x', 'y', ['x', 'y']],
}

const IconA = () => <span>IconA</span>
const IconB = () => <span>IconB</span>

export const FunctionAsOptions = () => {
  const values = useControls({
    foo: { options: { none: '', IconA, IconB } },
  })

  return (
    <div>
      <pre>{values.foo.toString()}</pre>
    </div>
  )
}
