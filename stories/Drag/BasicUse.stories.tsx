import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import { useDrag } from '../../src/hooks/useDrag'
import { useSpring, animated } from 'react-spring'

export default {
  title: 'Drag/Basic Use',
} as Meta

export const UsingMovement = () => {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    set({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
  })
  return <animated.div className="drag" {...bind()} style={{ x, y }} />
}

export const UsingOffset = () => {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(({ offset: [x, y] }) => {
    set({ x, y, immediate: true })
  })
  return <animated.div className="drag" {...bind()} style={{ x, y }} />
}
