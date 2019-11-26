import {} from 'react'
import CoordinatesRecognizer from './CoordinatesRecognizer'
import Controller from '../Controller'
import { UseGestureEvent, StateKey, IngKey } from '../types'
import { getGenericEventData, getScrollEventValues } from '../utils/event'
import { calculateDistance, calculateDirection, subV } from '../utils/math'

export default class ScrollRecognizer extends CoordinatesRecognizer<'scroll'> {
  stateKey = 'scroll' as StateKey<'scroll'>
  ingKey = 'scrolling' as IngKey

  constructor(controller: Controller, args: any[]) {
    super('scroll', controller, args)
  }

  private scrollShouldRun = () => {
    return this.enabled
  }

  onScroll = (event: UseGestureEvent): void => {
    if (!this.scrollShouldRun()) return
    this.clearTimeout()
    this.setTimeout(this.onScrollEnd)

    if (!this.state._active) this.onScrollStart(event)
    else this.onScrollChange(event)
  }

  onScrollStart = (event: UseGestureEvent): void => {
    const { values } = getScrollEventValues(event)

    this.updateSharedState(getGenericEventData(event))

    const delta = subV(values, this.state.values)

    const startState = {
      ...this.getStartGestureState(values, event),
      ...this.getGenericPayload(event, true),
      initial: this.state.values,
      offset: values,
      distance: calculateDistance(delta),
      direction: calculateDirection(delta),
    }

    this.updateGestureState({
      ...startState,
      ...this.getMovement(values, startState),
    })

    this.fireGestureHandler()
  }

  onScrollChange = (event: UseGestureEvent): void => {
    const genericEventData = getGenericEventData(event)

    this.updateSharedState(genericEventData)

    const { values } = getScrollEventValues(event)
    const kinematics = this.getKinematics(values, event)

    this.updateGestureState({
      ...this.getGenericPayload(event),
      ...kinematics,
    })

    this.fireGestureHandler()
  }

  onScrollEnd = (event: UseGestureEvent): void => {
    this.state._active = false

    this.updateGestureState({
      event,
      ...this.getMovement(this.state.values),
    })
    this.fireGestureHandler()
  }

  addBindings(): void {
    this.controller.addBindings('onScroll', this.onScroll)
  }
}
