import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import { getTwoTouchesEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { UseGestureEvent, ReactEventHandlerKey, WebKitGestureEvent, Fn, Vector2 } from '../types'

const SCALE_FACTOR = 260

export default class PinchWebKitGestureRecognizer extends DistanceAngleRecognizer {
  sharedStartState = { pinching: true, down: true, touches: 2 }
  sharedEndState = { pinching: false, down: false, touches: 0 }

  constructor(controller: GestureController, args: any[]) {
    super('pinch', controller, args)
  }

  getPayloadFromEvent(event: UseGestureEvent<WebKitGestureEvent>) {
    return { values: [event.scale * SCALE_FACTOR, event.rotation] as Vector2 }
  }

  onPinchStart = (event: UseGestureEvent): void => {
    if (!this.enabled) return
    event.preventDefault()

    this.onStart(event, { cancel: () => this.onCancel(event) })
  }

  onPinchChange = (event: UseGestureEvent): void => {
    const { canceled, active } = this.state
    if (canceled || !active) return
    event.preventDefault()

    this.onChange(event, { cancel: () => this.onCancel(event) })
  }

  onGestureEnd = (event: UseGestureEvent): void => {
    this.onEnd(event)
    event.preventDefault()
  }

  updateTouchData = (event: UseGestureEvent<WebKitGestureEvent>): void => {
    if (!this.enabled || event.touches.length !== 2) return
    const { origin } = getTwoTouchesEventData(event)
    this.updateState(null, { origin })
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    return [
      ['onGestureStart', this.onPinchStart],
      ['onGestureChange', this.onPinchChange],
      [['onGestureEnd', 'onTouchCancel'], this.onGestureEnd],
      [['onTouchStart', 'onTouchMove'], this.updateTouchData],
    ]
  }
}
