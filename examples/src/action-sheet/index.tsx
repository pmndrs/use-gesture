import React, { useRef } from 'react'
import { useSpring, a, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import styles from './styles.css'

const items = ['save item', 'open item', 'share item', 'delete item', 'cancel']
const height = items.length * 60 + 80

export default function ActionSheet() {
  const draggingRef = useRef(false)
  const [{ y }, set] = useSpring(() => ({ y: height }))

  const open = (canceled?: boolean) => {
    // when cancel is true, it means that the user passed the upwards threshold
    // so we change the spring config to create a nice wobbly effect
    set({ y: 0, config: canceled ? config.wobbly : config.stiff })
  }
  const close = (velocity = 0) => {
    set({ y: height, config: { ...config.stiff, velocity } })
  }

  const bind = useDrag(
    ({ first, last, vxvy: [, vy], movement: [, my], cancel, canceled }) => {
      if (first) draggingRef.current = true
      // if this is not the first or last frame, it's a moving frame
      // then it means the user is dragging
      else if (last) setTimeout(() => (draggingRef.current = false), 0)

      // if the user drags up passed a threshold, then we cancel
      // the drag so that the sheet resets to its open position
      if (my < -70) cancel()

      // when the user releases the sheet, we check whether it passed
      // the threshold for it to close, or if we reset it to its open positino
      if (last) my > height * 0.75 || vy > 0.5 ? close(vy) : open(canceled)
      // when the user keeps dragging, we just move the sheet according to
      // the cursor position
      else set({ y: my, immediate: false, config: config.stiff })
    },
    { initial: () => [0, y.get()], bounds: { top: 0 }, rubberband: true }
  )

  const display = y.to(py => (py < height ? 'block' : 'none'))

  const bgStyle = {
    transform: y.to([0, height], ['translateY(-8%) scale(1.16)', 'translateY(0px) scale(1)']),
    opacity: y.to([0, height], [0.4, 1], 'clamp'),
    // TODO check this on react-spring
    // touchAction: y.to(v => (v > 0 ? 'auto' : 'none')),
  }
  return (
    <div className={styles.wrapper}>
      <a.div className={styles.bg} onClick={() => close()} style={bgStyle}>
        <img
          src="https://images.pexels.com/photos/1170831/pexels-photo-1170831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/1657110/pexels-photo-1657110.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=650&w=940"
          alt=""
        />
      </a.div>
      <div className={styles.actionBtn} onClick={() => open()} />
      <a.div className={styles.sheet} {...bind()} style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}>
        {items.map(entry => (
          <div key={entry} onClick={() => !draggingRef.current && close()} children={entry} />
        ))}
      </a.div>
    </div>
  )
}
