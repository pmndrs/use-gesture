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

  onMove = (event: TransformedEvent): void => {
    if (!this.enabled) return

    this.clearTimeout()
    this.setTimeout(this.onEnd)

    if (!this.state.active) this.onStart(event)
    else this.onChange(event)
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    return [['onMouseMove', this.onMove]]
  }
}
