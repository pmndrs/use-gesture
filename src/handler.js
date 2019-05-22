import { defaultConfig, initialState } from './default'
import { addListeners, removeListeners, supportsGestureEvent, GESTURE_ONSTART, GESTURE_ONEND } from './utils'

import RecognizerController from './controllers/RecognizerController'
import DragRecognizer from './recognizers/DragRecognizer'
import ScrollRecognizer from './recognizers/ScrollRecognizer'
import WheelRecognizer from './recognizers/WheelRecognizer'
import MoveRecognizer from './recognizers/MoveRecognizer'
import HoverRecognizer from './recognizers/HoverRecognizer'
import PinchRecognizer from './recognizers/PinchRecognizer'
import PinchWheelRecognizer from './recognizers/PinchWheelRecognizer'
import PinchWebKitGestureRecognizer from './recognizers/PinchWebKitGestureRecognizer'

export default class Handler {
  props = null
  config = null
  controller = null
  state = initialState
  timeouts = {}
  windowListeners = {}

  constructor(props, config) {
    this.setPropsConfig(props, config)
    this.controller = new RecognizerController()
    this.createdOn = Date.now()
  }

  setPropsConfig = (props, config) => {
    if (typeof props === 'function') props = { onDrag: props }
    if (props.onAction) {
      props.onDrag = props.onAction
    }
    this.config = { ...defaultConfig, ...props.config, ...config }
    this.props = props
  }

  clean = () => {
    this.controller.clean()
    Object.values(this.timeouts).forEach(clearTimeout)
    Object.keys(this.windowListeners).forEach(this.removeWindowListeners)
  }

  updateState = (sharedState, gestureState, gestureStateKey, actionKey, flag) => {
    this.state = {
      ...this.state,
      shared: { ...this.state.shared, ...sharedState },
      [gestureStateKey]: { ...this.state[gestureStateKey], ...gestureState }
    }

    if (actionKey) {
      this.fireGestureHandler(gestureStateKey, actionKey, flag)
    }
  }

  // fire the gesture handler defined by the user
  fireGestureHandler = (gestureStateKey, actionKey, flag) => {
    const state = { ...this.state.shared, ...this.state[gestureStateKey] }
    state.xy = state.values // legacy state attribute for xy gestures
    state.vxvy = state.velocities // legacy state attribute for xy gestures
    state.da = state.values // legacy state attribute for pinch gestures
    state.vdva = state.velocities // legacy state attribute for pinch gestures

    if (flag === GESTURE_ONSTART) {
      const actionStart = `${actionKey}Start`
      this.props[actionStart] && this.props[actionStart](state)
    }
    if (this.props[actionKey]) {
      this.state[gestureStateKey].temp = this.props[actionKey](state) || this.state[gestureStateKey].temp
    }
    if (flag === GESTURE_ONEND) {
      const actionEnd = `${actionKey}End`
      this.props[actionEnd] && this.props[actionEnd](state)
    }
  }

  addWindowListeners = (stateKey, listeners) => {
    this.windowListeners[this.stateKey] = listeners
    addListeners(this.config.window, listeners, this.config.event)
  }

  removeWindowListeners = stateKey => {
    const listeners = this.windowListeners[this.stateKey]
    if (listeners) {
      removeListeners(this.config.window, listeners, this.config.event)
      this.windowListeners[this.stateKey] = null
    }
  }

  bind = (...args) => {
    // if props contains {onDragStart, onDrag, onDragEnd, onMoveStart, onMove}
    // actions will skip on[Gesture]["Start"|"End"] functions and include
    // ['onDrag', 'onMove']
    const actions = new Set(
      Object.keys(this.props)
        .filter(k => k.indexOf('on') === 0)
        .map(k => k.match(/(on[A-Z][a-z]+)/)[1])
    )

    const { domTarget } = this.config

    this.controller.clean()

    if (actions.has('onDrag')) {
      this.controller.add(new DragRecognizer(this, args))
    }
    if (actions.has('onScroll')) {
      this.controller.add(new ScrollRecognizer(this, args))
    }
    if (actions.has('onWheel')) {
      this.controller.add(new WheelRecognizer(this, args))
    }
    if (actions.has('onMove')) {
      this.controller.add(new MoveRecognizer(this, args))
    }
    if (actions.has('onHover')) {
      this.controller.add(new HoverRecognizer(this, args))
    }
    if (actions.has('onPinch')) {
      if (domTarget && supportsGestureEvent()) {
        // TODO also use touch events to calculate distance and origin
        this.controller.add(new PinchWebKitGestureRecognizer(this, args))
      } else {
        this.controller.add(new PinchRecognizer(this, args))
        this.controller.add(new PinchWheelRecognizer(this, args))
      }
    }

    if (domTarget) {
      this.controller.addDomTargetListeners(this.config)
      return this.clean
    }

    return this.controller.getBindings(this.config)
  }
}
