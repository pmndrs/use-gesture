// Original: https://github.com/chenglou/react-motion/tree/master/demos/demo8-draggable-list
import React, { useRef } from 'react'
import { clamp } from 'lodash'
// @ts-ignore
import swap from 'lodash-move'
import { useDrag } from 'react-use-gesture'
import { useSprings, animated } from 'react-spring'
import styles from './styles.css'

// Returns fitting styles for dragged/idle items
const fn = (order: number[], down?: boolean, originalIndex?: number, curIndex?: number, y?: number) => (
  index: number
) =>
  down && index === originalIndex
    ? {
        y: curIndex! * 100 + y!,
        scale: 1.1,
        zIndex: '1',
        shadow: 15,
        immediate: (n: string) => n === 'y' || n === 'zIndex',
      }
    : {
        y: order.indexOf(index) * 100,
        scale: 1,
        zIndex: '0',
        shadow: 1,
        immediate: false,
      }

export default function DraggableList({ items = 'Lorem ipsum dolor sit'.split(' ') }) {
  const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
  const [springs, setSprings] = useSprings(items.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useDrag(({ args: [originalIndex], down, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1)
    const newOrder = swap(order.current, curIndex, curRow)
    setSprings(fn(newOrder, down, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
    if (!down) order.current = newOrder
  })
  return (
    <div className={`${styles.dragList} flex`} style={{ height: items.length * 100 }}>
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          style={{
            // @ts-ignore (probably a bug with react-spring types)
            zIndex,
            boxShadow: shadow.to(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
            y,
            scale,
          }}
          children={items[i]}
        />
      ))}
    </div>
  )
}
