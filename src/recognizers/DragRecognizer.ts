import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getPointerEventValues, getGenericEventData } from '../utils/event'
import { calculateDistance } from '../utils/math'
import { getStartGestureState, getGenericPayload } from './Recognizer'
import { addBindings, updateWindowListeners, clearWindowListeners } from '../Controller'

export const TAP_DISTANCE_THRESHOLD = 3
export const SWIPE_MAX_ELAPSED_TIME = 220

export default class DragRecognizer extends CoordinatesRecognizer<'drag'> {
  readonly ingKey = 'dragging'
  readonly stateKey = 'drag'

  /**
   * TODO add back when setPointerCapture is widely wupported
   * https://caniuse.com/#search=setPointerCapture
   * private setPointers = (event: UseGestureEvent<PointerEvent>) => {
   *   const { currentTarget, pointerId } = event
   *   if (currentTarget) currentTarget.setPointerCapture(pointerId)
   *   this.updateGestureState({ currentTarget, pointerId })
   * }

   * private removePointers = () => {
   *   const { currentTarget, pointerId } = this.state
   *   if (currentTarget && pointerId) currentTarget.releasePointerCapture(pointerId)
   * }
   */

  onDragStart = (event: React.PointerEvent | PointerEvent): void => {
    if (!this.enabled || this.state._active) return

    /**
     * TODO add back when setPointerCapture is widely supported
     * this.setPointers(event as PointerEvent)
     */

    updateWindowListeners(this.controller, this.stateKey, [
      ['pointermove', this.onDragChange],
      ['pointerup', this.onDragEnd],
      ['pointercancel', this.onDragEnd],
    ])

    // We set the state pointerId to the event.pointerId so we can make sure
    // that we lock the drag to the event initiating the gesture
    this.updateGestureState({ _pointerId: event.pointerId })

    if (this.config.delay > 0) {
      this.state._delayedEvent = true
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
      _pointerId: event.pointerId,
      cancel: this.onCancel,
    })

    this.updateGestureState(this.getMovement(values))
    this.fireGestureHandler()
  }

  onDragChange = (event: PointerEvent): void => {
    // If the gesture was canceled don't respond to the event.
    if (this.state.canceled) return

    // If the event pointerId doesn't match the initiating pointerId
    // don't respond to the event.
    if (event.pointerId !== this.state._pointerId) return

    // If the gesture isn't active then respond to the event only if
    // it's been delayed via the `delay` option, in which case start
    // the gesture immediately.
    if (!this.state._active) {
      if (this.state._delayedEvent) {
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
    let { _isTap } = this.state
    const realDistance = calculateDistance(kinematics._movement!)
    if (_isTap && realDistance >= TAP_DISTANCE_THRESHOLD) _isTap = false

    this.updateGestureState({ ...genericPayload, ...kinematics, _isTap })

    this.fireGestureHandler()
  }

  onDragEnd = (event: PointerEvent): void => {
    // If the event pointerId doesn't match the initiating pointerId
    // don't respond to the event.
    if (event.pointerId !== this.state._pointerId) return

    this.state._active = false
    this.updateSharedState({ down: false, buttons: 0, touches: 0 })

    const tap = this.state._isTap
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
      if (ix !== false && Math.abs(vx) > svx && Math.abs(mx) > sx) swipe[0] = Math.sign(vx)
      if (iy !== false && Math.abs(vy) > svy && Math.abs(my) > sy) swipe[1] = Math.sign(vy)
    }

    this.updateGestureState({ ...endState, tap, swipe })
    this.fireGestureHandler()
  }

  clean = (): void => {
    super.clean()
    this.state._delayedEvent = false // can't remember if this is useful?
    clearWindowListeners(this.controller, this.stateKey)
    // TODO add back when setPointerCapture is widely wupported
    // this.removePointers()
  }

  onCancel = (): void => {
    if (this.state.canceled) return
    this.updateGestureState({ canceled: true })
    this.state._active = false
    this.updateSharedState({ down: false, buttons: 0, touches: 0 })
    requestAnimationFrame(() => this.fireGestureHandler())
  }

  onClick = (event: React.UIEvent | UIEvent): void => {
    if (!this.state._isTap) event.stopPropagation()
  }

  addBindings(bindings: any): void {
    addBindings(bindings, 'onPointerDown', this.onDragStart)
    if (this.config.filterTaps) {
      const handler = this.controller.config.eventOptions.capture ? 'onClick' : 'onClickCapture'
      addBindings(bindings, handler, this.onClick)
    }

    // TODO add back when setPointerCapture is widely wupported
    // addBindings(bindings, 'onPointerMove', this.onDragChange)
    // addBindings(bindings, 'onPointerUp', this.onDragEnd)
    // addBindings(bindings, 'onPointerCancel', this.onDragEnd)
  }
}
