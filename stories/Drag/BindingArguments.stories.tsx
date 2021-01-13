import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import { useDrag } from '../../src/hooks/useDrag'
import { useSprings, animated } from 'react-spring'

import './bounds.css'

export default {
  title: 'Drag/Binding With Arguments',
} as Meta

export const Example = () => {
  const [spring, set] = useSprings(2, () => ({ x: 0, y: 0 }))
  const bind = useDrag(
    ({ args: [idx], down, movement: [x, y] }) => {
      set(i => i === idx && { x, y, immediate: down })
    },
    { initial: ({ args: [idx] }) => [spring[idx].x.get(), spring[idx].y.get()] }
  )
  return (
    <>
      <animated.div className="drag" {...bind(0)} style={spring[0]} />
      <animated.div className="drag blue" {...bind(1)} style={spring[1]} />
    </>
  )
}
