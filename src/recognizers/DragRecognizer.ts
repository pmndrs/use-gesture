import { PointerEvent } from 'react'
import CoordinatesRecognizer from './CoordinatesRecognizer'
import Controller from '../Controller'
import { UseGestureEvent, Fn, StateKey, IngKey } from '../types'
import { noop } from '../utils/utils'
import { getPointerEventData } from '../utils/event'

const CLICK_DISTANCE_THRESHOLD = 3

export default class DragRecognizer extends CoordinatesRecognizer<'drag'> {
  stateKey = 'drag' as StateKey<'drag'>
  ingKey = 'dragging' as IngKey

  protected sharedEndState = { dragging: false, down: false, buttons: 0, touches: 0 }

  constructor(controller: Controller, args: any[]) {
    super('drag', controller, args)
  }

  getPayloadFromEvent(event: UseGestureEvent) {
    return getPointerEventData(event)
  }

  shouldStart(event: UseGestureEvent) {
    const {
      sharedPayload: { touches },
    } = getPointerEventData(event)
    return this.enabled && touches! < 2
  }

  onDragStart = (event: UseGestureEvent): void => {
    if (!this.shouldStart(event)) return
    // if pointers events
    if (this.controller.config.pointer) {
      const { currentTarget, pointerId } = event as PointerEvent
      currentTarget && (currentTarget as any).setPointerCapture(pointerId)
      this.state.currentTarget = currentTarget
      this.state.pointerId = pointerId
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
      this.setTimeout(() => this.onStart(event), delay)
    } else {
      this.onStart(event)
    }
  }

  startGesture(event: UseGestureEvent) {
    const { sharedPayload, gesturePayload } = this.getPayloadFromEvent(event)
    return { sharedPayload, gesturePayload: { ...gesturePayload, cancel: () => this.onCancel(event) } }
  }

  onDragChange = (event: UseGestureEvent): void => {
    const { canceled } = this.state
    if (canceled) return

    if (!this.state._active) {
      if (this.state._delayedEvent) {
        this.clearTimeout()
        this.onStart(event)
      }
      return
    }

    const { gesturePayload, sharedPayload } = this.getPayloadFromEvent(event)

    if (!sharedPayload.down) {
      this.onDragEnd(event)
      return
    }

    const kinematics = this.getKinematics(gesturePayload!.values!, event)

    let { _isClick } = this.state
    if (_isClick && kinematics.distance! >= CLICK_DISTANCE_THRESHOLD) _isClick = false

    this.updateState(sharedPayload, { ...kinematics, _isClick, cancel: () => this.onCancel(event) })

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
    this.state._delayedEvent = false

    if (this.controller.config.pointer) {
      const { currentTarget, pointerId } = this.state
      if (currentTarget) (currentTarget as any).releasePointerCapture(pointerId)
    } else {
      this.removeWindowListeners()
    }
  }

  onCancel = (event: UseGestureEvent): void => {
    this.state.canceled = true
    this.state.cancel = noop
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
