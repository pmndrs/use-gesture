import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getPointerEventValues, getGenericEventData } from '../utils/event'
import { addV, calculateDistance, sign } from '../utils/math'
import { getStartGestureState, getGenericPayload } from './Recognizer'
import { addBindings, updateWindowListeners, clearWindowListeners, addEventIds, removeEventIds } from '../Controller'

export const TAP_DISTANCE_THRESHOLD = 3
export const SWIPE_MAX_ELAPSED_TIME = 220

function persistEvent(event: React.PointerEvent | PointerEvent) {
  'persist' in event && typeof event.persist === 'function' && event.persist()
}

export class DragRecognizer extends CoordinatesRecognizer<'drag'> {
  readonly ingKey = 'dragging'
  readonly stateKey = 'drag'

  // TODO add back when setPointerCapture is widely wupported
  // https://caniuse.com/#search=setPointerCapture
  private setPointerCapture = (event: React.PointerEvent | PointerEvent) => {
    // don't perform pointere capture when user wants to use touch events or
    // when a pointerLockElement exists as this would throw an error
    if (this.config.useTouch || document.pointerLockElement) return

    const { target, pointerId } = event
    if (target && 'setPointerCapture' in target) {
      // this would work in the DOM but doesn't with react three fiber
      // target.addEventListener('pointermove', this.onDragChange, this.controller.config.eventOptions)
      // @ts-expect-error
      target.setPointerCapture(pointerId)
    }
    this.updateGestureState({ _dragTarget: target, _dragPointerId: pointerId })
  }

  private releasePointerCapture = () => {
    if (this.config.useTouch || document.pointerLockElement) return

    const { _dragTarget, _dragPointerId } = this.state
    if (_dragPointerId && _dragTarget && 'releasePointerCapture' in _dragTarget) {
      // this would work in the DOM but doesn't with react three fiber
      // target.removeEventListener('pointermove', this.onDragChange, this.controller.config.eventOptions)
      if (!('hasPointerCapture' in _dragTarget) || _dragTarget.hasPointerCapture(_dragPointerId))
        try {
          _dragTarget.releasePointerCapture(_dragPointerId)
        } catch (e) {}
    }
  }

  private preventScroll = (event: TouchEvent) => {
    if (this.state._dragPreventScroll && event.cancelable) {
      event.preventDefault()
    }
  }

  private getEventId = (event: any): number => {
    if (this.config.useTouch) return event.changedTouches[0].identifier
    return event.pointerId
  }

  private isValidEvent = (event: any) => {
    // if we were using pointer events only event.isPrimary === 1 would suffice
    return this.state._pointerId === this.getEventId(event)
  }

  private shouldPreventWindowScrollY =
    this.config.experimental_preventWindowScrollY && this.controller.supportsTouchEvents

  private setUpWindowScrollDetection = (event: React.PointerEvent | PointerEvent) => {
    persistEvent(event)
    // we add window listeners that will prevent the scroll when the user has started dragging
    updateWindowListeners(
      this.controller,
      this.stateKey,
      [
        ['touchmove', this.preventScroll],
        ['touchend', this.clean.bind(this)],
        ['touchcancel', this.clean.bind(this)],
      ],
      { passive: false }
    )
    this.setTimeout(this.startDrag.bind(this), 250, event)
  }

  private setUpDelayedDragTrigger = (event: React.PointerEvent | PointerEvent) => {
    this.state._dragDelayed = true
    persistEvent(event)
    this.setTimeout(this.startDrag.bind(this), this.config.delay, event)
  }

  private setStartState = (event: React.PointerEvent | PointerEvent) => {
    const values = getPointerEventValues(event, this.transform)
    this.updateSharedState(getGenericEventData(event))

    this.updateGestureState({
      ...getStartGestureState(this, values, event),
      ...getGenericPayload(this, event, true),
      _pointerId: this.getEventId(event), // setting pointerId locks the gesture to this specific event
    })

    this.updateGestureState(this.getMovement(values))
  }

  onDragStart = (event: React.PointerEvent | PointerEvent): void => {
    addEventIds(this.controller, event)
    if (!this.enabled || this.state._active) return

    this.setStartState(event)
    this.setPointerCapture(event as PointerEvent)

    if (this.shouldPreventWindowScrollY) this.setUpWindowScrollDetection(event)
    else if (this.config.delay > 0) this.setUpDelayedDragTrigger(event)
    else this.startDrag(event, true) // we pass the values to the startDrag event
  }

  startDrag(event: React.PointerEvent | PointerEvent, onDragIsStart: boolean = false) {
    // startDrag can happen after a timeout, so we need to check if the gesture is still active
    // as the user might have lift up the pointer in between.

    if (
      // if the gesture isn't active (probably means)
      !this.state._active ||
      // if the drag has already started we should ignore subsequent attempts
      this.state._dragStarted
    )
      return

    if (!onDragIsStart) this.setStartState(event)
    this.updateGestureState({ _dragStarted: true, _dragPreventScroll: true, cancel: this.onCancel })
    this.clearTimeout()
    this.fireGestureHandler()
  }

  onDragChange = (event: PointerEvent): void => {
    if (
      // if the gesture was canceled or
      this.state.canceled ||
      // if onDragStart wasn't fired or
      !this.state._active ||
      // if the event pointerId doesn't match the one that initiated the drag
      !this.isValidEvent(event) ||
      // if the event has the same timestamp as the previous event
      // note that checking type equality is ONLY for tests ¯\_(ツ)_/¯
      (this.state._lastEventType === event.type && event.timeStamp === this.state.timeStamp)
    )
      return

    let values

    if (document.pointerLockElement) {
      const { movementX, movementY } = event
      values = addV(this.transform([movementX, movementY]), this.state.values)
    } else values = getPointerEventValues(event, this.transform)

    const kinematics = this.getKinematics(values, event)

    // if startDrag hasn't fired
    if (!this.state._dragStarted) {
      // If the gesture isn't active then respond to the event only if
      // it's been delayed via the `delay` option, in which case start
      // the gesture immediately.
      if (this.state._dragDelayed) {
        this.startDrag(event)
        return
      }
      // if the user wants to prevent vertical window scroll when user starts dragging
      if (this.shouldPreventWindowScrollY) {
        if (!this.state._dragPreventScroll && kinematics.axis) {
          // if the user is dragging horizontally then we should allow the drag
          if (kinematics.axis === 'x') {
            this.startDrag(event)
          } else {
            this.state._active = false
            return
          }
        } else return
      } else return
    }

    const genericEventData = getGenericEventData(event)

    this.updateSharedState(genericEventData)
    const genericPayload = getGenericPayload(this, event)

    // This verifies if the drag can be assimilated to a tap by checking
    // if the real distance of the drag (ie not accounting for the threshold) is
    // greater than the TAP_DISTANCE_THRESHOLD.
    const realDistance = calculateDistance(kinematics._movement!)
    let { _dragIsTap } = this.state
    if (_dragIsTap && realDistance >= TAP_DISTANCE_THRESHOLD) _dragIsTap = false

    this.updateGestureState({ ...genericPayload, ...kinematics, _dragIsTap })

    this.fireGestureHandler()
  }

  onDragEnd = (event: PointerEvent): void => {
    removeEventIds(this.controller, event)

    // if the event pointerId doesn't match the one that initiated the drag
    // we don't want to end the drag
    if (!this.isValidEvent(event)) return
    this.clean()

    // if the gesture is no longer active (ie canceled)
    // don't do anything
    if (!this.state._active) return
    this.state._active = false

    const tap = this.state._dragIsTap
    const [vx, vy] = this.state.velocities
    const [mx, my] = this.state.movement
    const [ix, iy] = this.state._intentional
    const [svx, svy] = this.config.swipeVelocity
    const [sx, sy] = this.config.swipeDistance
    const sd = this.config.swipeDuration

    const endState = {
      ...getGenericPayload(this, event),
      ...this.getMovement(this.state.values),
    }

    const swipe: [number, number] = [0, 0]

    if (endState.elapsedTime < sd) {
      if (ix !== false && Math.abs(vx) > svx && Math.abs(mx) > sx) swipe[0] = sign(vx)
      if (iy !== false && Math.abs(vy) > svy && Math.abs(my) > sy) swipe[1] = sign(vy)
    }

    this.updateSharedState({ buttons: 0 })
    this.updateGestureState({ ...endState, tap, swipe })
    this.fireGestureHandler(this.config.filterTaps && tap === true)
  }

  clean = (): void => {
    super.clean()
    this.state._dragStarted = false
    this.releasePointerCapture()
    clearWindowListeners(this.controller, this.stateKey)
  }

  onCancel = (): void => {
    if (this.state.canceled) return
    this.updateGestureState({ canceled: true, _active: false })
    this.updateSharedState({ buttons: 0 })
    setTimeout(() => this.fireGestureHandler(), 0)
  }

  onClick = (event: React.UIEvent | UIEvent): void => {
    if (!this.state._dragIsTap) event.stopPropagation()
  }

  addBindings(bindings: any): void {
    if (this.config.useTouch) {
      addBindings(bindings, 'onTouchStart', this.onDragStart)
      addBindings(bindings, 'onTouchMove', this.onDragChange) // this is needed for react-three-fiber
      addBindings(bindings, 'onTouchEnd', this.onDragEnd)
      addBindings(bindings, 'onTouchCancel', this.onDragEnd)
    } else {
      addBindings(bindings, 'onPointerDown', this.onDragStart)
      addBindings(bindings, 'onPointerMove', this.onDragChange) // this is needed for react-three-fiber
      addBindings(bindings, 'onPointerUp', this.onDragEnd)
      addBindings(bindings, 'onPointerCancel', this.onDragEnd)
    }

    if (this.config.filterTaps) {
      const handler = this.controller.config.eventOptions.capture ? 'onClick' : 'onClickCapture'
      addBindings(bindings, handler, this.onClick)
    }
  }
}
