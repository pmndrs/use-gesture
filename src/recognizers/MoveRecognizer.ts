import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getPointerEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { TransformedEvent, ReactEventHandlerKey, Fn } from '../types'

export default class MoveRecognizer extends CoordinatesRecognizer {
  sharedStartState = { moving: true }
  sharedEndState = { moving: false, velocity: 0, vxvy: [0, 0] }

  constructor(controller: GestureController, args: any[]) {
    super('move', controller, args)
  }

  getPayloadFromEvent(event: TransformedEvent) {
    const { xy, ...sharedPayload } = getPointerEventData(event)
    return { values: xy, sharedPayload }
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    return [['onMouseMove', this.timeoutHandler]]
  }
}
