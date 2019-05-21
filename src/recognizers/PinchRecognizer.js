import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import { noop, getTwoTouchesEventData } from '../utils'
import { genericEndState } from '../default'
import { GESTURE_ONCHANGE, GESTURE_ONSTART, GESTURE_ONEND } from '../Handler'

export default class PinchRecognizer extends DistanceAngleRecognizer {
  constructor(...args) {
    super('pinch', ...args)
  }

  onStart = event => {
    if (!this.isEnabled() || event.touches.length !== 2) return

    const { values, origin, ...rest } = getTwoTouchesEventData(event)

    const startState = this.getStartState({ args: this.args, event, values })
    this.updateState(
      { ...rest, pinching: true, down: true },
      { ...startState, origin, cancel: () => this.onCancel(event) },
      GESTURE_ONSTART
    )
  }

  onChange = event => {
    const { canceled, active } = this.getState()
    if (canceled || !active || event.touches.length !== 2) return

    const { values, origin, ...rest } = getTwoTouchesEventData(event)

    const kinematics = this.getKinematics({ values, event })
    const cancel = () => this.onCancel(event)

    this.updateState(rest, { ...kinematics, origin, first: false, cancel }, GESTURE_ONCHANGE)
  }

  onEnd = event => {
    if (!this.getState().active) return
    this.updateState({ pinching: false, down: false, touches: 0 }, { ...genericEndState, event }, GESTURE_ONEND)
  }

  onCancel = event => {
    this.updateState(null, { canceled: true, cancel: noop })
    requestAnimationFrame(() => this.onEnd(event))
  }

  getEventBindings = () => {
    return [['onTouchStart', this.onStart], ['onTouchMove', this.onChange], [['onTouchEnd', 'onTouchCancel'], this.onEnd]]
  }
}
