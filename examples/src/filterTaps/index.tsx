import React, { useState } from 'react'
import { a, useSpring } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import styles from './styles.css'

const Button = ({ text }: { text: string }) => <button onClick={() => alert('button clicked')}>{text}</button>

export default function FilterTaps() {
  const [dragged, setDragged] = useState(false)
  const [style, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(
    ({ _active, active, offset: [x, y], tap }) => {
      setDragged(active)
      set({ x, y, immediate: true })
    },
    { filterTaps: true }
  )
  return (
    <div className="flex">
      <a.div className={styles.drag} {...bind()} style={style}>
        <Button text={dragged ? `Dragged: won't respond to click` : 'Click Me'} />
      </a.div>
    </div>
  )
}
