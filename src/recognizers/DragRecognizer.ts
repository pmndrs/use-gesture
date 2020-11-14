import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getPointerEventValues, getGenericEventData } from '../utils/event'
import { calculateDistance, sign } from '../utils/math'
import { getStartGestureState, getGenericPayload } from './Recognizer'
import { addBindings, updateWindowListeners, clearWindowListeners } from '../Controller'

export const TAP_DISTANCE_THRESHOLD = 3
export const SWIPE_MAX_ELAPSED_TIME = 220

export class DragRecognizer extends CoordinatesRecognizer<'drag'> {
  readonly ingKey = 'dragging'
  readonly stateKey = 'drag'

  // TODO add back when setPointerCapture is widely wupported
  // https://caniuse.com/#search=setPointerCapture
  private setPointers = (event: React.PointerEvent | PointerEvent) => {
    const { target, pointerId } = event
    if (target && 'setPointerCapture' in target) {
      // this would work in the DOM but doesn't with react three fiber
      // target.addEventListener('pointermove', this.onDragChange, this.controller.config.eventOptions)
      // @ts-expect-error
      target.setPointerCapture(pointerId)
    }
    this.updateGestureState({ target, pointerId })
  }

  private removePointers = () => {
    const { target, pointerId } = this.state
    if (target && 'setPointerCapture' in target && pointerId) {
      // this would work in the DOM but doesn't with react three fiber
      // target.removeEventListener('pointermove', this.onDragChange, this.controller.config.eventOptions)
      target.releasePointerCapture(pointerId)
    }
  }

  private preventScroll = (event: TouchEvent) => {
    if (this.persistentVariables.preventScroll && event.cancelable) {
      event.preventDefault()
    }
  }

  private releaseScroll = (_event: TouchEvent) => {
    this.persistentVariables.preventScroll = false
    clearWindowListeners(this.controller, this.stateKey)
  }

  onDragStart = (event: React.PointerEvent | PointerEvent): void => {
    if (!this.enabled || this.state._active) return
    this.persistentVariables = { preventScroll: false, isTap: true, delayedEvent: false }

    this.setPointers(event as PointerEvent)

    // if the user wants to prevent vertical window scroll when user starts dragging
    if (this.config.experimental_preventWindowScrollY && this.controller.supportsTouchEvents) {
      // we add window listeners that will prevent the scroll when the user has started dragging
      updateWindowListeners(
        this.controller,
        this.stateKey,
        [
          ['touchmove', this.preventScroll],
          ['touchend', this.releaseScroll],
        ],
        { passive: false }
      )
      this.setTimeout(() => {
        this.persistentVariables.preventScroll = true
        this.startDrag(event)
      }, 250)
    } else if (this.config.delay > 0) {
      this.persistentVariables.delayedEvent = true
      // If it's a React SyntheticEvent we need to persist it so that we can use it async
      if ('persist' in event && typeof event.persist === 'function') event.persist()
      this.setTimeout(this.startDrag.bind(this), this.config.delay, event)
    } else {
      this.startDrag(event)
    }
  }

  startDrag(event: React.PointerEvent | PointerEvent) {
    const values = getPointerEventValues(event)
    this.updateSharedState(getGenericEventData(event))

    this.updateGestureState({
      ...getStartGestureState(this, values, event),
      ...getGenericPayload(this, event, true),
      cancel: this.onCancel,
    })

    this.updateGestureState(this.getMovement(values))
    this.fireGestureHandler()
  }

  onDragChange = (event: PointerEvent): void => {
    // If the gesture was canceled don't respond to the event.
    if (this.state.canceled) return

    // If the gesture isn't active then respond to the event only if
    // it's been delayed via the `delay` option, in which case start
    // the gesture immediately.
    if (!this.state._active) {
      if (this.persistentVariables?.delayedEvent) {
        this.clearTimeout()
        this.startDrag(event)
      }
      return
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
    const values = getPointerEventValues(event)

    const kinematics = this.getKinematics(values, event)
    const genericPayload = getGenericPayload(this, event)

    // This verifies if the drag can be assimilated to a tap by checking
    // if the real distance of the drag (ie not accounting for the threshold) is
    // greater than the TAP_DISTANCE_THRESHOLD.
    const realDistance = calculateDistance(kinematics._movement!)
    if (this.persistentVariables.isTap && realDistance >= TAP_DISTANCE_THRESHOLD) this.persistentVariables.isTap = false

    // if the user wants to prevent vertical window scroll when user starts dragging
    if (this.config.experimental_preventWindowScrollY && this.controller.supportsTouchEvents) {
      if (!this.persistentVariables.preventScroll && kinematics.axis) {
        // if the user is dragging horizontally then we should allow the drag
        if (kinematics.axis === 'x') {
          this.clearTimeout()
          this.persistentVariables.preventScroll = true
        } else return this.onCancel()
      }
    }

    this.updateGestureState({ ...genericPayload, ...kinematics })

    this.fireGestureHandler()
  }

  onDragEnd = (event: PointerEvent): void => {
    this.clean()
    if (!this.state._active) return
    this.state._active = false
    this.updateSharedState({ down: false, buttons: 0, touches: 0 })

    const tap = this.persistentVariables.isTap
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

    this.updateGestureState({ ...endState, tap, swipe })
    this.fireGestureHandler(tap === true)
  }

  clean = (): void => {
    super.clean()
    this.removePointers()
    clearWindowListeners(this.controller, this.stateKey)
  }

  onCancel = (): void => {
    if (this.state.canceled) return
    this.updateGestureState({ canceled: true })
    this.state._active = false
    this.updateSharedState({ down: false, buttons: 0, touches: 0 })
    requestAnimationFrame(() => this.fireGestureHandler())
  }

  onClick = (event: React.UIEvent | UIEvent): void => {
    if (!this.persistentVariables.isTap) event.stopPropagation()
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
