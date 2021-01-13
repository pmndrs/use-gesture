import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import { useDrag } from '../../src/hooks/useDrag'
import { useSpring, animated } from 'react-spring'

import './bounds.css'

export default {
  title: 'Drag',
} as Meta

export const Threshold = () => {
  const [spring, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(
    ({ down, offset: [x, y] }) => {
      set({ x, y, immediate: down })
    },
    { threshold: 100 }
  )
  return <animated.div className="drag" {...bind()} style={spring} />
}
