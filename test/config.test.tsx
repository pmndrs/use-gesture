import {
  getInternalGenericOptions,
  getInternalDragOptions,
  getInternalDistanceAngleOptions,
  getInternalGestureOptions,
} from '../src/utils/config'
import { DragConfig, DistanceAngleConfig, GestureOptions } from '../src/types'

describe('testing derived config', () => {
  describe('testing derived generic configuration', () => {
    test(`empty config should return default config`, () => {
      expect(getInternalGenericOptions(undefined)).toStrictEqual({
        enabled: true,
        domTarget: undefined,
        eventOptions: { capture: false, passive: true },
        window: window,
      })
    })

    test(`derived passive is false if target is specified and config passive is false`, () => {
      const config = {
        domTarget: document.createElement('div'),
        eventOptions: { passive: false },
      }
      expect(getInternalGenericOptions(config)).toHaveProperty('eventOptions.passive', false)
    })
  })

  describe('testing internal gesture configuration', () => {
    let config: GestureOptions<'drag'>
    test(`derived threshold array is set when threshold is a number`, () => {
      config = { threshold: 10 }
      expect(getInternalGestureOptions(config)).toHaveProperty('threshold', [10, 10])
    })

    test(`derived rubberband should be set to array, and defaulted when set to true`, () => {
      config = { rubberband: 0.3 }
      expect(getInternalGestureOptions(config)).toHaveProperty('rubberband', [0.3, 0.3])
      config = { rubberband: true }
      expect(getInternalGestureOptions(config)).toHaveProperty('rubberband', [0.15, 0.15])
    })
  })

  describe('testing drag configuration', () => {
    test(`empty config should return default drag config`, () => {
      expect(getInternalDragOptions(undefined)).toStrictEqual({
        enabled: true,
        bounds: [
          [-Infinity, Infinity],
          [-Infinity, Infinity],
        ],
        triggerAllEvents: false,
        delay: 0,
        swipeDistance: [60, 60],
        swipeVelocity: [0.5, 0.5],
        threshold: [0, 0],
        rubberband: [0, 0],
        axis: undefined,
        initial: [0, 0],
        lockDirection: false,
        experimental_preventWindowScrollY: false,
        filterTaps: false,
      })
    })

    let dragConfig: DragConfig

    test(`derived threshold is set when filterTaps, lockDirection or axis are not falsey`, () => {
      dragConfig = { lockDirection: true }
      expect(getInternalDragOptions(dragConfig)).toHaveProperty('threshold', [1, 1])

      dragConfig = { filterTaps: true, lockDirection: true }
      expect(getInternalDragOptions(dragConfig)).toHaveProperty('threshold', [3, 3])

      dragConfig = { axis: 'y' }
      expect(getInternalDragOptions(dragConfig)).toHaveProperty('threshold', [1, 1])
    })

    test(`filterTaps is set to true when threshold is positive`, () => {
      dragConfig = { threshold: [0, 1] }
      expect(getInternalDragOptions(dragConfig)).toHaveProperty('filterTaps', true)
    })

    test(`derived delay is set to default when boolean`, () => {
      dragConfig = { delay: true }
      expect(getInternalDragOptions(dragConfig)).toHaveProperty('delay', 180)
      dragConfig = { delay: false }
      expect(getInternalDragOptions(dragConfig)).toHaveProperty('delay', 0)
    })
  })

  describe('testing distance / angle configuration', () => {
    test(`empty config should return default distance / angle config`, () => {
      expect(getInternalDistanceAngleOptions(undefined)).toStrictEqual({
        enabled: true,
        bounds: [
          [-Infinity, Infinity],
          [-Infinity, Infinity],
        ],
        triggerAllEvents: false,
        initial: [0, 0],
        threshold: [0, 0],
        rubberband: [0, 0],
      })
    })

    let config: DistanceAngleConfig<'pinch'>
    test(`derived bounds array matches [[distanceBounds], [angleBounds]]`, () => {
      config = { distanceBounds: { min: -100, max: 200 }, angleBounds: { min: -50, max: 60 } }
      expect(getInternalDistanceAngleOptions(config)).toHaveProperty('bounds', [
        [-100, 200],
        [-50, 60],
      ])
    })
  })
})
