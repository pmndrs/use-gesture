import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getPointerEventData, GESTURE_ONCHANGE, GESTURE_ONEND } from '../utils'
import { genericEndState } from '../default'

export default class HoverRecognizer extends CoordinatesRecognizer {
  timeout = null
  constructor(...args) {
    super('hover', ...args)
    this.stateKey = 'move'
  }

  onStart = event => {
    if (!this.isEnabled()) return
    const { values, ...rest } = getPointerEventData(event)
    this.updateState({ hovering: true, ...rest }, { values, event, args: this.args }, GESTURE_ONCHANGE)
  }

  onEnd = event => {
    if (!this.isEnabled()) return
    const { values, ...rest } = getPointerEventData(event)
    const kinematics = this.getKinematics({ values, event })

    this.updateState({ hovering: false, moving: false, ...rest }, { ...kinematics, ...genericEndState, velocity: 0, velocities: [0, 0] })
    this.handler.fireGestureHandler('move', 'onMove', GESTURE_ONEND)
    this.handler.fireGestureHandler('move', 'onHover', GESTURE_ONCHANGE)
  }

  getEventBindings = () => {
    if (this.hasPointerEvents()) {
      return [['onPointerEnter', this.onStart], ['onPointerLeave', this.onEnd]]
    }
    return [['onMouseEnter', this.onStart], ['onMouseLeave', this.onEnd]]
  }
}
