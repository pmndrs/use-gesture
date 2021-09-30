import React from 'react'
import Reset from './components/decorator-reset'
import { Story, Meta } from '@storybook/react'

import { useControls } from '../src'

export default {
  title: 'Hook/Caching',
  decorators: [Reset],
} as Meta

const Controls = () => {
  const values = useControls({ num: 10, color: '#f00' })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

const Template: Story<any> = () => {
  const [mounted, toggle] = React.useState(true)
  return (
    <div>
      <button onClick={() => toggle((t) => !t)}>{mounted ? 'Unmount' : 'Mount'}</button>
      {mounted && <Controls />}
    </div>
  )
}

export const Caching = Template.bind({})
