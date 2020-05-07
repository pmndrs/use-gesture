import CoordinatesRecognizer from './CoordinatesRecognizer'
import { UseGestureEvent, Fn, IngKey } from '../types'
import { noop } from '../utils/utils'
import { getPointerEventValues, getGenericEventData } from '../utils/event'
import { calculateDistance } from '../utils/math'
import { getStartGestureState, getGenericPayload } from './Recognizer'

const TAP_DISTANCE_THRESHOLD = 3
const SWIPE_MAX_ELAPSED_TIME = 220
const FILTER_REPEATED_EVENTS_DELAY = 200

export default class DragRecognizer extends CoordinatesRecognizer<'drag'> {
  readonly ingKey = 'dragging' as IngKey
  readonly stateKey = 'drag'

  // Convenience method to add window listeners for a given gesture
  protected addWindowListeners = (listeners: [string, Fn][]) => {
    this.controller.addWindowListeners(this.stateKey, listeners)
  }

  // Convenience method to remove window listeners for a given gesture
  protected removeWindowListeners = () => {
    this.controller.removeWindowListeners(this.stateKey)
  }

  private isEventTypeTouch = (type?: string) => !!type && type.indexOf('touch') === 0

  private dragShouldStart = (event: UseGestureEvent) => {
    const { touches } = getGenericEventData(event)
    const { _lastEventType } = this.state
    /**
     * This tries to filter out mouse events triggered by touch screens
     * */
    // If the previous gesture was touch-based, and the current one is mouse based,
    // this means that we might be dealing with mouse simulated events if they're close to
    // each other. We're only doing this check when we're not using pointer events.
    if (
      !this.controller.config.pointer &&
      this.isEventTypeTouch(_lastEventType) &&
      !this.isEventTypeTouch(event.type)
    ) {
      const delay = Math.abs(event.timeStamp - this.state.startTime)
      if (delay < FILTER_REPEATED_EVENTS_DELAY) return false
    }

    return this.enabled && touches < 2
  }

  // TODO add back when setPointerCapture is widely wupported
  // https://caniuse.com/#search=setPointerCapture
  /*
  private setPointers = (event: UseGestureEvent<PointerEvent>) => {
    const { currentTarget, pointerId } = event
    if (currentTarget) currentTarget.setPointerCapture(pointerId)
    this.updateGestureState({ currentTarget, pointerId })
  }

  private removePointers = () => {
    const { currentTarget, pointerId } = this.state
    if (currentTarget && pointerId) currentTarget.releasePointerCapture(pointerId)
  }
  */

  private setListeners = (isTouch: boolean) => {
    this.removeWindowListeners()
    const dragListeners: [string, Fn][] = this.controller.config.pointer
      ? [
          ['pointermove', this.onDragChange],
          ['pointerup', this.onDragEnd],
          ['pointercancel', this.onDragEnd],
        ]
      : isTouch
      ? [
          ['touchmove', this.onDragChange],
          ['touchend', this.onDragEnd],
          ['touchcancel', this.onDragEnd],
        ]
      : [
          ['mousemove', this.onDragChange],
          ['mouseup', this.onDragEnd],
        ]
    this.addWindowListeners(dragListeners)
  }

  onDragStart = (event: UseGestureEvent): void => {
    if (!this.dragShouldStart(event)) return
    // if pointers events
    // TODO add back when setPointerCapture is widely wupported
    // if (this.controller.config.pointer) this.setPointers(event as PointerEvent)
    else this.setListeners(this.isEventTypeTouch(event.type))

    if (this.config.delay > 0) {
      this.state._delayedEvent = true
      if (typeof event.persist === 'function') event.persist()
      this.setTimeout(() => this.startDrag(event), this.config.delay)
    } else {
      this.startDrag(event)
    }
  }

  startDrag(event: UseGestureEvent) {
    const { values } = getPointerEventValues(event)
    this.updateSharedState(getGenericEventData(event))

    const startState = {
      ...getStartGestureState(this, values, event),
      ...getGenericPayload(this, event, true),
    }

    this.updateGestureState({
      ...startState,
      ...this.getMovement(values, startState),
      cancel: this.onCancel,
    })

    this.fireGestureHandler()
  }

  onDragChange = (event: UseGestureEvent): void => {
    const { canceled } = this.state
    if (canceled) return

    if (!this.state._active) {
      if (this.state._delayedEvent) {
        this.clearTimeout()
        this.startDrag(event)
      }
      return
    }

    const genericEventData = getGenericEventData(event)

    if (!genericEventData.down) {
      this.onDragEnd(event)
      return
    }

    this.updateSharedState(genericEventData)

    const { values } = getPointerEventValues(event)
    const kinematics = this.getKinematics(values, event)

    let { _isTap } = this.state
    if (_isTap && calculateDistance(kinematics._movement!) >= TAP_DISTANCE_THRESHOLD) _isTap = false

    this.updateGestureState({
      ...getGenericPayload(this, event),
      ...kinematics,
      _isTap,
      cancel: this.onCancel,
    })

    this.fireGestureHandler()
  }

  onDragEnd = (event: UseGestureEvent): void => {
    this.state._active = false
    this.updateSharedState({ down: false, buttons: 0, touches: 0 })

    const {
      _isTap,
      values,
      velocities: [vx, vy],
      movement: [mx, my],
      _intentional: [ix, iy],
    } = this.state

    const endState = {
      ...getGenericPayload(this, event),
      ...this.getMovement(values),
    }

    const { elapsedTime } = endState

    const {
      swipeVelocity: [svx, svy],
      swipeDistance: [sx, sy],
    } = this.config

    const swipe: [number, number] = [0, 0]

    if (elapsedTime < SWIPE_MAX_ELAPSED_TIME) {
      if (ix !== false && Math.abs(vx) > svx && Math.abs(mx) > sx) swipe[0] = Math.sign(vx)
      if (iy !== false && Math.abs(vy) > svy && Math.abs(my) > sy) swipe[1] = Math.sign(vy)
    }

    this.updateGestureState({
      ...endState,
      tap: _isTap,
      swipe,
    })
    this.fireGestureHandler(this.config.filterTaps && this.state._isTap)
  }

  clean = (): void => {
    super.clean()
    this.removeWindowListeners()
    // TODO add back when setPointerCapture is widely wupported

    // if (this.controller.config.pointer) this.removePointers()
  }

  onCancel = (): void => {
    this.updateGestureState({ canceled: true, cancel: noop })
    this.state._active = false
    this.updateSharedState({ down: false, buttons: 0, touches: 0 })
    requestAnimationFrame(() => this.fireGestureHandler())
  }

  addBindings(): void {
    if (this.controller.config.pointer) {
      this.controller.addBindings('onPointerDown', this.onDragStart)
      // TODO add back when setPointerCapture is widely wupported

      // this.controller.addBindings('onPointerMove', this.onDragChange)
      // this.controller.addBindings(['onPointerUp', 'onPointerCancel'], this.onDragEnd)
    } else {
      this.controller.addBindings(['onTouchStart', 'onMouseDown'], this.onDragStart)
    }
  }
}
