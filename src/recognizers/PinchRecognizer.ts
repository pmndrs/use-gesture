import { TouchEvent } from 'react'
import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import { getTwoTouchesEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { UseGestureEvent, ReactEventHandlerKey, Fn } from '../types'

export default class PinchRecognizer extends DistanceAngleRecognizer {
  sharedStartState = { pinching: true }
  sharedEndState = { pinching: false, down: false, touches: 0 }

  constructor(controller: GestureController, args: any[]) {
    super('pinch', controller, args)
  }

  getPayloadFromEvent(event: UseGestureEvent<TouchEvent>) {
    const { da, origin, ...sharedPayload } = getTwoTouchesEventData(event)
    return { values: da, gesturePayload: { origin }, sharedPayload }
  }

  onPinchStart = (event: UseGestureEvent<TouchEvent>): void => {
    if (!this.enabled || event.touches.length !== 2) return
    this.onStart(event, { cancel: () => this.onCancel(event) })
  }

  onPinchChange = (event: UseGestureEvent<TouchEvent>): void => {
    const { canceled, active, time } = this.state
    if (canceled || !active || event.touches.length !== 2 || event.timeStamp === time) return

    this.onChange(event, { cancel: () => this.onCancel(event) })
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    return [['onTouchStart', this.onPinchStart], ['onTouchMove', this.onPinchChange], [['onTouchEnd', 'onTouchCancel'], this.onEnd]]
  }
}
