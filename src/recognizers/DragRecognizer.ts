import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getPointerEventValues, getGenericEventData } from '../utils/event'
import { calculateDistance, sign } from '../utils/math'
import { getStartGestureState, getGenericPayload } from './Recognizer'
import { addBindings, updateWindowListeners, clearWindowListeners } from '../Controller'

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
    const { target, pointerId } = event
    if (target && 'setPointerCapture' in target) {
      // this would work in the DOM but doesn't with react three fiber
      // target.addEventListener('pointermove', this.onDragChange, this.controller.config.eventOptions)
      // @ts-expect-error
      target.setPointerCapture(pointerId)
      this.updateGestureState({ _dragTarget: target, _dragPointerId: pointerId })
    }
  }

  private releasePointerCapture = () => {
    // TODO push this as locales
    const { _dragTarget, _dragPointerId } = this.state
    if (_dragPointerId && _dragTarget && 'releasePointerCapture' in _dragTarget) {
      // this would work in the DOM but doesn't with react three fiber
      // target.removeEventListener('pointermove', this.onDragChange, this.controller.config.eventOptions)
      _dragTarget.hasPointerCapture(_dragPointerId) && _dragTarget.releasePointerCapture(_dragPointerId)
    }
  }

  private preventScroll = (event: TouchEvent) => {
    if (this.state._dragPreventScroll && event.cancelable) {
      event.preventDefault()
    }
  }

  private shouldPreventWindowScrollY =
    this.config.experimental_preventWindowScrollY && this.controller.supportsTouchEvents

  private setUpWindowScrollDetection = (event: React.PointerEvent | PointerEvent) => {
    persistEvent(event)
    // we add window listeners that will prevent the scroll when the user has started dragging
    updateWindowListeners(this.controller, this.stateKey, [['touchmove', this.preventScroll]], { passive: false })
    this.setTimeout(this.startDrag.bind(this), 250, event)
  }

  private setUpDelayedDragTrigger = (event: React.PointerEvent | PointerEvent) => {
    this.state._dragDelayed = true
    persistEvent(event)
    this.setTimeout(this.startDrag.bind(this), this.config.delay, event)
  }

  private setStartState = (event: React.PointerEvent | PointerEvent) => {
    const values = getPointerEventValues(event)
    this.updateSharedState(getGenericEventData(event))
    this.updateGestureState({ ...getStartGestureState(this, values, event), ...getGenericPayload(this, event, true) })
    this.updateGestureState(this.getMovement(values))
  }

  onDragStart = (event: React.PointerEvent | PointerEvent): void => {
    if (!this.enabled || this.state._active) return

    this.setStartState(event)
    this.setPointerCapture(event as PointerEvent)

    if (this.shouldPreventWindowScrollY) this.setUpWindowScrollDetection(event)
    else if (this.config.delay > 0) this.setUpDelayedDragTrigger(event)
    else this.startDrag(event, true) // we pass the values to the startDrag event
  }

  startDrag(event: React.PointerEvent | PointerEvent, onDragIsStart: boolean = false) {
    if (!this.state._active || this.state._dragStarted) return

    if (!onDragIsStart) this.setStartState(event)
    this.updateGestureState({ _dragStarted: true, _dragPreventScroll: true, cancel: this.onCancel })
    this.clearTimeout()
    this.fireGestureHandler()
  }

  onDragChange = (event: PointerEvent): void => {
    // If the gesture was canceled or if onDragStart hasn't been fired
    // (ie: _active = false) don't respond to the event.
    if (!this.state._active || this.state.canceled) return

    const values = getPointerEventValues(event)
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
            this.releasePointerCapture()
            this.state._dragStarted = false
            this.state._active = false
            return
          }
        } else return
      } else return
    }

    const genericEventData = getGenericEventData(event)

    // If the event doesn't have any button / touches left we should cancel
    // the gesture. This may happen if the drag release happens outside the browser
    // window.
    if (!genericEventData.down) {
      this.onDragEnd(event)
      return
    }

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
    this.clean()
    if (!this.state._active) return

    this.state._active = false

    const tap = this.state._dragIsTap
    const [vx, vy] = this.state.velocities
    const [mx, my] = this.state.movement
    const [ix, iy] = this.state._intentional
    const [svx, svy] = this.config.swipeVelocity
    const [sx, sy] = this.config.swipeDistance

    const endState = {
      ...getGenericPayload(this, event),
      ...this.getMovement(this.state.values),
    }

    const swipe: [number, number] = [0, 0]

    if (endState.elapsedTime < SWIPE_MAX_ELAPSED_TIME) {
      if (ix !== false && Math.abs(vx) > svx && Math.abs(mx) > sx) swipe[0] = sign(vx)
      if (iy !== false && Math.abs(vy) > svy && Math.abs(my) > sy) swipe[1] = sign(vy)
    }

    this.updateSharedState({ down: false, buttons: 0, touches: 0 })
    this.updateGestureState({ ...endState, tap, swipe })
    this.fireGestureHandler(tap === true)
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
    this.updateSharedState({ down: false, buttons: 0, touches: 0 })
    requestAnimationFrame(() => this.fireGestureHandler())
  }

  onClick = (event: React.UIEvent | UIEvent): void => {
    if (!this.state._dragIsTap) event.stopPropagation()
  }

  addBindings(bindings: any): void {
    addBindings(bindings, 'onPointerDown', this.onDragStart)
    addBindings(bindings, 'onPointerMove', this.onDragChange) // this is needed for react-three-fiber
    addBindings(bindings, 'onPointerUp', this.onDragEnd)
    addBindings(bindings, 'onPointerCancel', this.onDragEnd)

    if (this.config.filterTaps) {
      const handler = this.controller.config.eventOptions.capture ? 'onClick' : 'onClickCapture'
      addBindings(bindings, handler, this.onClick)
    }
  }
}
