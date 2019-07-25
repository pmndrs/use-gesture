import { TouchEvent } from 'react'
import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import { noop, getTwoTouchesEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { TransformedEvent, GestureFlag, ReactEventHandlerKey, GestureEvent, Fn, Vector2 } from '../types'
import { genericEndState } from '../defaults'

const SCALE_FACTOR = 260

export default class PinchWebKitGestureRecognizer extends DistanceAngleRecognizer {
  constructor(controller: GestureController, args: any[]) {
    super('pinch', controller, args)
  }

  onStart = (event: TransformedEvent<GestureEvent>): void => {
    if (!this.isEnabled()) return
    event.preventDefault()

    const da: Vector2 = [event.scale * SCALE_FACTOR, event.rotation]

    const startState = this.getStartState(da, event)
    this.updateState({ pinching: true, down: true, touches: 2 }, { ...startState, cancel: () => this.onCancel(event) }, GestureFlag.OnStart)
  }

  onChange = (event: TransformedEvent<GestureEvent>): void => {
    const { canceled, active } = this.getState()
    if (canceled || !active) return
    event.preventDefault()

    const da: Vector2 = [event.scale * SCALE_FACTOR, event.rotation]

    const kinematics = this.getKinematics(da, event)
    const cancel = () => this.onCancel(event)

    this.updateState(null, { ...kinematics, first: false, cancel }, GestureFlag.OnChange)
  }

  onEnd = (event: TransformedEvent): void => {
    if (!this.getState().active) return
    event.preventDefault()
    this.updateState({ pinching: false, down: false, touches: 0 }, { ...genericEndState, event }, GestureFlag.OnEnd)
  }

  onCancel = (event: TransformedEvent): void => {
    this.updateState(null, { canceled: true, cancel: noop })
    requestAnimationFrame(() => this.onEnd(event))
  }

  updateTouchData = (event: TransformedEvent<TouchEvent>): void => {
    if (!this.isEnabled() || event.touches.length !== 2) return
    const { origin } = getTwoTouchesEventData(event)
    this.updateState(null, { origin })
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    return [
      ['onGestureStart', this.onStart],
      ['onGestureChange', this.onChange],
      [['onGestureEnd', 'onTouchCancel'], this.onEnd],
      [['onTouchStart', 'onTouchMove'], this.updateTouchData],
    ]
  }
}
