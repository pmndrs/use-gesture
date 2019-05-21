import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import { noop, getTwoTouchesEventData } from '../utils'
import { genericEndState } from '../default'
import { GESTURE_ONCHANGE, GESTURE_ONSTART, GESTURE_ONEND } from '../Handler'

const SCALE_FACTOR = 260

export default class PinchWebKitGestureRecognizer extends DistanceAngleRecognizer {
  constructor(...args) {
    super('pinch', ...args)
  }

  onStart = event => {
    if (!this.isEnabled()) return
    event.preventDefault()

    const da = [event.scale * SCALE_FACTOR, event.rotation]

    const startState = this.getStartState({ args: this.args, event, values: da })
    this.updateState({ pinching: true, down: true, touches: 2 }, { ...startState, cancel: () => this.onCancel(event) }, GESTURE_ONSTART)
  }

  onChange = event => {
    const { canceled, active } = this.getState()
    if (canceled || !active) return
    event.preventDefault()

    const da = [event.scale * SCALE_FACTOR, event.rotation]

    const kinematics = this.getKinematics({ values: da, event })
    const cancel = () => this.onCancel(event)

    this.updateState(null, { ...kinematics, first: false, cancel }, GESTURE_ONCHANGE)
  }

  onEnd = event => {
    if (!this.getState().active) return
    event.preventDefault()
    this.updateState({ pinching: false, down: false, touches: 0 }, { ...genericEndState, event }, GESTURE_ONEND)
  }

  onCancel = event => {
    this.updateState(null, { canceled: true, cancel: noop })
    requestAnimationFrame(() => this.onEnd(event))
  }

  updateTouchData = event => {
    const { origin } = getTwoTouchesEventData(event)
    this.updateState(null, { origin })
  }

  getEventBindings = () => {
    return [
      ['onGestureStart', this.onStart],
      ['onGestureChange', this.onChange],
      [['onGestureEnd', 'onTouchCancel'], this.onEnd],
      [['onTouchStart', 'onTouchMove'], this.updateTouchData]
    ]
  }
}
