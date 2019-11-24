import { PointerEvent } from 'react'
import CoordinatesRecognizer from './CoordinatesRecognizer'
import Controller from '../Controller'
import { UseGestureEvent, Fn, StateKey, IngKey } from '../types'
import { noop } from '../utils/utils'
import { getPointerEventData, getGenericEventData } from '../utils/event'
import { calculateDistance } from '../utils/math'

const CLICK_DISTANCE_THRESHOLD = 3
const SWIPE_MAX_ELAPSED_TIME = 220

export default class DragRecognizer extends CoordinatesRecognizer<'drag'> {
  stateKey = 'drag' as StateKey<'drag'>
  ingKey = 'dragging' as IngKey

  constructor(controller: Controller, args: any[]) {
    super('drag', controller, args)
  }

  private dragShouldStart = (event: UseGestureEvent) => {
    const { touches } = getGenericEventData(event)
    return this.enabled && touches! < 2
  }

  private setPointers = (event: UseGestureEvent) => {
    const { currentTarget, pointerId } = event as PointerEvent
    // @ts-ignore
    currentTarget.setPointerCapture(pointerId)
    this.updateGestureState({ currentTarget, pointerId })
  }

  private removePointers = () => {
    const { currentTarget, pointerId } = this.state
    // @ts-ignore
    currentTarget.releasePointerCapture(pointerId)
  }

  private setListeners = () => {
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
    const { values } = getPointerEventData(event)

    this.updateSharedState(getGenericEventData(event))

    const startState = {
      ...this.getStartGestureState(values, event),
      ...this.getGenericPayload(event, true),
    }

    this.updateGestureState({
      ...startState,
      ...this.getMovement(values, startState),
      cancel: () => this.onCancel(event),
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

    const { values } = getPointerEventData(event)
    const kinematics = this.getKinematics(values, event)

    let { _isClick } = this.state
    if (_isClick && calculateDistance(kinematics._movement!) >= CLICK_DISTANCE_THRESHOLD) _isClick = false

    this.updateGestureState({
      ...this.getGenericPayload(event),
      ...kinematics,
      _isClick,
      cancel: () => this.onCancel(event),
    })

    this.fireGestureHandler()
  }

  onDragEnd = (event: UseGestureEvent): void => {
    this.state._active = false
    this.updateSharedState({
      dragging: false,
      down: false,
      buttons: 0,
      touches: 0,
    })

    const {
      _isClick,
      elapsedTime,
      movement: [mx, my],
      vxvy: [vx, vy],
      _intentional: [ix, iy],
    } = this.state

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
      ...this.getMovement(this.state.values),
      click: _isClick,
      swipe,
    })
    this.fireGestureHandler(this.config.filterClicks && this.state._isClick)
  }

  clean = (): void => {
    super.clean()
    this.state._delayedEvent = false

    if (this.controller.config.pointer) this.removePointers()
  }

  onCancel = (event: UseGestureEvent): void => {
    this.updateGestureState({ canceled: true, cancel: noop })
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
