import { PointerEvent } from 'react'
import CoordinatesRecognizer from './CoordinatesRecognizer'
import Controller from '../Controller'
import { UseGestureEvent, Fn, IngKey } from '../types'
import { noop } from '../utils/utils'
import { getPointerEventValues, getGenericEventData } from '../utils/event'
import { calculateDistance } from '../utils/math'

const TAP_DISTANCE_THRESHOLD = 3
const SWIPE_MAX_ELAPSED_TIME = 220

export default class DragRecognizer extends CoordinatesRecognizer<'drag'> {
  ingKey = 'dragging' as IngKey

  constructor(controller: Controller, args: any[]) {
    super('drag', controller, args)
  }

  private dragShouldStart = (event: UseGestureEvent) => {
    const { touches } = getGenericEventData(event)

    // this tries to filter out mouse events triggered by touch screens
    const fakeMouseEvent = event.sourceCapabilities && event.sourceCapabilities.firesTouchEvents && !touches
    return this.enabled && touches < 2 && !fakeMouseEvent
  }

  private setPointers = (event: UseGestureEvent) => {
    const { currentTarget, pointerId } = event as PointerEvent
    // @ts-ignore
    if (currentTarget) currentTarget.setPointerCapture(pointerId)
    this.updateGestureState({ currentTarget, pointerId })
  }

  private removePointers = () => {
    const { currentTarget, pointerId } = this.state
    // @ts-ignore
    if (currentTarget) currentTarget.releasePointerCapture(pointerId)
  }

  private setListeners = () => {
    this.removeWindowListeners()
    const dragListeners: [string, Fn][] = [
      ['touchmove', this.onDragChange],
      ['touchend', this.onDragEnd],
      ['touchcancel', this.onDragEnd],
      ['mousemove', this.onDragChange],
      ['mouseup', this.onDragEnd],
    ]
    this.addWindowListeners(dragListeners)
  }

  onDragStart = (event: UseGestureEvent): void => {
    if (!this.dragShouldStart(event)) return
    // if pointers events
    if (this.controller.config.pointer) this.setPointers(event)
    else this.setListeners()

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
      ...this.getStartGestureState(values, event),
      ...this.getGenericPayload(event, true),
    }

    this.updateGestureState({
      ...startState,
      ...this.getMovement(values, startState),
      cancel: () => this.onCancel(),
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
      ...this.getGenericPayload(event),
      ...kinematics,
      _isTap,
      cancel: () => this.onCancel(),
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
      ...this.getGenericPayload(event),
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
      event,
      ...endState,
      tap: _isTap,
      swipe,
    })
    this.fireGestureHandler(this.config.filterTaps && this.state._isTap)
  }

  clean = (): void => {
    super.clean()
    this.state._delayedEvent = false

    if (this.controller.config.pointer) this.removePointers()
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
      this.controller.addBindings('onPointerMove', this.onDragChange)
      this.controller.addBindings(['onPointerUp', 'onPointerCancel'], this.onDragEnd)
    } else {
      this.controller.addBindings(['onTouchStart', 'onMouseDown'], this.onDragStart)
    }
  }
}
