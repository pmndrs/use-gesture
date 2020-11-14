// Original: https://github.com/chenglou/react-motion/tree/master/demos/demo8-draggable-list
import React, { useRef, useCallback } from 'react'
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

  const move = useCallback(
    ({ args: [originalIndex], down, movement: [, y] }) => {
      const curIndex = order.current.indexOf(originalIndex)
      const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1)
      const newOrder = swap(order.current, curIndex, curRow)
      setSprings(fn(newOrder, down, originalIndex, curIndex, y))
      if (!down) order.current = newOrder
    },
    [setSprings, items.length]
  )

  const bind = useDrag(
    ({ event, first, last, distance, cancel, canceled, ...state }) => {
      console.log('drag', first)
      move(state)
    },
    { experimental_preventWindowScrollY: true }
  )

  return (
    <>
      <div className={`${styles.dragList} flex`}>
        <div className="flex" style={{ marginTop: -300 }}>
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
      </div>
      <div style={{ marginTop: -100, padding: 40 }}>
        I'm baby letterpress iPhone skateboard gochujang man bun leggings. Thundercats activated charcoal hella iceland
        cloud bread blue bottle, selfies pop-up live-edge shabby chic raclette food truck. Jean shorts kitsch irony
        mlkshk, vinyl tilde shabby chic vice banh mi bitters keytar. Ethical direct trade vegan, lyft taxidermy YOLO
        adaptogen chillwave whatever. Flexitarian shaman wayfarers affogato, meh fanny pack snackwave squid paleo
        humblebrag. Copper mug shaman crucifix viral la croix tacos. Next level listicle tattooed hot chicken, cronut
        locavore cliche. Mumblecore pug tousled hot chicken 3 wolf moon listicle. Marfa artisan pitchfork, banh mi
        slow-carb godard farm-to-table hammock kombucha intelligentsia viral.
      </div>
    </>
  )
}
