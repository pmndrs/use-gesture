import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getScrollEventData } from '../utils'
import { genericEndState } from '../default'
import { GESTURE_ONCHANGE, GESTURE_ONSTART, GESTURE_ONEND } from '../Handler'

export default class ScrollRecognizer extends CoordinatesRecognizer {
  constructor(...args) {
    super('scroll', ...args)
  }

  onChange = event => {
    if (!this.isEnabled()) return

    this.clearTimeout()
    this.setTimeout(this.onEnd, 100)

    const { values, ...rest } = getScrollEventData(event)

    if (!this.getState().active) {
      const startState = this.getStartState({ args: this.args, event, values })
      this.updateState({ scrolling: true, ...rest }, startState, GESTURE_ONSTART)
    } else {
      const kinematics = this.getKinematics({ values, event })
      this.updateState(rest, { ...kinematics, first: false }, GESTURE_ONCHANGE)
    }
  }

  onEnd = () => {
    if (!this.getState().active) return
    this.updateState({ scrolling: false }, { ...genericEndState, velocity: 0, velocities: [0, 0] }, GESTURE_ONEND)
  }

  getEventBindings = () => {
    return [['onScroll', this.onChange]]
  }
}
