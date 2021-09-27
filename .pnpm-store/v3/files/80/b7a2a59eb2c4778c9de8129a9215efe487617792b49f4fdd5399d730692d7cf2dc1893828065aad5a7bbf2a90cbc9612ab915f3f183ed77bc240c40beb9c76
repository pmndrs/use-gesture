import React from 'react'
import { Story, Meta } from '@storybook/react'

import Reset from '../../leva/stories/components/decorator-reset'
import { useControls } from '../../leva/src'

import { spring } from './index'

export default {
  title: 'Plugins/Spring',
  decorators: [Reset],
} as Meta

const Template: Story<any> = (args) => {
  const values = useControls(
    {
      bar: spring({ tension: 100, friction: 30 }),
    },
    args
  )

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Spring = Template.bind({})
Spring.args = {}
