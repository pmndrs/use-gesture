import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import { useDrag } from '../../src/hooks/useDrag'
import { useSpring, animated } from 'react-spring'

import './bounds.css'

export default {
  title: 'Drag/Bounds',
} as Meta

export const Bounds = () => {
  const [spring, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(
    ({ down, offset: [x, y] }) => {
      set({ x, y, immediate: down })
    },
    { bounds: { left: -90, right: 90, top: -55, bottom: 55 } }
  )
  return (
    <>
      <div className="limits" />
      <animated.div className="drag" {...bind()} style={spring} />
    </>
  )
}

export const WithRubberband = () => {
  const [spring, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(
    ({ down, offset: [x, y] }) => {
      set({ x, y, immediate: down })
    },
    { bounds: { left: -90, right: 90, top: -55, bottom: 55 }, rubberband: true }
  )
  return (
    <>
      <div className="limits" />
      <animated.div className="drag" {...bind()} style={spring} />
    </>
  )
}

export const BoundsWithFunction = () => {
  const boundsRef = React.useRef<HTMLDivElement>()
  const dragRef = React.useRef<HTMLDivElement>()
  const [spring, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(
    ({ down, offset: [x, y] }) => {
      set({ x, y, immediate: down })
    },
    {
      bounds: () => {
        const { clientWidth: w, clientHeight: h } = boundsRef.current
        const { offsetWidth: ww, offsetHeight: hh } = dragRef.current
        return { left: -(w - ww) / 2, right: (w - ww) / 2, top: -(h - hh) / 2, bottom: (h - hh) / 2 }
      },
    }
  )
  return (
    <>
      <div ref={boundsRef} className="limits" />
      <animated.div ref={dragRef} className="drag" {...bind()} style={spring} />
    </>
  )
}
