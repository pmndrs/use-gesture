import { TouchEvent } from 'react'
import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import { getTwoTouchesEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { TransformedEvent, ReactEventHandlerKey, GestureEvent, Fn, Vector2 } from '../types'

const SCALE_FACTOR = 260

export default class PinchWebKitGestureRecognizer extends DistanceAngleRecognizer {
  sharedStartState = { pinching: true, down: true, touches: 2 }
  sharedEndState = { pinching: false, down: false, touches: 0 }
  private superOnEnd = this.onEnd

  constructor(controller: GestureController, args: any[]) {
    super('pinch', controller, args)
  }

  getPayloadFromEvent(event: TransformedEvent<GestureEvent>) {
    return { values: [event.scale * SCALE_FACTOR, event.rotation] as Vector2 }
  }

  onPinchStart = (event: TransformedEvent<GestureEvent>): void => {
    if (!this.enabled) return
    event.preventDefault()

    this.onStart(event, { cancel: () => this.onCancel(event) })
  }

  onPinchChange = (event: TransformedEvent<GestureEvent>): void => {
    const { canceled, active } = this.state
    if (canceled || !active) return
    event.preventDefault()

    this.onChange(event, { cancel: () => this.onCancel(event) })
  }

  onEnd = (event: TransformedEvent): void => {
    this.superOnEnd(event)
    event.preventDefault()
  }

  updateTouchData = (event: TransformedEvent<TouchEvent>): void => {
    if (!this.enabled || event.touches.length !== 2) return
    const { origin } = getTwoTouchesEventData(event)
    this.updateState(null, { origin })
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    return [
      ['onGestureStart', this.onPinchStart],
      ['onGestureChange', this.onPinchChange],
      [['onGestureEnd', 'onTouchCancel'], this.onEnd],
      [['onTouchStart', 'onTouchMove'], this.updateTouchData],
    ]
  }
}
