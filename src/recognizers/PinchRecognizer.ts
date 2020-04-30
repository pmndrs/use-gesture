import { TouchEvent, WheelEvent } from 'react'
import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import Controller from '../Controller'
import { UseGestureEvent, IngKey, Vector2, WebKitGestureEvent } from '../types'
import { noop } from '../utils/utils'
import {
  getGenericEventData,
  getTwoTouchesEventData,
  getWheelEventValues,
  supportsGestureEvents,
  getWebkitGestureEventValues,
} from '../utils/event'

export default class PinchRecognizer extends DistanceAngleRecognizer<'pinch'> {
  ingKey = 'pinching' as IngKey

  constructor(controller: Controller, args: any[]) {
    super('pinch', controller, args)
  }

  private pinchShouldStart = (event: UseGestureEvent) => {
    const { touches } = getGenericEventData(event)
    return this.enabled && touches === 2
  }

  onPinchStart = (event: UseGestureEvent<TouchEvent>) => {
    if (!this.pinchShouldStart(event)) return

    const { values, origin } = getTwoTouchesEventData(event)

    this.updateSharedState(getGenericEventData(event))

    const startState = {
      ...this.getStartGestureState(values, event),
      ...this.getGenericPayload(event, true),
    }

    this.updateGestureState({
      ...startState,
      ...this.getMovement(values, startState),
      origin,
      cancel: this.onCancel,
    })

    this.fireGestureHandler()
  }

  onPinchChange = (event: UseGestureEvent<TouchEvent>): void => {
    const { canceled, timeStamp, _active } = this.state
    if (canceled || !_active) return
    const genericEventData = getGenericEventData(event)
    if (genericEventData.touches !== 2 || event.timeStamp === timeStamp) return

    this.updateSharedState(genericEventData)

    const { values, origin } = getTwoTouchesEventData(event)
    const kinematics = this.getKinematics(values, event)

    this.updateGestureState({
      ...this.getGenericPayload(event),
      ...kinematics,
      origin,
      cancel: this.onCancel,
    })

    this.fireGestureHandler()
  }

  onPinchEnd = (event: UseGestureEvent): void => {
    if (!this.state.active) return
    this.state._active = false
    this.updateSharedState({ down: false, touches: 0 })

    this.updateGestureState({
      ...this.getGenericPayload(event),
      ...this.getMovement(this.state.values),
    })
    this.fireGestureHandler()
  }

  onCancel = (): void => {
    this.state._active = false
    this.updateGestureState({ canceled: true, cancel: noop })
    this.updateSharedState({ down: false, touches: 0 })

    requestAnimationFrame(() => this.fireGestureHandler())
  }
  /**
   * PINCH WITH WEBKIT GESTURES
   */

  onGestureStart = (event: WebKitGestureEvent): void => {
    if (!this.enabled) return
    event.preventDefault()

    const { values } = getWebkitGestureEventValues(event)

    this.updateSharedState(getGenericEventData(event))

    const startState = {
      ...this.getStartGestureState(values, event),
      ...this.getGenericPayload(event, true),
    }

    this.updateGestureState({
      ...startState,
      ...this.getMovement(values, startState),
      cancel: this.onCancel,
    })

    this.fireGestureHandler()
  }

  onGestureChange = (event: WebKitGestureEvent): void => {
    const { canceled, _active } = this.state
    if (canceled || !_active) return

    event.preventDefault()

    const genericEventData = getGenericEventData(event)

    this.updateSharedState(genericEventData)

    const { values } = getWebkitGestureEventValues(event)
    const kinematics = this.getKinematics(values, event)

    this.updateGestureState({
      ...this.getGenericPayload(event),
      ...kinematics,
      cancel: this.onCancel,
    })

    this.fireGestureHandler()
  }

  onGestureEnd = (event: WebKitGestureEvent): void => {
    event.preventDefault()
    if (!this.state.active) return
    this.state._active = false
    this.updateSharedState({ down: false, touches: 0 })

    this.updateGestureState({
      ...this.getGenericPayload(event),
      ...this.getMovement(this.state.values),
    })
    this.fireGestureHandler()
  }

  updateTouchData = (event: UseGestureEvent<TouchEvent>): void => {
    if (!this.enabled || event.touches.length !== 2 || !this.state._active) return
    const { origin } = getTwoTouchesEventData(event)
    this.state.origin = origin
  }

  /**
   * PINCH WITH WHEEL
   */
  private wheelShouldRun = (event: UseGestureEvent<WheelEvent>) => {
    return this.enabled && event.ctrlKey
  }

  private getWheelValuesFromEvent = (event: UseGestureEvent<WheelEvent>) => {
    const {
      values: [, delta_d],
    } = getWheelEventValues(event)
    const {
      values: [prev_d, prev_a],
    } = this.state
    const d = prev_d - delta_d
    const a = prev_a !== void 0 ? prev_a : 0

    return {
      values: [d, a] as Vector2,
      origin: [event.clientX, event.clientY] as Vector2,
      delta: [0, delta_d] as Vector2,
    }
  }

  onWheel = (event: UseGestureEvent<WheelEvent>): void => {
    if (!this.wheelShouldRun(event)) return
    this.clearTimeout()
    this.setTimeout(this.onWheelEnd)

    if (!this.state._active) this.onWheelStart(event)
    else this.onWheelChange(event)
  }

  onWheelStart = (event: UseGestureEvent<WheelEvent>): void => {
    const { values, delta, origin } = this.getWheelValuesFromEvent(event)

    if (!this.controller.config.eventOptions.passive) {
      event.preventDefault()
    } else if (process.env.NODE_ENV === 'development') {
      console.warn(
        'To support zoom on trackpads, try using the `domTarget` option and `config.event.passive` set to `false`. This message will only appear in development mode.'
      )
    }

    this.updateSharedState(getGenericEventData(event))

    const startState = {
      ...this.getStartGestureState(values, event),
      ...this.getGenericPayload(event, true),
      initial: this.state.values,
    }

    this.updateGestureState({
      ...startState,
      ...this.getMovement(values, startState),
      offset: values,
      delta,
      origin,
    })

    this.fireGestureHandler()
  }

  onWheelChange = (event: UseGestureEvent<WheelEvent>): void => {
    const genericEventData = getGenericEventData(event)

    this.updateSharedState(genericEventData)

    const { values, origin, delta } = this.getWheelValuesFromEvent(event)
    const kinematics = this.getKinematics(values, event)

    this.updateGestureState({
      ...this.getGenericPayload(event),
      ...kinematics,
      origin,
      delta,
    })

    this.fireGestureHandler()
  }

  onWheelEnd = (): void => {
    this.state._active = false
    this.updateGestureState(this.getMovement(this.state.values))
    this.fireGestureHandler()
  }

  addBindings(): void {
    // Only try to use gesture events when they are supported and domTarget is set
    // as React doesn't support gesture handlers.
    if (this.controller.config.domTarget && supportsGestureEvents()) {
      this.controller.addBindings('onGestureStart', this.onGestureStart)
      this.controller.addBindings('onGestureChange', this.onGestureChange)
      this.controller.addBindings(['onGestureEnd', 'onTouchCancel'], this.onGestureEnd)
      this.controller.addBindings(['onTouchStart', 'onTouchMove'], this.updateTouchData)
    } else {
      this.controller.addBindings('onTouchStart', this.onPinchStart)
      this.controller.addBindings('onTouchMove', this.onPinchChange)
      this.controller.addBindings(['onTouchEnd', 'onTouchCancel'], this.onPinchEnd)

      this.controller.addBindings('onWheel', this.onWheel)
    }
  }
}
