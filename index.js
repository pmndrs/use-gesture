import React from 'react'
import PropTypes from 'prop-types'

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
  first: true
}

function handlers(set, props = {}, args) {
  // Common handlers
  const handleUp = () =>
    set(state => {
      const newProps = { ...state, down: false, first: false }
      const temp = props.onAction && props.onAction(newProps)
      return {
        ...newProps,
        lastLocal: state.local,
        temp: temp || newProps.temp
      }
    })
  const handleDown = event => {
    const { target, pageX, pageY } = event
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
          window.removeEventListener('touchmove', handleTouchMove)
          window.removeEventListener('touchend', handleTouchEnd)
          window.removeEventListener('mousemove', handleMove)
          window.removeEventListener('mouseup', handleMouseUp)
          requestAnimationFrame(() => handleUp())
        }
      }
      const temp = props.onAction && props.onAction(newProps)
      return { ...newProps, temp }
    })
  }
  const handleMove = event => {
    const { pageX, pageY } = event
    set(state => {
      const time = Date.now()
      const x_dist = pageX - state.xy[0]
      const y_dist = pageY - state.xy[1]
      const delta_x = pageX - state.initial[0]
      const delta_y = pageY - state.initial[1]
      const len = Math.sqrt(x_dist * x_dist + y_dist * y_dist)
      const scalar = 1 / (len || 1)
      const newProps = {
        ...state,
        event,
        time,
        xy: [pageX, pageY],
        delta: [delta_x, delta_y],
        local: [state.lastLocal[0] + pageX - state.initial[0], state.lastLocal[1] + pageY - state.initial[1]],
        velocity: len / (time - state.time),
        distance: len,
        direction: [x_dist * scalar, y_dist * scalar],
        previous: state.xy,
        first: false
      }
      const temp = props.onAction && props.onAction(newProps)
      return { ...newProps, temp: temp || newProps.temp }
    })
  }

  // Touch handlers
  const handleTouchStart = e => {
    window.addEventListener('touchmove', handleTouchMove, props.passive)
    window.addEventListener('touchend', handleTouchEnd, props.passive)
    handleDown(e.touches[0])
  }
  const handleTouchMove = e => handleMove(e.touches[0])
  const handleTouchEnd = () => {
    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('touchend', handleTouchEnd)
    handleUp()
  }

  // Mouse handlers
  const handleMouseDown = e => {
    window.addEventListener('mousemove', handleMove, props.passive)
    window.addEventListener('mouseup', handleMouseUp, props.passive)
    handleDown(e)
  }
  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMove)
    window.removeEventListener('mouseup', handleMouseUp)
    handleUp()
  }
  return {
    onMouseDown: props.mouse ? handleMouseDown : undefined,
    onTouchStart: props.touch ? handleTouchStart : undefined
  }
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
    passive: PropTypes.any
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
    handlers(props.onAction ? cb => (transientState.current = cb(transientState.current)) : set, props, args)
  )
  return props.onAction ? spread : [spread, state]
}

export { withGesture, Gesture, useGesture }