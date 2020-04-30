import React, { useRef } from 'react'
import { clamp } from 'lodash'
import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './styles.css'

const pages = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
]

export default function Viewpager() {
  const index = useRef(0)
  const [props, set] = useSprings(pages.length, i => ({
    x: i * window.innerWidth,
    scale: 1,
    display: 'block',
  }))
  const bind = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
    if (down && distance > window.innerWidth / 2) {
      index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)
      cancel()
    }

    // @ts-ignore check with react-spring
    set(i => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
      const x = (i - index.current) * window.innerWidth + (down ? mx : 0)
      const scale = down ? 1 - distance / window.innerWidth / 2 : 1
      return { x, scale, display: 'block' }
    })
  })
  return (
    <div className="flex-content viewpager">
      {props.map(({ x, display, scale }, i) => (
        <animated.div {...bind()} key={i} style={{ display, x }}>
          <animated.div style={{ scale, backgroundImage: `url(${pages[i]})` }} />
        </animated.div>
      ))}
    </div>
  )
}
