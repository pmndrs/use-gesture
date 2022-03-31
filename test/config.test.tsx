import { parse } from '../packages/core/src/config/resolver'
import { dragConfigResolver } from '../packages/core/src/config/dragConfigResolver'
import { pinchConfigResolver } from '../packages/core/src/config/pinchConfigResolver'
import { ConfigResolverMap } from '../packages/core/src/actions'
import { DragConfig, PinchConfig, CoordinatesConfig, Vector2 } from '../packages/core/src/types'
import { identity } from '../packages/core/src/config/commonConfigResolver'
import { wheelConfigResolver } from '../packages/core/src/config/wheelConfigResolver'

ConfigResolverMap.set('drag', dragConfigResolver)
ConfigResolverMap.set('pinch', pinchConfigResolver)
ConfigResolverMap.set('wheel', wheelConfigResolver)

describe('testing derived config', () => {
  describe('testing derived generic configuration', () => {
    test(`empty config should return default config`, () => {
      expect(parse({}).shared).toStrictEqual({
        enabled: true,
        target: undefined,
        transform: undefined,
        eventOptions: { capture: false, passive: true },
        window: window
      })
    })

    test(`derived passive is false if target is specified and config passive is false`, () => {
      const config = {
        target: document.createElement('div'),
        eventOptions: { passive: false }
      }
      expect(parse(config).shared).toHaveProperty('eventOptions.passive', false)
    })
  })

  describe('testing internal gesture configuration', () => {
    let config: CoordinatesConfig
    test(`derived threshold array is set when threshold is a number`, () => {
      config = { threshold: 10 }
      expect(parse(config, 'wheel').wheel).toHaveProperty('threshold', [10, 10])
    })

    test(`derived rubberband should be set to array, and defaulted when set to true`, () => {
      config = { rubberband: 0.3 }
      expect(parse(config, 'wheel').wheel).toHaveProperty('rubberband', [0.3, 0.3])
      config = { rubberband: true }
      expect(parse(config, 'wheel').wheel).toHaveProperty('rubberband', [0.15, 0.15])
    })
  })

  describe('testing drag configuration', () => {
    test(`empty config should return default drag config`, () => {
      expect(parse({}, 'drag').drag).toStrictEqual({
        enabled: true,
        device: 'pointer',
        bounds: [
          [-Infinity, Infinity],
          [-Infinity, Infinity]
        ],
        from: undefined,
        transform: identity,
        hasCustomTransform: false,
        preventDefault: false,
        triggerAllEvents: false,
        delay: 0,
        swipe: {
          distance: [50, 50],
          velocity: [0.5, 0.5],
          duration: 250
        },
        threshold: [0, 0],
        rubberband: [0, 0],
        axis: undefined,
        lockDirection: false,
        preventScrollDelay: undefined,
        preventScrollAxis: undefined,
        pointerButtons: 1,
        pointerLock: false,
        pointerCapture: true,
        filterTaps: false,
        tapsThreshold: 3,
        axisThreshold: { mouse: 0, pen: 8, touch: 0 }
      })
    })

    let dragConfig: DragConfig

    test(`derived threshold is set when filterTaps, lockDirection or axis are not falsey`, () => {
      dragConfig = { axis: 'lock' }
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('threshold', [1, 1])
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('axis', undefined)

      dragConfig = { filterTaps: true, axis: 'lock' }
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('threshold', [3, 3])

      dragConfig = { axis: 'y' }
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('threshold', [1, 1])
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('axis', 'y')
    })

    test(`derived delay is set to default when boolean`, () => {
      dragConfig = { delay: true }
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('delay', 180)
      dragConfig = { delay: false }
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('delay', 0)
    })

    test(`derived device is touch when pointer.touch is true`, () => {
      dragConfig = { pointer: { touch: true } }
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('device', 'touch')
    })

    test(`derived device properly handles touch and lock`, () => {
      dragConfig = { pointer: { touch: true, lock: true } }
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('device', 'touch')
      /**
       * @note unfortunately jsdom doesn't support pointer lock so device is
       * `pointer` but it should be `mouse`.
       */
      dragConfig.pointer.touch = false
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('device', 'pointer')
    })

    test(`derived axisThreshold is preoperly computer`, () => {
      const axisThreshold = { pen: 3, mouse: 2 }
      dragConfig = { axisThreshold }
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('axisThreshold', { mouse: 2, pen: 3, touch: 0 })
    })

    test(`derived transform is properly computed`, () => {
      const transform = ([x, y]: Vector2) => [x / 2, y / 4] as Vector2

      dragConfig = { transform }
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('transform', transform)
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('hasCustomTransform', true)
    })

    test(`derived preventScrollDelay and preventScrollAxis are properly computed`, () => {
      dragConfig = { preventScroll: true }
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('preventScrollDelay', 250)
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('preventScrollAxis', 'y')

      dragConfig = { preventScroll: 300 }
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('preventScrollDelay', 300)
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('preventScrollAxis', 'y')

      dragConfig = { preventScrollAxis: 'x' }
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('preventScrollDelay', 250)
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('preventScrollAxis', 'x')

      dragConfig = { preventScrollAxis: 'x', preventScroll: false }
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('preventScrollDelay', undefined)
      expect(parse(dragConfig, 'drag').drag).toHaveProperty('preventScrollAxis', undefined)
    })
  })

  describe('testing distance / angle configuration', () => {
    test(`empty config should return default distance / angle config`, () => {
      expect(parse({}, 'pinch').pinch).toStrictEqual({
        enabled: true,
        bounds: [
          [-Infinity, Infinity],
          [-Infinity, Infinity]
        ],
        device: 'pointer',
        transform: identity,
        hasCustomTransform: false,
        triggerAllEvents: false,
        preventDefault: false,
        lockDirection: false,
        from: undefined,
        threshold: [0, 0],
        rubberband: [0, 0],
        modifierKey: 'ctrlKey'
      })
    })

    let config: PinchConfig
    test(`derived bounds array matches [[distanceBounds], [angleBounds]]`, () => {
      config = { scaleBounds: { min: 0.5, max: 1 }, angleBounds: { min: 0, max: 270 } }
      expect(parse(config, 'pinch').pinch).toHaveProperty('bounds', [
        [0.5, 1],
        [0, 270]
      ])
    })

    test(`setting modifierKey to null should result in modifierKey being null`, () => {
      config = { modifierKey: null }
      expect(parse(config, 'pinch').pinch).toHaveProperty('modifierKey', null)
    })
  })
})
