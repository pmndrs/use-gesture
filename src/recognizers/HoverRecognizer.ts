import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getPointerEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { GestureFlag, TransformedEvent, ReactEventHandlerKey, Fn } from '../types'
import { genericEndState } from '../defaults'

export default class HoverRecognizer extends CoordinatesRecognizer {
  constructor(controller: GestureController, args: any[]) {
    super('hover', controller, args)
  }

  onStart = (event: TransformedEvent): void => {
    if (!this.isEnabled()) return
    const { xy, ...rest } = getPointerEventData(event)
    this.updateState({ hovering: true, ...rest }, { xy, event, args: this.args }, GestureFlag.OnChange)
  }

  onEnd = (event: TransformedEvent): void => {
    if (!this.isEnabled()) return
    const { xy, ...rest } = getPointerEventData(event)
    const kinematics = this.getKinematics(xy, event)

    this.updateState({ hovering: false, moving: false, ...rest }, { ...kinematics, ...genericEndState, velocity: 0, vxvy: [0, 0] })

    // when the mouse leaves the element, we also fire the move handler
    // without waiting for move to end with debounce
    this.controller.fireGestureHandler('move', GestureFlag.OnEnd)
    this.controller.fireGestureHandler('hover', GestureFlag.OnChange)
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    if (this.pointerEventsEnabled()) {
      return [['onPointerEnter', this.onStart], ['onPointerLeave', this.onEnd]]
    }
    return [['onMouseEnter', this.onStart], ['onMouseLeave', this.onEnd]]
  }
}
