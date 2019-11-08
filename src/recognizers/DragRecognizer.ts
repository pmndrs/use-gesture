import { PointerEvent } from 'react'
import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getPointerEventData, noop } from '../utils/utils'
import Controller from '../Controller'
import { UseGestureEvent, Fn, StateKey } from '../types'

const CLICK_THRESHOLD = 3

export default class DragRecognizer extends CoordinatesRecognizer {
  stateKey = 'drag' as StateKey
  sharedEndState = { dragging: false, down: false, buttons: 0, touches: 0 }
  _delayedEvent = false
  private _mightBeAClick = true

  constructor(controller: Controller, args: any[]) {
    super('drag', controller, args)
  }

  getPayloadFromEvent(event: UseGestureEvent) {
    const { xy, ...sharedPayload } = getPointerEventData(event)
    return { values: xy, sharedPayload }
  }

  onDragStart = (event: UseGestureEvent): void => {
    if (!this.enabled) return

    // making sure we're not dragging the element when more than one finger press the screen
    const { touches } = getPointerEventData(event)
    if (touches > 1) return

    const { currentTarget, pointerId } = event as PointerEvent
    // if pointers events
    if (this.controller.config.pointer) {
      currentTarget && (currentTarget as any).setPointerCapture(pointerId)
    } else {
      this.removeWindowListeners()
      const dragListeners: [string, Fn][] = [
        ['mousemove', this.onDragChange],
        ['touchmove', this.onDragChange],
        ['mouseup', this.onDragEnd],
        ['touchend', this.onDragEnd],
        ['touchcancel', this.onDragEnd],
      ]
      this.addWindowListeners(dragListeners)
    }

    const { delay } = this.controller.config.drag

    if (delay > 0) {
      this._delayedEvent = true
      if (typeof event.persist === 'function') event.persist()
      this.setTimeout(() => this.startDrag(event), delay)
    } else {
      this.startDrag(event)
    }
  }

  startDrag = (event: UseGestureEvent): void => {
    this._active = true
    this._delayedEvent = false
    this._mightBeAClick = true

    const { currentTarget, pointerId } = event as PointerEvent
    const { values, sharedPayload } = this.getPayloadFromEvent(event)

    const kinematics = this.getKinematics(values, event, true)

    this.updateState(
      { ...this.sharedStartState, ...sharedPayload },
      { ...kinematics, click: false, currentTarget, pointerId, cancel: () => this.onCancel(event) }
    )
    this.fireGestureHandler()
  }

  onDragChange = (event: UseGestureEvent): void => {
    const { canceled } = this.state
    if (canceled) return

    if (!this._active) {
      if (this._delayedEvent) {
        this.clearTimeout()
        this.startDrag(event)
      }
      return
    }

    const { down } = getPointerEventData(event)

    if (!down) {
      this.onDragEnd(event)
      return
    }

    const { values, sharedPayload } = this.getPayloadFromEvent(event)
    const kinematics = this.getKinematics(values, event)

    if (this._mightBeAClick && kinematics.distance! >= CLICK_THRESHOLD) this._mightBeAClick = false

    this.updateState({ ...sharedPayload }, { ...kinematics, cancel: () => this.onCancel(event) })

    this.fireGestureHandler()
  }

  onDragEnd = (event: UseGestureEvent): void => {
    if (!this._active) return
    this.clearTimeout()
    this._delayedEvent = false
    this._active = false

    if (this.controller.config.pointer) {
      const { currentTarget, pointerId } = this.state
      if (currentTarget) (currentTarget as any).releasePointerCapture(pointerId)
    } else {
      this.removeWindowListeners()
    }

    const {
      movement: [mx, my],
      vxvy: [vx, vy],
    } = this.state

    const {
      swipeVelocity: [svx, svy],
      swipeDistance: [sx, sy],
    } = this.config

    const swipe: [number, number] = [0, 0]
    if (Math.abs(vx) > svx && Math.abs(mx) > sx) swipe[0] = Math.sign(vx)
    if (Math.abs(vy) > svy && Math.abs(my) > sy) swipe[1] = Math.sign(vy)

    this.updateState(this.sharedEndState, { event, click: this._mightBeAClick, swipe, last: true })
    this.fireGestureHandler(this.config.filterClicks && this._mightBeAClick)
  }

  onCancel = (event: UseGestureEvent): void => {
    this.updateState(null, { canceled: true, cancel: noop })
    requestAnimationFrame(() => this.onDragEnd(event))
  }

  addBindings(): void {
    if (this.controller.config.pointer) {
      this.controller.addBindings('onPointerDown', this.onDragStart)
      this.controller.addBindings('onPointerMove', this.onDragChange)
      this.controller.addBindings('onPointerUp', this.onDragEnd)
    } else {
      this.controller.addBindings(['onMouseDown', 'onTouchStart'], this.onDragStart)
    }
  }
}
