import React from 'react'
import Reset from './components/decorator-reset'
import { Story, Meta } from '@storybook/react'

import { Leva, folder, useControls } from '../src'

export default {
  title: 'Misc/Panel options',
  decorators: [Reset],
} as Meta

const Template: Story<any> = (args) => {
  const values = useControls({
    number: 3,
    color: 'lightblue',
    folder: folder({
      select: { value: 'something', options: ['else'] },
    }),
  })

  return (
    <div>
      <Leva {...args} />
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}
export const Collapsed = Template.bind({})
Collapsed.args = { collapsed: true }

export const CollapsedControlled: Story<any> = (args, context) => {
  const [collapsed, setCollapsed] = React.useState(true)
  return Template(
    {
      collapsed: {
        collapsed,
        onChange: (collapsed) => {
          setCollapsed(collapsed)
        },
      },
    },
    context
  )
}

export const OneLineLabels = Template.bind({})
OneLineLabels.args = { oneLineLabels: true }

export const HideTitleBar = Template.bind({})
HideTitleBar.args = { titleBar: false }

export const Fill = Template.bind({})
Fill.args = { fill: true }

export const Flat = Template.bind({})
Flat.args = { flat: true }

export const HideCopyButton = Template.bind({})
HideCopyButton.args = { hideCopyButton: true }

export const Title: Story<any> = (args, context) => {
  return Template({ titleBar: { title: args.title } }, context)
}
Title.args = { title: 'Custom title' }

export const Drag: Story<any> = (args, context) => {
  return Template({ titleBar: { drag: args.drag } }, context)
}
Drag.args = { drag: true }

export const Filter: Story<any> = (args, context) => {
  return Template({ titleBar: { filter: args.filter } }, context)
}
Filter.args = { filter: true }
