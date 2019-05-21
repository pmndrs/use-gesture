import { initialState } from '../default'

export default class Recognizer {
  handler = null
  args = []
  gestureKey = ''
  stateKey = ''
  actionKey = ''

  constructor(gestureKey, handler, args = []) {
    this.gestureKey = gestureKey
    this.stateKey = gestureKey
    this.actionKey = 'on' + gestureKey.charAt(0).toUpperCase() + gestureKey.slice(1)
    this.handler = handler
    this.args = args
  }

  isEnabled = () => this.handler.config.enabled && this.handler.config[this.gestureKey]

  setTimeout = (...args) => {
    this.handler.timeouts[this.stateKey] = setTimeout(...args)
  }

  clearTimeout = () => {
    clearTimeout(this.handler.timeouts[this.stateKey])
  }

  getState = () => this.handler.state[this.stateKey]
  getSharedState = () => this.handler.state.shared
  hasPointerEvents = () => this.handler.config.pointerEvents
  getEnabledConfig = () => this.handler.config.enabled
  getTransformConfig = () => this.handler.config.transform

  addWindowListeners = listeners => {
    this.handler.addWindowListeners(this.stateKey, listeners)
  }

  removeWindowListeners = () => {
    this.handler.removeWindowListeners(this.stateKey)
  }

  // TS should be abstract
  getEventBindings = () => {}

  updateState = (sharedState, gestureState, flag) => {
    if (flag) this.handler.updateState(sharedState, gestureState, this.stateKey, this.actionKey, flag)
    else this.handler.updateState(sharedState, gestureState, this.stateKey)
  }

  getStartState = ({ values, args, event }) => {
    const state = this.getState()
    const initial = initialState[this.stateKey]
    const transform = state.transform || event.transform || this.getTransformConfig()
    const lastLocal = state.local || initial.local

    return {
      ...initial,
      event,
      values,
      initial: values,
      previous: values,
      local: lastLocal,
      lastLocal,
      first: true,
      active: true,
      transform,
      time: event.timeStamp,
      args
    }
  }
}
