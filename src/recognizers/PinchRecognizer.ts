import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import { Vector2, WebKitGestureEvent } from '../types'
import {
  getGenericEventData,
  getTwoTouchesEventValues,
  getWheelEventValues,
  getWebkitGestureEventValues,
  getTouchIds,
} from '../utils/event'
import { getStartGestureState, getGenericPayload } from './Recognizer'
import { addBindings, addEventIds, removeEventIds } from '../Controller'

const ZOOM_CONSTANT = 7
const WEBKIT_DISTANCE_SCALE_FACTOR = 260

export class PinchRecognizer extends DistanceAngleRecognizer<'pinch'> {
  readonly ingKey = 'pinching'
  readonly stateKey = 'pinch'

  onPinchStart = (event: React.TouchEvent | TouchEvent) => {
    addEventIds(this.controller, event)
    const touchIds = this.controller.touchIds

    if (!this.enabled) return

    if (this.state._active) {
      // check that the pointerIds that initiated the gesture
      // are still enabled. This is useful for when the page
      // loses track of the pointers (minifying gesture on iPad).
      if (this.state._pointerIds.every(id => touchIds.has(id))) return
      // something was wrong with the pointers but we let it go.
    }
    // until we reach two fingers on the target don't react
    if (touchIds.size < 2) return
    const _pointerIds = Array.from(touchIds).slice(0, 2) as [number, number]

    const { values, origin } = getTwoTouchesEventValues(event, _pointerIds, this.transform)

    this.updateSharedState(getGenericEventData(event))

    this.updateGestureState({
      ...getStartGestureState(this, values, event),
      ...getGenericPayload(this, event, true),
      _pointerIds,
      cancel: this.onCancel,
      origin,
    })

    this.updateGestureState(this.getMovement(values))
    this.fireGestureHandler()
  }

  onPinchChange = (event: React.TouchEvent | TouchEvent): void => {
    const { canceled, _active } = this.state
    if (
      canceled ||
      !_active ||
      // if the event has the same timestamp as the previous event
      event.timeStamp === this.state.timeStamp
    )
      return
    const genericEventData = getGenericEventData(event)

    this.updateSharedState(genericEventData)
    try {
      const { values, origin } = getTwoTouchesEventValues(event, this.state._pointerIds, this.transform)
      const kinematics = this.getKinematics(values, event)

      this.updateGestureState({
        ...getGenericPayload(this, event),
        ...kinematics,
        origin,
      })

      this.fireGestureHandler()
    } catch (e) {
      this.onPinchEnd(event)
    }
  }

  onPinchEnd = (event: React.TouchEvent | TouchEvent): void => {
    removeEventIds(this.controller, event)
    const pointerIds = getTouchIds(event)

    // if none of the lifted pointerIds is in the state pointerIds don't do anything
    if (this.state._pointerIds.every(id => !pointerIds.includes(id))) return

    this.clean()
    if (!this.state._active) return

    this.updateGestureState({
      ...getGenericPayload(this, event),
      ...this.getMovement(this.state.values),
      _active: false,
    })
    this.fireGestureHandler()
  }

  onCancel = (): void => {
    if (this.state.canceled) return
    this.updateGestureState({ _active: false, canceled: true })
    setTimeout(() => this.fireGestureHandler(), 0)
  }
  /**
   * PINCH WITH WEBKIT GESTURES
   */
  onGestureStart = (event: WebKitGestureEvent): void => {
    if (!this.enabled) return
    event.preventDefault()

    const values = getWebkitGestureEventValues(event, this.transform)

    this.updateSharedState(getGenericEventData(event))

    this.updateGestureState({
      ...getStartGestureState(this, values, event),
      ...getGenericPayload(this, event, true),
      origin: [event.clientX, event.clientY] as Vector2, // only used on dekstop
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

    // this normalizes the values of the Safari's WebKitEvent by calculating
    // the delta and then multiplying it by a constant.
    const values = getWebkitGestureEventValues(event, this.transform)
    values[0] =
      (values[0] - (this.state.event as WebKitGestureEvent).scale) * WEBKIT_DISTANCE_SCALE_FACTOR + this.state.values[0]

    const kinematics = this.getKinematics(values, event)

    this.updateGestureState({
      ...getGenericPayload(this, event),
      ...kinematics,
      origin: [event.clientX, event.clientY] as Vector2, // only used on dekstop
    })

    this.fireGestureHandler()
  }

  onGestureEnd = (event: WebKitGestureEvent): void => {
    this.clean()
    if (!this.state._active) return

    this.updateGestureState({
      ...getGenericPayload(this, event),
      ...this.getMovement(this.state.values),
      _active: false,
      origin: [event.clientX, event.clientY] as Vector2, // only used on dekstop
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
    const [, delta_d] = getWheelEventValues(event, this.transform)
    const {
      values: [prev_d, prev_a],
    } = this.state
    // ZOOM_CONSTANT is based on Safari trackpad natural zooming
    const d = prev_d - delta_d * ZOOM_CONSTANT
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

    if (event.cancelable) event.preventDefault()
    else if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(
        'To properly support zoom on trackpads, try using the `domTarget` option and `config.eventOptions.passive` set to `false`. This message will only appear in development mode.'
      )
    }

    this.updateSharedState(getGenericEventData(event))

    this.updateGestureState({
      ...getStartGestureState(this, values, event, this.state.values),
      ...getGenericPayload(this, event, true),
      offset: values,
      delta,
      origin,
    })

    this.updateGestureState(this.getMovement(values))
    this.fireGestureHandler()
  }

  onWheelChange = (event: React.WheelEvent | WheelEvent): void => {
    if (event.cancelable) event.preventDefault()

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
    this.clean()
    if (!this.state._active) return
    this.state._active = false
    this.updateGestureState(this.getMovement(this.state.values))
    this.fireGestureHandler()
  }

  addBindings(bindings: any): void {
    // Only try to use gesture events when they are supported and domTarget is set
    // as React doesn't support gesture handlers.
    if (
      this.controller.config.domTarget &&
      !this.controller.supportsTouchEvents &&
      this.controller.supportsGestureEvents
    ) {
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
