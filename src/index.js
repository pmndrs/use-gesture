import React from 'react'

const withGesture = Wrapped =>
    class extends React.Component {
        state = { x: 0, y: 0, xDelta: 0, yDelta: 0, xInitial: 0, yInitial: 0, down: false }

        handleTouchStart = e => e.preventDefault() || this.handleMouseDown(e.touches[0])
        handleTouchMove = e => e.preventDefault() || this.handleMouseMove(e.touches[0])
        
        handleMouseUp = () => {
            window.removeEventListener('touchmove', this.handleTouchMove)
            window.removeEventListener('touchend', this.handleMouseUp)
            window.removeEventListener('mousemove', this.handleMouseMove)
            window.removeEventListener('mouseup', this.handleMouseUp)
            const newProps = { down: false }
            this.setState(this.props.onUp ? this.props.onMouseUp(newProps) : newProps)
        }

        handleMouseDown = ({ pageX, pageY }) => {
            window.addEventListener('touchmove', this.handleTouchMove)
            window.addEventListener('touchend', this.handleMouseUp)
            window.addEventListener('mousemove', this.handleMouseMove)
            window.addEventListener('mouseup', this.handleMouseUp)
            const newProps = { x: pageX, y: pageX, xDelta: 0, yDelta: 0, xInitial: pageX, yInitial: pageY, down: true }
            this.setState(this.props.onDown ? this.props.onDown(newProps) : newProps)
        }

        handleMouseMove = ({ pageX, pageY }) => {
            const newProps = { x: pageX, y: pageX, xDelta: pageX - this.state.xInitial, yDelta: pageY - this.state.yInitial }
            this.setState(this.props.onMove ? this.props.onMove(newProps) : newProps)
        }

        render() {
            return (
                <div onMouseDown={this.handleMouseDown} onTouchStart={this.handleTouchStart}>
                    <Wrapped {...this.props} {...this.state} />
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
