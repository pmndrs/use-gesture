import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getScrollEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { UseGestureEvent, ReactEventHandlerKey, Fn } from '../types'

export default class ScrollRecognizer extends CoordinatesRecognizer {
  sharedStartState = { scrolling: true }
  sharedEndState = { scrolling: false, velocity: 0, vxvy: [0, 0] }
  continuousGesture = true

  constructor(controller: GestureController, args: any[]) {
    super('scroll', controller, args)
  }

  getPayloadFromEvent(event: UseGestureEvent) {
    const { xy, ...sharedPayload } = getScrollEventData(event)
    return { values: xy, sharedPayload }
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    return [['onScroll', this.timeoutHandler]]
  }
}
