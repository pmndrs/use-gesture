import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { useDrag } from '../../src/hooks/useDrag'
import { useSpring, animated } from 'react-spring'

import './bounds.css'

export default {
  title: 'Drag',
} as Meta

export const FilterTaps = () => {
  const [style, set] = useSpring(() => ({ x: 0, y: 0 }))
  const [dragged, setDragged] = React.useState(false)

  const bind = useDrag(
    ({ active, offset: [x, y] }) => {
      setDragged(active)
      set({ x, y, immediate: true })
    },
    { filterTaps: true }
  )

  return (
    <animated.div className="drag large flex" {...bind()} style={style}>
      <button onClick={() => alert('button clicked')} style={{ width: 160, height: 160 }}>
        {dragged ? `Dragged: won't respond to click` : 'Click Me'}
      </button>
    </animated.div>
  )
}
