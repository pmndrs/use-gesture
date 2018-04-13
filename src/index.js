import React from 'react'

const withGesture = Wrapped =>
    class extends React.Component {
        state = { x: 0, y: 0, xDelta: 0, yDelta: 0, xInitial: 0, yInitial: 0, xPrev: 0, yPrev: 0, down: false }

        handleTouchStart = e => this.handleMouseDown(e.touches[0])
        handleTouchMove = e => this.handleMouseMove(e.touches[0])

        handleMouseUp = () => {
            window.removeEventListener('touchmove', this.handleTouchMove)
            window.removeEventListener('touchend', this.handleMouseUp)
            window.removeEventListener('mousemove', this.handleMouseMoveRaf)
            window.removeEventListener('mouseup', this.handleMouseUp)
            const newProps = { ...this.state, down: false }
            this.setState(this.props.onUp ? this.props.onMouseUp(newProps) : newProps)
        }

        handleMouseDown = ({ pageX, pageY }) => {
            window.addEventListener('touchmove', this.handleTouchMove)
            window.addEventListener('touchend', this.handleMouseUp)
            window.addEventListener('mousemove', this.handleMouseMoveRaf)
            window.addEventListener('mouseup', this.handleMouseUp)
            const newProps = { ...this.state, x: pageX, y: pageX, xDelta: 0, yDelta: 0, xInitial: pageX, yInitial: pageY, xPrev: pageX, yPrev: pageY, down: true }
            this.setState(this.props.onDown ? this.props.onDown(newProps) : newProps)
        }

        handleMouseMoveRaf = ({ pageX, pageY }) => {
            !this._busy && requestAnimationFrame(() => this.handleMouseMove({ pageX, pageY }))
            this._busy = true
        }
        handleMouseMove = ({ pageX, pageY }) => {
            const newProps = { ...this.state, x: pageX, y: pageX, xDelta: pageX - this.state.xInitial, yDelta: pageY - this.state.yInitial, xPrev: this.state.x, yPrev: this.state.y, xVelocity: pageX - this.state.x, yVelocity: pageY - this.state.y }
            this.setState(this.props.onMove ? this.props.onMove(newProps) : newProps, () => (this._busy = false))
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

export { withGesture, Gesture }
