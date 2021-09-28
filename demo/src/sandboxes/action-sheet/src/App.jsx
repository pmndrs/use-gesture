import React from 'react'
import { useDrag } from '@use-gesture/react'
import { a, useSpring, config } from '@react-spring/web'

import styles from './styles.module.css'

const items = ['save item', 'open item', 'share item', 'delete item', 'cancel']
const height = items.length * 60 + 80

export default function App() {
  const [{ y }, api] = useSpring(() => ({ y: height }))

  const open = ({ canceled }) => {
    // when cancel is true, it means that the user passed the upwards threshold
    // so we change the spring config to create a nice wobbly effect
    api.start({ y: 0, immediate: false, config: canceled ? config.wobbly : config.stiff })
  }
  const close = (velocity = 0) => {
    api.start({ y: height, immediate: false, config: { ...config.stiff, velocity } })
  }

  const bind = useDrag(
    ({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel, canceled }) => {
      // if the user drags up passed a threshold, then we cancel
      // the drag so that the sheet resets to its open position
      if (my < -70) cancel()

      // when the user releases the sheet, we check whether it passed
      // the threshold for it to close, or if we reset it to its open positino
      if (last) {
        my > height * 0.5 || (vy > 0.5 && dy > 0) ? close(vy) : open({ canceled })
      }
      // when the user keeps dragging, we just move the sheet according to
      // the cursor position
      else api.start({ y: my, immediate: true })
    },
    { from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
  )

  const display = y.to((py) => (py < height ? 'block' : 'none'))

  const bgStyle = {
    transform: y.to([0, height], ['translateY(-8%) scale(1.16)', 'translateY(0px) scale(1.05)']),
    opacity: y.to([0, height], [0.4, 1], 'clamp')
  }
  return (
    <div className="flex" style={{ overflow: 'hidden' }}>
      <a.div className={styles.bg} onClick={() => close()} style={bgStyle}>
        <img
          src="https://images.pexels.com/photos/1239387/pexels-photo-1239387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/5181179/pexels-photo-5181179.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
        />
      </a.div>
      <div className={styles.actionBtn} onClick={open} />
      <a.div className={styles.sheet} {...bind()} style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}>
        {items.map((entry, i) => (
          <div
            key={entry}
            onClick={() => (i < items.length - 1 ? alert('clicked on ' + entry) : close())}
            children={entry}
          />
        ))}
      </a.div>
    </div>
  )
}
