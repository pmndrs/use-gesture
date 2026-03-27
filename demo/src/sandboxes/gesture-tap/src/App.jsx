import React from 'react'
import { useTap } from '@use-gesture/react'
import { a, useSpring } from '@react-spring/web'
import { useControls } from 'leva'

import styles from './styles.module.css'

function Tappable() {
  const [gestureType, setGestureType] = React.useState('none')
  const [tapCount, setTapCount] = React.useState(0)

  const { tapDiscrimination, tapTimeout, longPressTimeout, moveThreshold } = useControls({
    tapDiscrimination: true,
    tapTimeout: { value: 250, step: 50, min: 100, max: 500 },
    longPressTimeout: { value: 500, step: 100, min: 200, max: 1000 },
    moveThreshold: { value: 10, step: 5, min: 5, max: 50 }
  })

  const [style, api] = useSpring(() => ({ scale: 1, backgroundColor: '#ec625c' }))

  const bind = useTap(
    ({ singleTap, doubleTap, longPress, tapCount: count, xy, tapping }) => {
      setTapCount(count)

      if (longPress) {
        setGestureType('longPress')
        api.start({ scale: 1.3, backgroundColor: '#f472b6' })
        setTimeout(() => {
          api.start({ scale: 1, backgroundColor: '#ec625c' })
        }, 300)
      } else if (doubleTap) {
        setGestureType('doubleTap')
        api.start({ scale: 1.2, backgroundColor: '#60a5fa' })
        setTimeout(() => {
          api.start({ scale: 1, backgroundColor: '#ec625c' })
        }, 300)
      } else if (singleTap) {
        setGestureType('singleTap')
        api.start({ scale: 0.9, backgroundColor: '#4ade80' })
        setTimeout(() => {
          api.start({ scale: 1, backgroundColor: '#ec625c' })
        }, 150)
      }

      // Reset after showing feedback
      if (singleTap || doubleTap || longPress) {
        setTimeout(() => setGestureType('none'), 1000)
      }
    },
    {
      tapDiscrimination,
      tapTimeout,
      longPressTimeout,
      moveThreshold
    }
  )

  const getLabel = () => {
    if (gestureType === 'singleTap') return 'Single Tap!'
    if (gestureType === 'doubleTap') return 'Double Tap!'
    if (gestureType === 'longPress') return 'Long Press!'
    return 'Tap me'
  }

  return (
    <>
      <a.div tabIndex={-1} {...bind()} className={`${styles.tap} ${styles[gestureType]}`} style={style}>
        <div>
          <span>{getLabel()}</span>
          <span>count: {tapCount}</span>
        </div>
      </a.div>
      <div className={styles.status}>
        <span>Single Tap: {gestureType === 'singleTap' ? '✓' : '-'}</span>
        <span>Double Tap: {gestureType === 'doubleTap' ? '✓' : '-'}</span>
        <span>Long Press: {gestureType === 'longPress' ? '✓' : '-'}</span>
      </div>
      <div className={styles.info}>
        <p>Try: single tap, double tap, or hold for long press</p>
        <p>Use Leva controls to adjust timing thresholds</p>
      </div>
    </>
  )
}

export default function App() {
  return (
    <div className="flex fill center">
      <Tappable />
    </div>
  )
}
