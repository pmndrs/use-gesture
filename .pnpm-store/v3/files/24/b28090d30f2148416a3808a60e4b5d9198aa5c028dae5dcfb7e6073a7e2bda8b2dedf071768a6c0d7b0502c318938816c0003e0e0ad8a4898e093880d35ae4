import React from 'react'
import { Meta } from '@storybook/react'

import Reset from '../components/decorator-reset'

import { useControls, button } from '../../src'

export default {
  title: 'Inputs/Button',
  decorators: [Reset],
} as Meta

export const Button = () => {
  const values = useControls({
    foo: button(() => alert('click')),
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}
