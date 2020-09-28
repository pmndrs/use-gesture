import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import { Vector2, WebKitGestureEvent } from '../types'
import {
  getGenericEventData,
  getTwoTouchesEventData,
  getWheelEventValues,
  supportsGestureEvents,
  getWebkitGestureEventValues,
  supportsTouchEvents,
} from '../utils/event'
import { getStartGestureState, getGenericPayload } from './Recognizer'
import { addBindings } from '../Controller'

export class PinchRecognizer extends DistanceAngleRecognizer<'pinch'> {
  readonly ingKey = 'pinching'
  readonly stateKey = 'pinch'

  private pinchShouldStart = (event: React.TouchEvent | TouchEvent) => {
    const { touches } = getGenericEventData(event)
    return this.enabled && touches === 2
  }

  onPinchStart = (event: React.TouchEvent | TouchEvent) => {
    if (!this.pinchShouldStart(event)) return

    const { values, origin } = getTwoTouchesEventData(event)

    this.updateSharedState(getGenericEventData(event))

    this.updateGestureState({
      // TODO remove after type update
      // @ts-ignore
      ...getStartGestureState(this, values, event),
      // @ts-ignore
      ...getGenericPayload(this, event, true),
      cancel: this.onCancel,
      origin,
    })

    this.updateGestureState(this.getMovement(values))
    this.fireGestureHandler()
  }

  onPinchChange = (event: React.TouchEvent | TouchEvent): void => {
    const { canceled, _active } = this.state
    if (canceled || !_active) return
    const genericEventData = getGenericEventData(event)

    this.updateSharedState(genericEventData)

    const { values, origin } = getTwoTouchesEventData(event)
    // @ts-ignore
    const kinematics = this.getKinematics(values, event)

    this.updateGestureState({
      // @ts-ignore
      ...getGenericPayload(this, event),
      ...kinematics,
      origin,
    })

    this.fireGestureHandler()
  }

  onPinchEnd = (event: React.TouchEvent | TouchEvent): void => {
    if (!this.state.active) return
    this.state._active = false
    this.updateSharedState({ down: false, touches: 0 })

    this.updateGestureState({
      // @ts-ignore
      ...getGenericPayload(this, event),
      ...this.getMovement(this.state.values),
    })
    this.fireGestureHandler()
  }

  onCancel = (): void => {
    if (this.state.canceled) return
    this.state._active = false
    this.updateGestureState({ canceled: true })
    this.updateSharedState({ down: false, touches: 0 })

    requestAnimationFrame(() => this.fireGestureHandler())
  }
  /**
   * PINCH WITH WEBKIT GESTURES
   */

  onGestureStart = (event: WebKitGestureEvent): void => {
    if (!this.enabled) return
    event.preventDefault()

    const values = getWebkitGestureEventValues(event)

    this.updateSharedState(getGenericEventData(event))

    this.updateGestureState({
      ...getStartGestureState(this, values, event),
      ...getGenericPayload(this, event, true),
      cancel: this.onCancel,
    })

    this.updateGestureState(this.getMovement(values))
    this.fireGestureHandler()
  }

  onGestureChange = (event: WebKitGestureEvent): void => {
    const { canceled, _active } = this.state
    if (canceled || !_active) return

    event.preventDefault()

    const genericEventData = getGenericEventData(event)

    this.updateSharedState(genericEventData)

    const values = getWebkitGestureEventValues(event)
    const kinematics = this.getKinematics(values, event)

    this.updateGestureState({
      ...getGenericPayload(this, event),
      ...kinematics,
    })

    this.fireGestureHandler()
  }

  onGestureEnd = (event: WebKitGestureEvent): void => {
    event.preventDefault()
    if (!this.state.active) return
    this.state._active = false
    this.updateSharedState({ down: false, touches: 0 })

    this.updateGestureState({
      ...getGenericPayload(this, event),
      ...this.getMovement(this.state.values),
    })
    this.fireGestureHandler()
  }

  /**
   * PINCH WITH WHEEL
   */
  private wheelShouldRun = (event: React.WheelEvent | WheelEvent) => {
    return this.enabled && event.ctrlKey
  }

  private getWheelValuesFromEvent = (event: React.WheelEvent | WheelEvent) => {
    const [, delta_d] = getWheelEventValues(event)
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

  onWheel = (event: React.WheelEvent | WheelEvent): void => {
    if (!this.wheelShouldRun(event)) return
    this.setTimeout(this.onWheelEnd)

    if (!this.state._active) this.onWheelStart(event)
    else this.onWheelChange(event)
  }

  onWheelStart = (event: React.WheelEvent | WheelEvent): void => {
    const { values, delta, origin } = this.getWheelValuesFromEvent(event)

    if (!this.controller.config.eventOptions.passive) {
      event.preventDefault()
    } else if (process.env.NODE_ENV === 'development') {
      console.warn(
        'To support zoom on trackpads, try using the `domTarget` option and `config.eventOptions.passive` set to `false`. This message will only appear in development mode.'
      )
    }

    this.updateSharedState(getGenericEventData(event))

    this.updateGestureState({
      ...getStartGestureState(this, values, event),
      ...getGenericPayload(this, event, true),
      initial: this.state.values,
      offset: values,
      delta,
      origin,
    })

    this.updateGestureState(this.getMovement(values))
    this.fireGestureHandler()
  }

  onWheelChange = (event: React.WheelEvent | WheelEvent): void => {
    this.updateSharedState(getGenericEventData(event))

    const { values, origin, delta } = this.getWheelValuesFromEvent(event)

    this.updateGestureState({
      ...getGenericPayload(this, event),
      ...this.getKinematics(values, event),
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

  addBindings(bindings: any): void {
    // Only try to use gesture events when they are supported and domTarget is set
    // as React doesn't support gesture handlers.
    if (this.controller.config.domTarget && !supportsTouchEvents() && supportsGestureEvents()) {
      addBindings(bindings, 'onGestureStart', this.onGestureStart)
      addBindings(bindings, 'onGestureChange', this.onGestureChange)
      addBindings(bindings, 'onGestureEnd', this.onGestureEnd)
    } else {
      addBindings(bindings, 'onTouchStart', this.onPinchStart)
      addBindings(bindings, 'onTouchMove', this.onPinchChange)
      addBindings(bindings, 'onTouchEnd', this.onPinchEnd)
      addBindings(bindings, 'onTouchCancel', this.onPinchEnd)
      addBindings(bindings, 'onWheel', this.onWheel)
    }
  }
}

