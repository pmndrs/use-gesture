import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import { useDrag } from '../../src/hooks/useDrag'
import { useSpring, animated } from 'react-spring'

import './bounds.css'

export default {
  title: 'Drag/Axis',
} as Meta

export const AxisX = () => {
  const [spring, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(
    ({ down, offset: [x, y] }) => {
      set({ x, y, immediate: down })
    },
    { axis: 'x' }
  )
  return <animated.div className="drag" {...bind()} style={spring} />
}

export const LockDirection = () => {
  const [spring, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(
    ({ down, offset: [x, y] }) => {
      set({ x, y, immediate: down })
    },
    { lockDirection: true }
  )
  return <animated.div className="drag" {...bind()} style={spring} />
}
