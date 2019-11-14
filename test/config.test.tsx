import { getGenericConfig, getDragConfig } from '../src/utils/config'
import { DragConfig } from '../src/types'

describe('testing derived config', () => {
  describe('testing derived generic configuration', () => {
    test(`derived passive is true if target isn't specified`, () => {
      const config = { eventOptions: { passive: false } }
      expect(getGenericConfig(config)).toHaveProperty('eventOptions.passive', true)
    })

    test(`derived passive is false if target is specified and config passive is false`, () => {
      const config = {
        domTarget: document.createElement('div'),
        eventOptions: { passive: false },
      }
      expect(getGenericConfig(config)).toHaveProperty('eventOptions.passive', false)
    })

    test(`derived pointer is set to true in derived config when true in eventOptions`, () => {
      const config = { eventOptions: { pointer: true } }
      expect(getGenericConfig(config)).toHaveProperty('pointer', true)
    })
  })

  describe('testing drag configuration', () => {
    let dragConfig: Partial<DragConfig>
    test(`derived threshold array is set when threshold is a number`, () => {
      dragConfig = { threshold: 10 }
      expect(getDragConfig(dragConfig)).toHaveProperty('threshold', [10, 10])
    })

    test(`derived threshold is set when filterClicks, lockDirection or axis are not falsey`, () => {
      dragConfig = { lockDirection: true }
      expect(getDragConfig(dragConfig)).toHaveProperty('threshold', [1, 1])

      dragConfig = { filterClicks: true, lockDirection: true }
      expect(getDragConfig(dragConfig)).toHaveProperty('threshold', [3, 3])

      dragConfig = { axis: 'y' }
      expect(getDragConfig(dragConfig)).toHaveProperty('threshold', [1, 1])
    })

    test(`filterClicks is set to true when threshold is positive`, () => {
      dragConfig = { threshold: [0, 1] }
      expect(getDragConfig(dragConfig)).toHaveProperty('filterClicks', true)
    })

    test(`derived delay is set to default when boolean`, () => {
      dragConfig = { delay: true }
      expect(getDragConfig(dragConfig)).toHaveProperty('delay', 180)
      dragConfig = { delay: false }
      expect(getDragConfig(dragConfig)).toHaveProperty('delay', 0)
    })
  })
})
