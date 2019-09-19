import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getPointerEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { GestureFlag, TransformedEvent, ReactEventHandlerKey, Fn } from '../types'
import { genericEndState } from '../defaults'

export default class HoverRecognizer extends CoordinatesRecognizer {
  constructor(controller: GestureController, args: any[]) {
    super('hover', controller, args)
  }

  getPayloadFromEvent(event: TransformedEvent) {
    const { xy, ...sharedPayload } = getPointerEventData(event)
    return { values: xy, sharedPayload }
  }

  onMouseEnter = (event: TransformedEvent): void => {
    if (!this.enabled) return
    const { values, sharedPayload } = this.getPayloadFromEvent(event)
    this.updateState({ hovering: true, ...sharedPayload }, { xy: values, event, args: this.args })
    this.fireGestureHandler(GestureFlag.OnChange)
  }

  onMouseLeave = (event: TransformedEvent): void => {
    if (!this.enabled) return
    const { values, sharedPayload } = this.getPayloadFromEvent(event)
    const kinematics = this.getKinematics(values, event)

    this.updateState({ hovering: false, moving: false, ...sharedPayload }, { ...kinematics, ...genericEndState, velocity: 0, vxvy: [0, 0] })

    // when the mouse leaves the element, we also fire the move handler
    // without waiting for move to end with debounce
    this.controller.fireGestureHandler('move', GestureFlag.OnEnd)
    this.controller.fireGestureHandler('hover', GestureFlag.OnChange)
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    return [['onMouseEnter', this.onMouseEnter], ['onMouseLeave', this.onMouseLeave]]
  }
}
