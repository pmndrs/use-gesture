import React from 'react'
import { Story, Meta } from '@storybook/react'

import Reset from '../components/decorator-reset'

import { useControls } from '../../src'

export default {
  title: 'Inputs/Image',
  decorators: [Reset],
} as Meta

const Template: Story<any> = (args = undefined) => {
  const values = useControls({ foo: args }) as any

  return (
    <div>
      <img src={values.foo} alt="" width="200" />
    </div>
  )
}

export const Image = Template.bind({})
Image.args = { image: undefined }
