import React from 'react'

const withGesture = Wrapped =>
  class extends React.Component {
    static defaultProps = {
      touch: true,
      mouse: true,
    }

    state = {
      x: 0,
      y: 0,
      xDelta: 0,
      yDelta: 0,
      xInitial: 0,
      yInitial: 0,
      xPrev: 0,
      yPrev: 0,
      down: false,
    }

    // Touch handlers
    handleTouchStart = e => {
      if (!this.props.touch) return
      window.addEventListener('touchmove', this.handleTouchMove)
      window.addEventListener('touchend', this.handleTouchEnd)
      this.handleDown(e.touches[0])
    }
    handleTouchMove = e => {
      this.handleMove(e.touches[0])
    }
    handleTouchEnd = () => {
      window.removeEventListener('touchmove', this.handleTouchMove)
      window.removeEventListener('touchend', this.handleMouseUp)
      this.handleUp()
    }

    // Mouse handlers
    handleMouseDown = e => {
      if (!this.props.mouse) return
      window.addEventListener('mousemove', this.handleMouseMoveRaf)
      window.addEventListener('mouseup', this.handleMouseUp)
      this.handleDown(e)
    }
    handleMouseMove = ({ pageX, pageY }) => {
      if (!this._busy) {
        requestAnimationFrame(() => {
          this.handleMove({
            pageX,
            pageY,
          })
        })
        this._busy = true
      }
    }
    handleMouseUp = () => {
      window.removeEventListener('mousemove', this.handleMouseMove)
      window.removeEventListener('mouseup', this.handleMouseUp)
      this.handleUp()
    }

    // Common handlers
    handleDown = ({ pageX, pageY }) => {
      const newProps = {
        ...this.state,
        x: pageX,
        y: pageY,
        xDelta: 0,
        yDelta: 0,
        xInitial: pageX,
        yInitial: pageY,
        xPrev: pageX,
        yPrev: pageY,
        down: true,
      }
      this.setState(this.props.onDown ? this.props.onDown(newProps) : newProps)
    }
    handleMove = ({ pageX, pageY }) => {
      const newProps = {
        ...this.state,
        x: pageX,
        y: pageY,
        xDelta: pageX - this.state.xInitial,
        yDelta: pageY - this.state.yInitial,
        xPrev: this.state.x,
        yPrev: this.state.y,
        xVelocity: pageX - this.state.x,
        yVelocity: pageY - this.state.y,
      }
      this.setState(this.props.onMove ? this.props.onMove(newProps) : newProps, () => (this._busy = false))
    }
    handleUp = () => {
      const newProps = {
        ...this.state,
        down: false,
      }
      this.setState(this.props.onUp ? this.props.onUp(newProps) : newProps)
    }

    render() {
      const { style, className, ...props } = this.props
      return (
        <div
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
          style={{ display: 'contents', ...style }}
          className={className}>
          <Wrapped {...props} {...this.state} />
        </div>
      )
    }
  }

const Gesture = withGesture(
  class extends React.PureComponent {
    render() {
      return this.props.children(this.props)
    }
  },
)

// TODO: take care of code duplication before releasing 2.0
function useGesture(ref) {
  const [state, set] = React.useState({
    x: 0,
    y: 0,
    xDelta: 0,
    yDelta: 0,
    xInitial: 0,
    yInitial: 0,
    xPrev: 0,
    yPrev: 0,
    down: false
  })

  const [handlers] = React.useState(() => {
    // Common handlers
    const handleDown = ({ pageX, pageY }) => {
      set(state => ({
        ...state,
        x: pageX,
        y: pageY,
        xDelta: 0,
        yDelta: 0,
        xInitial: pageX,
        yInitial: pageY,
        xPrev: pageX,
        yPrev: pageY,
        down: true
      }))
    }
    const handleMove = ({ pageX, pageY }) => {
      set(state => ({
        ...state,
        x: pageX,
        y: pageY,
        xDelta: pageX - state.xInitial,
        yDelta: pageY - state.yInitial,
        xPrev: state.x,
        yPrev: state.y,
        xVelocity: pageX - state.x,
        yVelocity: pageY - state.y
      }))
    }
    const handleUp = () => set(state => ({ ...state, down: false }))

    // Touch handlers
    const handleTouchStart = e => {
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleTouchEnd)
      handleDown(e.touches[0])
    }
    const handleTouchMove = e => handleMove(e.touches[0])
    const handleTouchEnd = () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
      handleUp()
    }

    // Mouse handlers
    const handleMouseDown = e => {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      handleDown(e)
    }
    const handleMouseMove = ({ pageX, pageY }) => handleMove({ pageX, pageY })
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      handleUp()
    }
    return {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart
    }
  })
  return [handlers, state]
}

export { withGesture, Gesture, useGesture }
