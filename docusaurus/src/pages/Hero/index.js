import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
// import { toast } from 'react-toastify'

import GUI, { initialConfig } from './GUI'

// import 'react-toastify/dist/ReactToastify.css'
import styles from './styles.module.css'

// toast.configure({
//   position: 'bottom-right',
//   pauseOnHover: false,
//   draggable: false
// })

export default function Example() {
  const [config, setConfig] = React.useState(initialConfig)
  const [props, set] = useSpring(() => ({ x: 0, y: 0, scale: 1 }))

  const {
    gesture,
    threshold,
    swipeDist,
    swipeVel,
    pointer,
    bounds,
    activateBounds,
    rubberband,
    ...rest
  } = config

  const bind = useDrag(
    ({
      delta,
      dragging,
      first,
      last,
      click,
      currentTarget,
      swipe: [swipeX, swipeY],
      down,
      elapsedTime,
      movement: [mx, my],
      offset: [x, y]
    }) => {
      // if (click) toast('Click!')
      // if (swipeX) toast(`Swipe ${swipeX > 0 ? 'Right' : 'Left'}`)
      // if (swipeY) toast(`Swipe ${swipeY > 0 ? 'Bottom' : 'Top'}`)

      if (gesture === 'movement')
        set({ x: down ? mx : 0, y: down ? my : 0, scale: down ? 1.2 : 1 })
      else set({ x, y, scale: down ? 1.2 : 1 })
    },
    {
      eventOptions: { pointer },
      ...rest,
      swipeVelocity: [swipeVel, swipeVel],
      swipeDistance: [swipeDist, swipeDist],
      threshold: threshold < 0 ? undefined : [threshold, threshold],
      bounds: activateBounds ? bounds : undefined,
      rubberband: activateBounds ? rubberband : 0
    }
  )

  return (
    <>
      <GUI data={config} onUpdate={setConfig} />
      <div className={styles.wrapper}>
        {activateBounds && (
          <div
            className={styles.bounds}
            style={{
              width: bounds.right - bounds.left,
              height: bounds.bottom - bounds.top,
              transform: `translate3d(${bounds.left}, ${bounds.top})`
            }}
          ></div>
        )}
        <animated.div {...bind()} className={styles.drag} style={props} />
      </div>
    </>
  )
}
