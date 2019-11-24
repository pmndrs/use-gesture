import { getInternalGenericOptions, getInternalDragOptions } from '../src/utils/config'
import { DragConfig, GenericOptions } from '../src/types'

describe('testing derived config', () => {
  describe('testing derived generic configuration', () => {
    test(`empty config should return default config`, () => {
      expect(getInternalGenericOptions(undefined)).toStrictEqual({
        enabled: true,
        domTarget: undefined,
        captureString: '',
        eventOptions: { capture: false, passive: true },
        pointer: false,
        window: window,
      })
    })
    test(`derived passive is true if target isn't specified`, () => {
      let config: Partial<GenericOptions> = { eventOptions: { capture: false } }
      expect(getInternalGenericOptions(config)).toHaveProperty('eventOptions.passive', true)
      config = { eventOptions: { passive: false } }
      expect(getInternalGenericOptions(config)).toHaveProperty('eventOptions.passive', true)
    })

    test(`derived passive is false if target is specified and config passive is false`, () => {
      const config = {
        domTarget: document.createElement('div'),
        eventOptions: { passive: false },
      }
      expect(getInternalGenericOptions(config)).toHaveProperty('eventOptions.passive', false)
    })

    test(`derived pointer is set to true in derived config when true in eventOptions`, () => {
      const config = { eventOptions: { pointer: true } }
      expect(getInternalGenericOptions(config)).toHaveProperty('pointer', true)
    })
  })

  describe('testing drag configuration', () => {
    test(`empty config should return default drag config`, () => {
      expect(getInternalDragOptions(undefined)).toStrictEqual({
        enabled: true,
        bounds: [
          [Infinity, Infinity],
          [Infinity, Infinity],
        ],
        delay: 0,
        swipeDistance: [100, 100],
        swipeVelocity: [0.5, 0.5],
        threshold: [0, 0],
        rubberband: [0, 0],
        axis: undefined,
        lockDirection: false,
        filterClicks: false,
      })
    })

    let dragConfig: Partial<DragConfig>
    test(`derived threshold array is set when threshold is a number`, () => {
      dragConfig = { threshold: 10 }
      expect(getInternalDragOptions(dragConfig)).toHaveProperty('threshold', [10, 10])
    })

    test(`derived threshold is set when filterClicks, lockDirection or axis are not falsey`, () => {
      dragConfig = { lockDirection: true }
      expect(getInternalDragOptions(dragConfig)).toHaveProperty('threshold', [1, 1])

      dragConfig = { filterClicks: true, lockDirection: true }
      expect(getInternalDragOptions(dragConfig)).toHaveProperty('threshold', [3, 3])

      dragConfig = { axis: 'y' }
      expect(getInternalDragOptions(dragConfig)).toHaveProperty('threshold', [1, 1])
    })

    test(`filterClicks is set to true when threshold is positive`, () => {
      dragConfig = { threshold: [0, 1] }
      expect(getInternalDragOptions(dragConfig)).toHaveProperty('filterClicks', true)
    })

    test(`derived delay is set to default when boolean`, () => {
      dragConfig = { delay: true }
      expect(getInternalDragOptions(dragConfig)).toHaveProperty('delay', 180)
      dragConfig = { delay: false }
      expect(getInternalDragOptions(dragConfig)).toHaveProperty('delay', 0)
    })
  })
})
