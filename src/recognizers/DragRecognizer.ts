import { PointerEvent } from 'react'
import CoordinatesRecognizer from './CoordinatesRecognizer'
import Controller from '../Controller'
import { UseGestureEvent, Fn, StateKey, IngKey } from '../types'
import { noop } from '../utils/utils'
import { getPointerEventData } from '../utils/event'

const CLICK_THRESHOLD = 3

export default class DragRecognizer extends CoordinatesRecognizer {
  stateKey = 'drag' as StateKey
  ingKey = 'dragging' as IngKey
  protected sharedEndState = { dragging: false, down: false, buttons: 0, touches: 0 }

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

    const { delay } = this.config

    if (delay > 0) {
      this.state._delayedEvent = true
      if (typeof event.persist === 'function') event.persist()
      this.setTimeout(() => this.startDrag(event), delay)
    } else {
      this.startDrag(event)
    }
  }

  startDrag = (event: UseGestureEvent): void => {
    const { currentTarget, pointerId } = event as PointerEvent
    const { values, sharedPayload } = this.getPayloadFromEvent(event)

    const kinematics = this.getKinematics(values, event, true)

    this.updateState(sharedPayload, { ...kinematics, click: false, currentTarget, pointerId, cancel: () => this.onCancel(event) })

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

    const { down } = getPointerEventData(event)

    if (!down) {
      this.onDragEnd(event)
      return
    }

    const { values, sharedPayload } = this.getPayloadFromEvent(event)
    const kinematics = this.getKinematics(values, event)

    if (this.state._isClick && kinematics.distance! >= CLICK_THRESHOLD) this.state._isClick = false

    this.updateState({ ...sharedPayload }, { ...kinematics, cancel: () => this.onCancel(event) })

    this.fireGestureHandler()
  }

  onDragEnd = (event: UseGestureEvent): void => {
    this.state._active = false

    const {
      movement: [mx, my],
      vxvy: [vx, vy],
      _intentional: [ix, iy],
    } = this.state

    const {
      swipeVelocity: [svx, svy],
      swipeDistance: [sx, sy],
    } = this.config

    const swipe: [number, number] = [0, 0]
    if (ix !== false && Math.abs(vx) > svx && Math.abs(mx) > sx) swipe[0] = Math.sign(vx)
    if (iy !== false && Math.abs(vy) > svy && Math.abs(my) > sy) swipe[1] = Math.sign(vy)

    this.updateState(this.sharedEndState, { event, click: this.state._isClick, swipe })
    this.fireGestureHandler(this.config.filterClicks && this.state._isClick)
  }

  clean = (): void => {
    this.clearTimeout()

    if (this.controller.config.pointer) {
      const { currentTarget, pointerId } = this.state
      if (currentTarget) (currentTarget as any).releasePointerCapture(pointerId)
    } else {
      this.removeWindowListeners()
    }
  }

  onCancel = (event: UseGestureEvent): void => {
    this.updateState(null, { canceled: true, cancel: noop })
    requestAnimationFrame(() => this.onDragEnd(event))
  }

  addBindings(): void {
    if (this.controller.config.pointer) {
      this.controller.addBindings('onPointerDown', this.onDragStart)
      this.controller.addBindings('onPointerMove', this.onDragChange)
      this.controller.addBindings(['onPointerUp', 'onPointerCancel'], this.onDragEnd)
    } else {
      this.controller.addBindings(['onMouseDown', 'onTouchStart'], this.onDragStart)
    }
  }
}
