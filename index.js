import React from 'react'
import PropTypes from 'prop-types'

const touchMove = 'touchmove'
const touchEnd = 'touchend'
const mouseMove = 'mousemove'
const mouseUp = 'mouseup'
const defaultProps = { touch: true, mouse: true, passive: { passive: true } }
const initialState = {
  event: undefined,
  args: undefined,
  temp: undefined,
  target: undefined,
  time: undefined,
  xy: [0, 0],
  delta: [0, 0],
  initial: [0, 0],
  previous: [0, 0],
  direction: [0, 0],
  local: [0, 0],
  lastLocal: [0, 0],
  velocity: 0,
  distance: 0,
  down: false,
  first: true,
}

function handlers(set, props = {}, args) {
  // Common handlers
  const handleUp = event =>
    set(state => {
      const newProps = { ...state, down: false, first: false }
      const temp = props.onAction && props.onAction(newProps)
      return {
        ...newProps,
        event,
        lastLocal: state.local,
        temp: temp || newProps.temp,
      }
    })
  const handleDown = event => {
    const { target, pageX, pageY } = event.touches ? event.touches[0] : event
    set(state => {
      const lastLocal = state.lastLocal || initialState.lastLocal
      const newProps = {
        ...initialState,
        event,
        target,
        args,
        lastLocal,
        local: lastLocal,
        xy: [pageX, pageY],
        initial: [pageX, pageY],
        previous: [pageX, pageY],
        down: true,
        time: Date.now(),
        cancel: () => {
          stop()
          requestAnimationFrame(() => handleUp(event))
        },
      }
      const temp = props.onAction && props.onAction(newProps)
      return { ...newProps, temp }
    })
  }
  const handleMove = event => {
    const { pageX, pageY } = event.touches ? event.touches[0] : event
    set(state => {
      const time = Date.now()
      const x_dist = pageX - state.xy[0]
      const y_dist = pageY - state.xy[1]
      const delta_x = pageX - state.initial[0]
      const delta_y = pageY - state.initial[1]
      const distance = Math.sqrt(delta_x * delta_x + delta_y * delta_y)
      const len = Math.sqrt(x_dist * x_dist + y_dist * y_dist)
      const scalar = 1 / (len || 1)
      const newProps = {
        ...state,
        event,
        time,
        xy: [pageX, pageY],
        delta: [delta_x, delta_y],
        local: [
          state.lastLocal[0] + pageX - state.initial[0],
          state.lastLocal[1] + pageY - state.initial[1],
        ],
        velocity: len / (time - state.time),
        distance: distance,
        direction: [x_dist * scalar, y_dist * scalar],
        previous: state.xy,
        first: false,
      }
      const temp = props.onAction && props.onAction(newProps)
      return { ...newProps, temp: temp || newProps.temp }
    })
  }

  const onDown = e => {
    if (props.mouse) {
      window.addEventListener(mouseMove, handleMove, props.passive)
      window.addEventListener(mouseUp, onUp, props.passive)
    }
    if (props.touch) {
      window.addEventListener(touchMove, handleMove, props.passive)
      window.addEventListener(touchEnd, onUp, props.passive)
    }

    handleDown(e)
  }

  const stop = () => {
    if (props.mouse) {
      window.removeEventListener(mouseMove, handleMove, props.passive)
      window.removeEventListener(mouseUp, onUp, props.passive)
    }
    if (props.touch) {
      window.removeEventListener(touchMove, handleMove, props.passive)
      window.removeEventListener(touchEnd, onUp, props.passive)
    }
  }

  const onUp = e => {
    stop()

    handleUp(e)
  }

  const output = {}
  const capture = props.passive.capture ? 'Capture' : ''

  if (props.mouse) {
    output[`onMouseDown${capture}`] = onDown
  }

  if (props.touch) {
    output[`onTouchStart${capture}`] = onDown
  }

  return output
}

class Gesture extends React.Component {
  static propTypes = {
    /** Optional. Accept mouse input, true by default */
    mouse: PropTypes.bool,
    /** Optional. Accept touch input, true by default */
    touch: PropTypes.bool,
    /** Optional. Calls back on mouse or touch down/up/move. When this is given it will manage state outside of React,
     * in this case it will never cause a new render, clients have to rely on callbacks to get notified. */
    onAction: PropTypes.func,
    /** Optional. addEventListener 3rd arg config, { passive: true } by default, should be false if you plan to call event.preventDefault() or event.stopPropagation() */
    passive: PropTypes.any,
  }
  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.state = initialState
    let set = this.setState.bind(this)
    if (props.onAction) {
      this._state = initialState
      set = cb => (this._state = cb(this._state))
    }
    this.handlers = handlers(set, props)
  }

  render() {
    const { style, children, className } = this.props
    return (
      <div {...this.handlers} style={{ display: 'contents', ...style }} className={className}>
        {children(this.state)}
      </div>
    )
  }
}

const withGesture = config => Wrapped => props => (
  <Gesture {...config} children={gestureProps => <Wrapped {...props} {...gestureProps} />} />
)

function useGesture(props) {
  const [state, set] = React.useState(initialState)
  const transientState = React.useRef(initialState)
  if (typeof props === 'function') props = { onAction: props }
  props = { ...defaultProps, ...props }
  const [spread] = React.useState(() => (...args) =>
    handlers(props.onAction ? cb => (transientState.current = cb(transientState.current)) : set, props, args),
  )
  return props.onAction ? spread : [spread, state]
}

export { withGesture, Gesture, useGesture }
